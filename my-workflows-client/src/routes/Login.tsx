import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY } from "features/loading/config";
import { Loader, Loading } from "features/loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "app/services/auth";
import { LoginCard } from "features/login";


const Login = () => {
   const navigate = useNavigate();
   const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
   const [isFadingOut, setIsFadingOut] =useState(false);

   useEffect(() => {
      if(loggedInUser?.email){
         navigate('/');
      }
   },[navigate,loggedInUser])
     
   const isComplete = !(isLoadingUser || isUninitializedUser || isFetchingUser);
   return(
      <Loading
      initialLoadState={true}
      fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
      config={{delay: FADE_OUT_DELAY}}
      >
         <Loader
         isLoaded={isComplete}
         onLoaded={()=>setIsFadingOut(true)}
         onMount={()=>setIsFadingOut(false)}
         >
            <LoginCard />
         </Loader>
      </Loading>
   )
}
 
export default Login;