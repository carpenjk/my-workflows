import { useNavigate } from "react-router-dom";
import LoginCard from "features/login/LoginCard";
import { useGetUserDetailsQuery } from "app/services/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { Loading } from "features/loading";

const Login = () => {
   const navigate = useNavigate();
   // const {Loading, setLoading, isLoading, config} = useLoading(true);
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
         // setLoading(isLoadingUser)
         return;
      } 
      //included as extra safeguard. Should always be initialized.
      // setLoading(false)
   }, [isUninitialized, isLoadingUser]);
   
      return(
         <Loading
         initialLoadState={true}
         fallback={<LoadingOverlay fadeOut={false}/>}
         config={{delay: FADE_OUT_DELAY, minLoading: MIN_LOADING}}
         >
            <LoginCard />
         </Loading>
      )
}
 
export default Login;