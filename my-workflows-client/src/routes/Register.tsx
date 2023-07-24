import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RegistrationCard } from "features/registration";
import Loading from "features/loading/Loading";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";

const Register = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);

  useEffect(() => {
    if(loggedInUser){
      navigate('/')
    }
  }, [loggedInUser, navigate])

  return (
    <Loading
      fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
      trigger={!isLoadingUser}
      delay={FADE_OUT_DELAY}
      minLoading={MIN_LOADING}
      onTrigger={()=> setIsFadingOut(true)}
    >
     <RegistrationCard />
  </ Loading>
  );
}

export default Register;