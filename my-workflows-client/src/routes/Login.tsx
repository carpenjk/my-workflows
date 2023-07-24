import { useNavigate } from "react-router-dom";
import LoginCard from "features/login/LoginCard";
import { useGetUserDetailsQuery } from "app/services/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import Loading from "features/loading/Loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";

const Login = () => {
   const navigate = useNavigate();
   const {data: loggedInUser, isLoading: isLoadingUser} = useGetUserDetailsQuery();
   const [isFadingOut, setIsFadingOut] =useState(false);
   const [isLoginLoading, setIsLoginLoading] = useState(false);   

   useEffect(() => {
      if(loggedInUser?.email){
        navigate('/');
      }
    },[loggedInUser, navigate])

      return(
            <Loading 
               fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
               trigger={(!isLoadingUser || isLoginLoading)}
               delay={FADE_OUT_DELAY}
               minLoading={MIN_LOADING}
               onTrigger={()=> setIsFadingOut(true)}
            >
               <LoginCard />
            </Loading>
      )
}
 
export default Login;