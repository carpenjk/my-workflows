import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "app/services/auth";
import { LoginCard } from "features/login";
import { toast } from "react-toastify";
import { TOAST_ID } from "features/loading";


const Login = () => {
   const navigate = useNavigate();
   const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
   

   // useEffect(() => {
   //    if(loggedInUser?.email){
   //       navigate('/');
   //    }
   // },[navigate,loggedInUser])

   useEffect(() => {
      console.log("🚀 ~ useEffect ~ !isLoadingUser:", !isLoadingUser)
      if(!isLoadingUser){
         toast.done(TOAST_ID);
      }
   }, [isLoadingUser]);
     
   const isComplete = !(isLoadingUser || isUninitializedUser || isFetchingUser);
   return(
      <LoginCard />
   )
}
 
export default Login;