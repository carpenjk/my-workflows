import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { Task } from "../models/Task";
import { NotFoundError } from "../errors/notFoundError";

export interface TaskArgs {
  name: string,
  description: string,
  dependencies: bigint[],
  dueDay: number,
  owner: bigint,
  workflowID: bigint
}

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
  console.log(`Getting task for ${taskID}`);
  const task = await Task.findOne({ where: { taskID: taskID } });
  console.log("🚀 ~ file: tasks.ts:23 ~ getTask ~ task:", task);
  if (!task) {
    return next(new NotFoundError(`No task with id : ${taskID}`));
  }
  res.send(task);
})

export const createTasksFromArgs = async (tasks: TaskArgs | TaskArgs[]) => {
  if(Array.isArray(tasks)){
    return await Task.bulkCreate(tasks);
  }
  await Task.create(tasks);
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
  console.log(`Creating task for ${taskID}`);
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