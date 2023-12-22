import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RegistrationCard } from "features/registration";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { Loader, Loading } from "features/loading";

const Register = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);

  const isLoaded = !(isLoadingUser || isUninitializedUser || isFetchingUser);

  useEffect(() => {
    if(loggedInUser){
      navigate('/')
    }
  }, [loggedInUser, navigate])


  return (
    <Loading
    initialLoadState={true}
    fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    config={{delay: FADE_OUT_DELAY, minLoading: MIN_LOADING}}
    >
      <Loader
      isLoaded={isLoaded}
      onLoaded={()=>setIsFadingOut(true)}
      onMount={()=>setIsFadingOut(false)}
      component={<RegistrationCard />}
      />
    </Loading>
  );
}

export default Register;