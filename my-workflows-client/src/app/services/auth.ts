import * as yup from "yup";
import { api } from './api';
import { User } from './user';
import { toast } from "react-toastify";
import { TOAST_ID, TRANSITION, createOrUpdateToast, makeToast } from "features/loading";
import { redirect } from "react-router-dom";
import { Console } from "console";

export interface UserResponse {
  user: User,
  token: string
}

export interface LogoutResponse {
  message: string
}

export interface MessageResponse  {
  msg: string
}



export const LoginRequestSchema = yup.object({
  email: yup.string()
    .email('The email provided is not a valid email.')
    .required('You must provide an email'),
  password: yup.string()
    .required('You must provide a password.') 
    .max(128, 'Password must be less than or equal to 128 characters.')
}).required();

export const RegisterRequestSchema = yup.object({
  email: yup.string()
    .email('The email provided is not a valid email.')
    .required('You must provide an email'),
  password: yup.string()
    .required('You must provide a password.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*?])[A-Za-z\d$#@$!%*?&].{7,}/, 'Password must be 8 characters long containing 1 uppercase, lowercase, and $#@$!%*?&'),
  confirmPassword: yup.string().required()
  .oneOf([yup.ref('password')], 'Passwords must match'),
  name: yup.string().max(100).required('You must enter a name')
}).required();


export type LoginRequest = yup.InferType<typeof LoginRequestSchema>;
export type RegisterRequest = yup.InferType<typeof RegisterRequestSchema>;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${process.env.REACT_APP_API_PATH}/user/login`,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(
      ) {
        createOrUpdateToast(TOAST_ID, "Loading")
      },
      invalidatesTags: ['User']
    }),
    logout: builder.mutation<LogoutResponse, void >({
      query: () => ({
        url: 'api/v1/user/logout',
        method:'POST'
      }),
      async onQueryStarted(
        arg,
        {
          queryFulfilled,
        }
      ) {
        createOrUpdateToast(TOAST_ID, "Logging Out")
        // try{
        //   await queryFulfilled
        //   toast.done(TOAST_ID)
        // } catch (e){
        //   console.log(e);
        // }
      },
      invalidatesTags: ['User']
    }),
    register: builder.mutation<MessageResponse | void, RegisterRequest>({
      query: (data) => ({
        url: 'api/v1/user/register',
        method: 'PUT',
        body: data
      }),
    }),
    getUserDetails: builder.query<User, void>({
      query: () => ({
        url: 'api/v1/user/me',
        method: 'GET',
      }),
      async onQueryStarted(
      ) {
        createOrUpdateToast(TOAST_ID, "Loading")
      },
      providesTags: ['User']
    }),
  }),
})

// export react hook
export const { useGetUserDetailsQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi