import {  useGetUserDetailsQuery } from 'app/services/auth';
import { Loader, LoadingOverlay } from 'features/loading';
import { InlineLink } from 'features/ui';
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
  <Loader
        isLoaded={isLoaded}
        fallback={<LoadingOverlay fadeOut={false} />}
        component={!isLoggedIn
          ? 
          (<div >
            <h1>Unauthorized :(</h1>
            <InlineLink to='/login'>Login  to gain access</InlineLink>
          </div>)
          : (<Outlet/>)
        }
      />
  )
}
 
export default ProtectedRoute;