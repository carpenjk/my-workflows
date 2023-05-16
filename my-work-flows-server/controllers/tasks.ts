import { Request, Response } from "express";

export const getTasks = (req: Request, res: Response) => {
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