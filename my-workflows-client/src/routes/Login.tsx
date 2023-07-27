import { useNavigate } from "react-router-dom";
import LoginCard from "features/login/LoginCard";
import { useGetUserDetailsQuery } from "app/services/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import useLoading from "features/loading/useLoading";

const Login = () => {
   const navigate = useNavigate();
   const {Loading, setLoading, isLoading, config} = useLoading(true);
   const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized} = useGetUserDetailsQuery();
   const [isFadingOut, setIsFadingOut] =useState(false);
   
   //redirect to dashboard if already logged in
   useEffect(() => {
      if(loggedInUser?.email){
        navigate('/');
      }
    },[loggedInUser, navigate])

   // turn off loading screen
   useEffect(() => {
      if(!isUninitialized){
         setLoading(isLoadingUser)
         return;
      } 
      //included as extra safeguard. Should always be initialized.
      setLoading(false)
   }, [isUninitialized, isLoadingUser, isLoading, setLoading]);
   
      return(
         <Loading 
            isLoading={isLoading}
            fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
            delay={FADE_OUT_DELAY}
            minLoading={MIN_LOADING}
            onLoaded={()=> setIsFadingOut(true)}
            onUnmount={()=>setIsFadingOut(false)}
            {...config}
         >
            <LoginCard />
         </Loading>
      )
}
 
export default Login;