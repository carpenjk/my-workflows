import {Request, Response, NextFunction} from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.email} is ${req.isAuthenticated()}`)
      next();
  } else {
      res.status(401).json({ msg: 'You are not authorized to view this resource' });
  }
}