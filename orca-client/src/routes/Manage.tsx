import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Manage = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);
  const isLoaded = !(isLoadingUser || isUninitializedUser || isFetchingUser)

  useEffect(() => {
    if(!loggedInUser){
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  return (  
    <div className="text-text-normal dark:text-dk-text-normal">Manage Workflows</div>
  )
}
 
export default Manage;