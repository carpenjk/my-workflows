import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import {InlineLink} from "features/ui/shared";
import { LoginRequest, LoginRequestSchema, UserResponse, useLoginMutation } from "app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ItemContainer } from "features/ui/shared";
import {TextInput} from "features/ui/shared";
import { SubmitButton } from "features/ui/shared";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import {LoadingSetter} from 'features/loading/useLoading';

type Props = {
  setLoading: LoadingSetter,
  serverError:  FetchBaseQueryError | SerializedError | undefined
  inputErrors: FieldErrors<{
      email: string;
      password: string;
    }>
  logIn: ReturnType<UseFormHandleSubmit<{
      email: string;
      password: string;
    }, undefined>>,
  register: UseFormRegister<{
    email: string;
    password: string;
  }>
}

const LoginCard = ({setLoading, serverError: error, inputErrors, logIn, register}: Props) => {
  // const navigate = useNavigate();
  

  // const handleLogin = async () => {
  //   setLoading(true, {minLoading:0, delay:0, ignoreOnLoad: true});
  //   try{
  //     const {user} = await logIn({email: getValues("email"), password:getValues("password")}).unwrap();
  //     if(user){
  //       navigate('/')
  //     }
  //     }
  //   catch(e){
  //     console.log(e);      
  //   } finally{
  //     console.log(`logincard set loading ${false}`)
  //     setLoading(false);
  //   }
  // }

  const getErrors = (): string => {
    if(error){
      if('data' in error && error?.data === 'Unauthorized'){
        return 'The email and password provided are invalid.'
      } else {
        return "Something went wrong."
      }
    }
    
    if(typeof inputErrors.email?.message === 'string'){
      return inputErrors.email?.message;
    }
    if(typeof inputErrors.password?.message === 'string') {
      return inputErrors.password?.message;
    }
    return "";
  }

  return ( 
      <ItemContainer >
        <h1 className="">Welcome Back!</h1>
        <h5>Standardize and track your most important work flows.</h5>
        <div className="w-full max-w-md p-4">
          <form className="w-full" onSubmit={logIn}>
            <div className="w-full mb-4 sm:mb-6">
              <TextInput
                id="email"
                label="Email"
                placeholder="example@email.com"
                {...register("email",  { required: true }) }
                tabIndex={1}
              />
            </div>
            <div className="relative pb-6 sm:pb-8">
              <TextInput
                id="password"
                label="Password"
                placeholder="******************"
                type="password"
                {...register("password",  { required: true }) }
                tabIndex={2}
              />
              <div className="absolute bottom-1">
                <p className="text-xs italic font-bold text-red-300">{getErrors()}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-6 space-y-2">
                <span className="text-sm">Or</span>
                <InlineLink to="/" tabIndex={4}>Login as Guest</InlineLink>
            </div>
            <div className="flex items-center justify-between mt-10 space-x-6">
            <SubmitButton tabIndex={3}>Sign In</SubmitButton>
              <div className="md:w-18">
                <InlineLink to="/register" tabIndex={4}>
                  Don't have an account? Sign Up!
                </InlineLink>
              </div>
            </div>
          </form>
          </div>
      </ItemContainer>
  );
}
 
export default LoginCard;