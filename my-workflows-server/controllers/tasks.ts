import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { Task } from "../models/Task";
import { NotFoundError } from "../errors/notFoundError";
import { BulkCreateOptions, CreateOptions } from "sequelize";
import { sequelize } from "../adapters/sequelize";
import { BadRequestError } from "../errors/badRequestError";
import { Dependency } from "../models/Dependency";

export interface TaskArgs {
  taskID?: bigint,
  name: string,
  description: string,
  dependencies?: (bigint | string)[],
  dueDay: number,
  ownerID: bigint,
  workflowID: bigint
}

export type CreateTaskArgs = Omit<TaskArgs, "taskID">


export const getTasks = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.params;
  const tasks = await Task.findAll({
    where: {
      ...filters
    }
  })
  if (tasks.length === 0) {
    return next(new NotFoundError('No tasks found.'));
  }
  res.send(tasks);
})

export const getTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const taskID: string = req.params.taskID;
  const task = await Task.findOne({ where: { taskID: taskID } });
  if (!task) {
    return next(new NotFoundError(`No task with id : ${taskID}`));
  }
  res.send(task);
})

export const createTasksFromArgs = async (tasks: TaskArgs | TaskArgs[], options?: BulkCreateOptions | CreateOptions ) => {
  try{
    if(Array.isArray(tasks)){
      //transform 
      const transformedTasks = tasks.reduce((ary: any[], task) => {
        if(Array.isArray(task.dependencies)){
          const deps = task.dependencies.map(dep => tasks.find(task=> task.taskID == dep));
          const tasksWithDeps = [...ary, {...task, taskDependencies: deps}];
          return tasksWithDeps;
        }
        return [...ary, task];
      },[])
      
      const createdTasks = (await Task.bulkCreate(transformedTasks, options as BulkCreateOptions))
        .map(task=> task.dataValues);


      const dependencies = tasks.map((task: TaskArgs)=> {
        if(!("taskID" in task)|| !task.dependencies){
          return;
        }
        const taskDependencies: {taskID: bigint, dependencies:  bigint}[] = task.dependencies.map((dep)=> {
          function getID(key: bigint | string): bigint | undefined{
            return (typeof key === "bigint"
              ? key
              :  createdTasks.find(task=> task.name === dep )?.taskID)
          }
          const taskID = getID(task.taskID ?? task.name);
          const depID = getID(dep);
          if(!taskID || !depID){
            throw new BadRequestError('Invalid dependencies');
          }
          return ({
            taskID: taskID,
            dependencies: depID
          });
        }
        )
        return taskDependencies.filter(task=>task.dependencies);
      })
      
      console.log("🚀 ~ file: tasks.ts:68 ~ createTasksFromArgs ~ createdTasks:", createdTasks);
      console.log("🚀 ~ file: tasks.ts:87 ~ dependencies ~ dependencies:", dependencies);
      
      if(dependencies && dependencies.length > 0){
        // await Dependency.bulkCreate(dependencies)
      // if(dependencies && dependencies.length > 0){
      //   const tasksWithDependencies = createdTasks.map(task=> 
      //     ({taskID: task.taskID, dependencies: dependencies.find(
      //       (dep=> dep && ('taskID' in dep)
      //       && (dep.taskID === task.taskID))
      //   )}));
        // console.log("🚀 ~ file: tasks.ts:67 ~ createTasksFromArgs ~ tasksWithDependencies:", tasksWithDependencies)
        console.log("🚀 ~ file: tasks.ts:59 ~ createTasksFromArgs ~ createdTasks:", createdTasks);
      }
      return;
    }
    await Task.create(tasks as TaskArgs, options as CreateOptions);
  } catch(e){
    console.log(e);
  }
}

export const createTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const workflowID: string = req.params.workflowID;
  const { taskID, ...colsToCreate } = req.body;
  console.log(`Creating task for ${taskID}`);
  await Task.create(
    { ...colsToCreate, workflowID: workflowID },
  )
  res.send({ msg: 'Task created!' });
})

export const updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const taskID: string = req.params.taskID;
  const workflowID: string = req.params.workflowID;
  const { taskID: ignoreID, ...colsToUpdate } = req.body;
  await Task.update(
    { ...colsToUpdate, workflowID: workflowID },
    { where: { taskID: taskID } }
  )
  res.send(`Task updated!`);
})

export const deleteTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { taskID } = req.params;
  const task = await Task.destroy({ where: { taskID: taskID } });
  if (task === 0) {
    return next(new NotFoundError('The task does not exist to delete.'))
  }
  res.send({ msg: `Task ${taskID} has been deleted.` });
})


async function transactTasks(tasks: TaskArgs[]){
  try {
    if(tasks.filter((task) => task.taskID).length === 0){
      return await Task.bulkCreate(tasks);
    }
    const result = await sequelize.transaction(async (t) => {
      const transformedTasks = tasks.reduce((ary: any[], task) => {
        if(Array.isArray(task.dependencies)){
          const deps = task.dependencies.map(dep => tasks.find(task=> task.taskID == dep));
          const tasksWithDeps = [...ary, {...task, taskDependencies: deps}];
          return tasksWithDeps;
        }
        return [...ary, task];
      },[])
      const createdTasks = (await Task.bulkCreate(tasks, { transaction: t })).map(task => task.dataValues);
  
      return;
    });
  
    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback (the `user`, in this case)
  
  } catch (error) {
  
  
  }

}