import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";

export const getUsers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  console.log('get users')
});
