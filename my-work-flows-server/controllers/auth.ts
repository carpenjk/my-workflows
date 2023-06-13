import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { User } from "../models/User";
import { BadRequestError } from "../errors/badRequestError";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { StatusCodes } from "http-status-codes";
import { TokenUser, createJWT } from "../utils/jwt";


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

  const tokenUser: TokenUser = { userID: user.userID, email: user.email, name: user.name };
  // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
});

export const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.session)
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = createJWT({ userID: user.userID, name: user.name, email: user.email });
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
})