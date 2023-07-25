import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import useLoading from "features/loading/useLoading";

const Workflows = () => {
  const navigate = useNavigate();
  const {Loading, setLoading, isLoading} = useLoading(true);
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);

  useEffect(() => {
    if(!loggedInUser){
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  useEffect(() => {
    if(!isUninitialized){
      if(isLoadingUser && !isLoading){
         setLoading(true)
         return;
      }
   } else {
      if(!isLoadingUser)
      setLoading(false)
   }
  }, [isUninitialized, isLoadingUser, isLoading, setLoading]);

  return (  
    <Loading
      fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
      isLoading={isLoading}
      delay={FADE_OUT_DELAY}
      minLoading={MIN_LOADING}
      onLoaded={()=> setIsFadingOut(true)}
    >
      <div>Create Workflows</div>);
    </Loading>
  )
}
 
export default Workflows;