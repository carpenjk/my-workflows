import { useNavigate } from "react-router-dom";
import LoginCard from "features/login/LoginCard";
import { useGetUserDetailsQuery } from "app/services/auth";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import Suspend from "features/loading/Suspend";

const Login = () => {
   const navigate = useNavigate();
   const {data: loggedInUser, isLoading: isLoadingUser} = useGetUserDetailsQuery();
   const [showLoading, setShowLoading]= useState<boolean>(true);
   let isFadingOut = false;
   if(!isLoadingUser && !loggedInUser?.email && showLoading){
      isFadingOut = true;
      setTimeout(()=> setShowLoading(false), 300);
   }

   // useEffect(() => {
   //    if(loggedInUser?.email){
   //      navigate('/');
   //    }
   //  },[loggedInUser, navigate])

  

      return(
         <div className="relative flex items-center justify-center w-full h-full px-4 sm:px-16">
            <Suspend 
               fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
               trigger={(loggedInUser && true) as boolean}
               delay={300}
            >
               <LoginCard />
            </Suspend>
         </div>
      )
}
 
export default Login;