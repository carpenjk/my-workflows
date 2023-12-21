import {  useGetUserDetailsQuery } from 'app/services/auth';
import { useLoadingEffect } from 'features/loading';
import { InlineLink } from 'features/ui';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const {complete, LoadItem} = useLoadingEffect(true);
  const {data: user, isLoading: isLoadingUser, isUninitialized, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  
  const isLoggedIn = user?.email;

  useEffect(() => {
    if(!isUninitialized && !isLoadingUser && !isFetchingUser){
      if( !isLoggedIn){
        navigate('./login')
        return;
      } else {
        complete();
      }
    } 
  },[isUninitialized, isLoadingUser, isFetchingUser, navigate, isLoggedIn, complete])
  
  return (
    <>
        <LoadItem>
          {!isLoggedIn && (
            <div >
            <h1>Unauthorized :(</h1>
            <InlineLink to='/login'>Login  to gain access</InlineLink>
          </div>
          )}
          {isLoggedIn && (
            <Outlet/>
          )}
        </LoadItem>
  </>
  )
}
 
export default ProtectedRoute;