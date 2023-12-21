import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "app/services/auth";
import { LoadingOverlay } from "features/loading";
import useLoadingEffect from "features/loading/useLoadingEffect";
import { useEffect, useState } from "react";
import LoginCard from "./LoginCard";

const LoginLoader = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);
  
  const isComplete = !(isLoadingUser || isUninitialized);
  const {loading, complete, LoadItem} = useLoadingEffect(isComplete);
  
  useEffect(() => {
    if(loggedInUser?.email){
      navigate('/');
      return;
    }

    if(!isComplete){
      console.log('loading')
      loading();
      return;
    } else {
      console.log('complete') 
      complete();
    }
  },[
    isComplete,
    loading,
    complete,
    navigate,
    loggedInUser
  ])

  return (
    <LoadItem
      fallback={<LoadingOverlay fadeOut={isFadingOut} />}
      onLoaded={()=>setIsFadingOut(true)}
      onMount={()=>setIsFadingOut(false)}
    >
      <LoginCard />
    </LoadItem> );
}
 
export default LoginLoader;