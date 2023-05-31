import { NextFunction, Request, Response } from "express";

import { UnauthenticatedError } from '../errors/unauthenticatedError';
import { isTokenValid } from "../utils/jwt";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }
  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new UnauthenticatedError('Authentication Invalid'));
  }

  try {
    // const { name, userID, email }: { name: string, userID: number, email: string } = isTokenValid({ token });
    const payload = isTokenValid({ token });
    // req.body = { name, userID, role: email };
    console.log("🚀 ~ file: authentication.ts:17 ~ authenticateUser ~ payload:", payload)
    next();
  } catch (error) {
    return next(new UnauthenticatedError('Authentication Invalid'));
  }
};