import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { User } from "../models/User";
import { BadRequestError } from "../errors/badRequestError";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticatedError";

export const getUsers = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  console.log('get users')
});

export const getUserWithSession = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {  
  
  if(!req.user){
    return next(new UnauthenticatedError(UnauthenticatedError.messages.LOGGED_OUT))
  }
  res.send({msg: req.user})
});