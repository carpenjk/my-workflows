import { useNavigate } from "react-router-dom";
import LoginCard from "features/login/LoginCard";
import { LoginRequest, LoginRequestSchema, useGetUserDetailsQuery, useLoginMutation } from "app/services/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import useLoading from "features/loading/useLoading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const Login = () => {
   const navigate = useNavigate();
   const {Loading, setLoading, isLoading, config} = useLoading(true);
   const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized} = useGetUserDetailsQuery();
   const [logIn, status] = useLoginMutation();
   const [isFadingOut, setIsFadingOut] =useState(false);
   const { register, handleSubmit, formState: {errors: inputErrors }, getValues } = useForm<LoginRequest>( {resolver: yupResolver(LoginRequestSchema)});

   useEffect(() => {
      if(loggedInUser?.email){
        navigate('/');
      }
    },[loggedInUser, navigate])

   useEffect(() => {
      if(!isUninitialized){
         console.log('initialized - set Loading', isLoading)
         setLoading(isLoadingUser)
         return;
      } 
      console.log('uninitialized set loading', false)
      setLoading(false)
   }, [isUninitialized, isLoadingUser, isLoading, setLoading]);
   
   const handleLogin = async () => {
      setLoading(true, {minLoading:0, delay:0, ignoreOnLoad: true, key: "login"});
      try{
        const {user} = await logIn({email: getValues("email"), password:getValues("password")}).unwrap();
        console.log('user fetched', user)
        if(user)
        navigate('/')
        }
      catch(e){
        console.log(e);      
      } finally{
        setLoading(false);
      }
    }
      return(
         <Loading 
            isLoading={isLoading}
            fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
            delay={FADE_OUT_DELAY}
            minLoading={MIN_LOADING}
            onLoaded={()=> setIsFadingOut(true)}
            {...config}
         >
            <LoginCard 
               setLoading={setLoading}
               inputErrors={inputErrors}
               serverError={status.error}
               logIn={handleSubmit(handleLogin)} 
               register={register}
            />
         </Loading>
      )
}
 
export default Login;