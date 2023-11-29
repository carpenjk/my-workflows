import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { Task } from "../models/Task";
import { NotFoundError } from "../errors/notFoundError";
import { BulkCreateOptions, CreateOptions } from "sequelize";
import { BadRequestError } from "../errors/badRequestError";

export interface TaskArgs {
  taskID?: bigint,
  name: string,
  description: string,
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
      return await Task.bulkCreate(tasks, options as BulkCreateOptions)
    }
    return await Task.create(tasks as TaskArgs, options as CreateOptions);
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

export const createTasks = asyncWrapper(async(req: Request, res: Response, next: NextFunction) => {
  if(!Array.isArray(req.body)) return next(new BadRequestError('Tasks are not in an Array'));
  createTasksFromArgs(req.body);
  res.send({msg: 'Tasks have been Created!'});
})

export const updateTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const taskID: string = req.params.taskID;
  const workflowID: string = req.params.workflowID;
  const { taskID: ignoreID, ...colsToUpdate } = req.body;
  await Task.update(
    { ...colsToUpdate, workflowID: workflowID },
    { where: { taskID: taskID } }
  )
  res.send({msg: 'Task updated!'});
})

export const updateTasks = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { tasks } = req.body;
  const results = createTasksFromArgs(tasks, {
    updateOnDuplicate: ['name','description', 'dependencies', 'dueDay', 'ownerID'],
  })
  res.send({msg: 'Task updated!', Tasks: results});
})

export const deleteTask = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { taskID } = req.params;
  const task = await Task.destroy({ where: { taskID: taskID } });
  if (task === 0) {
    return next(new NotFoundError('The task does not exist to delete.'))
  }
  res.send({ msg: `Task ${taskID} has been deleted.` });
})