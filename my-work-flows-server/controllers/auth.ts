import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { User } from "../models/User";
import { BadRequestError } from "../errors/badRequestError";
import { StatusCodes } from "http-status-codes";
import { SessionUser } from "../models/User";
import { VerifyFunction } from "passport-local";

type MessageResponse = {
  message: string
}

export const register = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ where: { email } });

  if (emailAlreadyExists) {
    return next(new BadRequestError('Email already exists'));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(StatusCodes.CREATED).end();
});

export const getUserWithSession = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  console.log("getUserWithSession: ", req.user);
  res.send(req.user)
});

export const verify: VerifyFunction = async (email: string, password: string, cb ) => {
  if (!email || !password) {
    return cb(null, false, {message:'Please provide email and password'});
  }
  try {
    const user:User | null = await User.findOne({ where: { email } });
    if (!user) {
      return cb(null, false,
         {message:'Please provide email and password'}
         );
    }
    const isPasswordCorrect = await user?.comparePassword(password);
    if (!isPasswordCorrect) {
      return cb(null, false, {message:'Please provide email and password'});
    }
  const sessionUser: SessionUser = {userID: user.userID, email: user.email, name: user.name}
  return cb(null, sessionUser);
  } catch(e) {
    cb(e);
  }
}

export const logout =  async function(req:Request, res: Response, next: NextFunction){
  const userName = req.user?.name;
  res.clearCookie('connect.sid');  // clear the session cookie
	req.logout(function(err) {  // logout of passport
		req.session.destroy(function (err) { // destroy the session
			res.send({message: `${userName ?? 'User'} is logged out`})
		});
	});
};