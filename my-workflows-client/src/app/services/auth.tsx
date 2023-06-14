import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store';

// export interface LoginRequest {
//   email: string,
//   password: string,
// }

import * as yup from "yup";

export interface User {
  userID: bigint,
  email: string,
  name: string
}

export interface UserResponse {
  user: User,
  token: string
}

export const LoginRequestSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z\d$#@$!%*?&].{7,}/, 'Password must be 8 characters long containing 1 uppercase, lowercase, and $#@$!%*?&')
  
}).required();

export type LoginRequest = yup.InferType<typeof LoginRequestSchema>;



const baseUrl = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: 'api/v1/auth/login',
        method: 'GET',
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'api/v1/auth/protected',
    }),
  }),
})

// export react hook
export const { useGetUserDetailsQuery, useLoginMutation, useProtectedMutation } = authApi