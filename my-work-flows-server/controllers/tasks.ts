import { Request, Response } from "express";
import { Task } from "../models/Task";

export const getTasks = (req: Request, res: Response) => {
  Task.create(
    {
      name: 'task 4',
      description: 'task 4 description',
      owner: BigInt(1),
      reviewer: BigInt(2),
      dueDate: new Date('2023-05-30T17:00:00'),
      dependencies: [BigInt(1), BigInt(2)],
      workflowID: BigInt(1),
    }
  )
  res.send('getTasks');
}
export const getTask = (req: Request, res: Response) => {
  res.send('getTask');
}
export const createTask = (req: Request, res: Response) => {
  res.send('createTasks');
}
export const updateTask = (req: Request, res: Response) => {
  res.send('updateTask');
}
export const deleteTask = (req: Request, res: Response) => {
  res.send('deleteTask');
}