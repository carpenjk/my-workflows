import { Request, Response } from "express";

export const getWorkflows = (req: Request, res: Response) => {
  console.log('getworkflows');

  res.send("getWorkflows")
}
export const createWorkflow = (req: Request, res: Response) => {
  const params = req.params;
  console.log("🚀 ~ file: workflows.ts:10 ~ createWorkflow ~ params:", params)
  res.send('createWorkFlow');
}
export const updateWorkFlow = (req: Request, res: Response) => {
  res.send('updateWorkFlow');
}
export const deleteWorkFlow = (req: Request, res: Response) => {
  res.send('deleteWorkFlow');
}