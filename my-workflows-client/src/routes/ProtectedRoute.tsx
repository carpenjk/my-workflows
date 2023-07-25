import {  useGetUserDetailsQuery } from 'app/services/auth';
import LoadingOverlay from 'features/loading/LoadingOverlay';
import { FADE_OUT_DELAY, MIN_LOADING } from 'features/loading/config';
import useLoading from 'features/loading/useLoading';
import { InlineLink } from 'features/ui';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const {data: user, isLoading: isLoadingUser, isUninitialized, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const {Loading, setLoading, isLoading} = useLoading(true);
  const [isFadingOut, setIsFadingOut] =useState(false);

  useEffect(() => {
    if(!isUninitialized){
      if(!isLoadingUser && !isFetchingUser && !user?.email){
        navigate('./login')
        return;
      }
      setLoading(isLoadingUser || isFetchingUser);
    }

  },[isUninitialized, isLoadingUser, isFetchingUser, setLoading, navigate, user])

  const isLoggedIn = user?.email;
  return (
    <Loading
    fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    isLoading={isLoading}
    delay={!isLoggedIn ? FADE_OUT_DELAY :  0}
    minLoading={!isLoggedIn ? MIN_LOADING : 0}
    onLoaded={!isLoggedIn ? (()=> setIsFadingOut(true)) : undefined} //don't fade until route loads
    >
      {!user?.email && (
        <div >
        <h1>Unauthorized :(</h1>
        <InlineLink to='/login'>Login  to gain access</InlineLink>
      </div>
      )}
      {user?.email && (
        <Outlet/>
      )}
    </Loading>  
  )
}
 
export default ProtectedRoute;