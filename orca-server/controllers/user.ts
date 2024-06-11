import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { User } from "../models/User";
import { NotFoundError } from "../errors/notFoundError";

export const getUsers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.findAll({attributes:['userID', 'name', 'email']});
  if (!users) {
    return next(new NotFoundError('No users found.'));
  }
  res.send(users);
});
