import {  useGetUserDetailsQuery } from 'app/services/auth';
import useLoadingEffect from 'features/loading/useLoadEffect';
import { InlineLink } from 'features/ui';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const {loading, complete, LoadItem} = useLoadingEffect(true);
  const {data: user, isLoading: isLoadingUser, isUninitialized, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  
  const isLoggedIn = user?.email;

  // const {Loading, setLoading, isLoading} = useLoading(true);
  // const [isFadingOut, setIsFadingOut] =useState(false);

  useEffect(() => {
    if(!isUninitialized && !isLoadingUser && !isFetchingUser){
      // loading();
      if( !isLoggedIn){
        navigate('./login')
        return;
      } else {
        console.log('protected routes complete')
        complete();
      }
    } 
  },[isUninitialized, isLoadingUser, isFetchingUser, navigate, isLoggedIn, complete, loading])
  // useEffect(() => {
  //   if(!isUninitialized){
  //     if(!isLoadingUser && !isFetchingUser && !user?.email){
  //       navigate('./login')
  //       return;
  //     }
  //     setLoading(isLoadingUser || isFetchingUser);
  //   }

  // },[isUninitialized, isLoadingUser, isFetchingUser, setLoading, navigate, user])

  
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