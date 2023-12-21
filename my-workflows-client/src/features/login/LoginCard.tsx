import { useForm } from "react-hook-form";
import {InlineLink} from "features/ui/shared";
import { LoginRequest, LoginRequestSchema, useLoginMutation } from "app/services/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { ItemContainer } from "features/ui/shared";
import {TextInput} from "features/ui/shared";
import { SubmitButton } from "features/ui/shared";
// import useLoading from 'features/loading/useLoading';
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { useState } from "react";

const LoginCard = () => {
  const navigate = useNavigate();
  // const {Loading, setLoading, isLoading, config} = useLoading(false);
  const [isFadingOut, setIsFadingOut] =useState(false);

  const [logIn, status] = useLoginMutation();
  const { register, handleSubmit, formState: {errors: inputErrors }, getValues } = useForm<LoginRequest>( {resolver: yupResolver(LoginRequestSchema)});

  const getErrors = (): string => {
    const {error} = status;
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
  
  const handleLogin = async () => {
    // setLoading(true, {minLoading:0, delay:0})
    try{
      const {user} = await logIn({email: getValues("email"), password:getValues("password")}).unwrap();
      if(user)
        // setLoading(true, {minLoading:0, delay:0, onLoaded: undefined})
        navigate('/')
      }
    catch(e){
      console.log(e);   
    } finally{
      // setLoading(false, {minLoading:MIN_LOADING, delay:FADE_OUT_DELAY});
    }
  }

  return ( 
    // <Loading
    //   isLoading={isLoading}
    //   fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    //   delay={FADE_OUT_DELAY}
    //   minLoading={MIN_LOADING}
    //   onLoaded={()=> setIsFadingOut(true)}
    //   onUnmount={()=>setIsFadingOut(false)}
    //   {...config}
    // >
        <ItemContainer className="max-w-md space-y-2">
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
      // </Loading>
  );
}
 
export default LoginCard;