import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { Task } from "../models/Task";
import { NotFoundError } from "../errors/notFoundError";
import { BulkCreateOptions, CreateOptions } from "sequelize";

export interface TaskArgs {
  taskID?: bigint,
  name: string,
  description: string,
  dependencies?: bigint[],
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
  console.log("🚀 ~ file: tasks.ts:43 ~ createTasksFromArgs ~ tasks:", tasks)
  try{
    if(Array.isArray(tasks)){
      const transformedTasks = tasks.reduce((ary: any[], task) => {
        if(Array.isArray(task.dependencies)){
          const deps = task.dependencies.map(dep => tasks.find(task=> task.taskID == dep));
          const tasksWithDeps = [...ary, {...task, taskDependencies: deps}];
          return tasksWithDeps;
        }
        return [...ary, task];
      },[])
      console.log("🚀 ~ file: tasks.ts:54 ~ dependencies2 ~ dependencies2:", transformedTasks)
      const dependencies = tasks.map((task: TaskArgs)=> {
        if(!("taskID" in task)|| !task.dependencies){
          return;
        }
        const taskDependencies: {taskID: bigint, dependencies:  bigint}[] = task.dependencies.map((dep)=> ({
            taskID: task.taskID as bigint,
            dependencies: dep  
          })
        )
        return taskDependencies.filter(task=>task.dependencies);
      })
      const createdTasks = (await Task.bulkCreate(transformedTasks, options as BulkCreateOptions))
        .map(task=> task.dataValues);

      console.log("🚀 ~ file: tasks.ts:68 ~ createTasksFromArgs ~ createdTasks:", createdTasks);
      
      // if(dependencies && dependencies.length > 0){
      //   const tasksWithDependencies = createdTasks.map(task=> 
      //     ({taskID: task.taskID, dependencies: dependencies.find(
      //       (dep=> dep && ('taskID' in dep)
      //       && (dep.taskID === task.taskID))
      //   )}));
      //   // console.log("🚀 ~ file: tasks.ts:67 ~ createTasksFromArgs ~ tasksWithDependencies:", tasksWithDependencies)
      //   console.log("🚀 ~ file: tasks.ts:59 ~ createTasksFromArgs ~ createdTasks:", createdTasks)
      // }
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

// export const testTaskUpdate = async () => (task: TaskArgs, options?: BulkCreateOptions | CreateOptions ){
//   const {dependencies, ...args} = task;
//     const createdTask = await Task.findOrCreate(args).then(createTask=>{
//       console.log("🚀 ~ file: tasks.ts:119 ~ createdTask ~ args:", args)
//     });
// }