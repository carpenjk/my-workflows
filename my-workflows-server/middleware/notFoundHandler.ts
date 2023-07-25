import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/notFoundError";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError('Route does not exist.'));
}