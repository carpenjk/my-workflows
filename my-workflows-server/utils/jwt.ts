import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
require('dotenv').config();


export interface TokenUser {
  userID: bigint,
  email: string,
  name: string
}

export const createJWT = (payload: TokenUser) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = ({ token }: { token: string }): JwtPayload => jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;

export const attachCookiesToResponse = ({ res, user }: { res: Response, user: TokenUser }) => {
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};
