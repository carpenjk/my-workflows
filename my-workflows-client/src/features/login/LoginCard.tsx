import { useForm } from "react-hook-form";
import {InlineLink} from "features/ui/shared";
import { LoginRequest, LoginRequestSchema, useLoginMutation } from "app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ItemContainer } from "features/ui/shared";
import {TextInput} from "features/ui/shared";
import { SubmitButton } from "features/ui/shared";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import Loading from "features/loading/Loading";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { useEffect, useState } from "react";

type Props = {
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  // error:  FetchBaseQueryError | SerializedError | undefined
}

const LoginCard = () => {
  const navigate = useNavigate();
  const [logIn, status] = useLoginMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues } = useForm<LoginRequest>( {resolver: yupResolver(LoginRequestSchema)});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true)
    try{
      const {user} = await logIn({email: getValues("email"), password:getValues("password")}).unwrap();
      if(user)
      navigate('/')
      }
    catch(e){
      console.log(e);      
    } finally {
      setIsLoggingIn(false)
    }
 }

  const getErrors = (): string => {
    if(status.error){
      if('data' in status.error && status.error?.data === 'Unauthorized'){
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
    <Loading
      fallback={<LoadingOverlay fadeOut={false}/>}
      trigger={!isLoggingIn }
    >
      <ItemContainer >
        <h1 className="">Welcome Back!</h1>
        <h5>Standardize and track your most important work flows.</h5>
        <div className="w-full max-w-md p-4">
          <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
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
    </Loading>
  );
}
 
export default LoginCard;