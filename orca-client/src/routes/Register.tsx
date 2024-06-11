import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RegistrationCard } from "features/registration";

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
    <RegistrationCard />
  );
}

export default Register;