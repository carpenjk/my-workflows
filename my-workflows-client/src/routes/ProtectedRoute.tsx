import {  useGetUserDetailsQuery } from 'app/services/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const {data: user, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  
  const isLoaded = (!isUninitializedUser && !isLoadingUser && !isFetchingUser);
  const isLoggedIn = user?.email;

  useEffect(() => {
    if(isLoaded){
      if( !isLoggedIn){
        navigate('./login')
        return;
      }
    } 
  },[isLoaded, navigate, isLoggedIn])
  
  return (
  <>
        {!isLoggedIn
          ? 
          (<div />)
          : (<Outlet/>)
        }
  </>
  )
}
 
export default ProtectedRoute;