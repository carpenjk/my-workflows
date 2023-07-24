import {  useGetUserDetailsQuery } from 'app/services/auth';
import Loading from 'features/loading/Loading';
import LoadingOverlay from 'features/loading/LoadingOverlay';
import { InlineLink } from 'features/ui';
import { Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const {data: user, isLoading, isUninitialized, isFetching} = useGetUserDetailsQuery();

  if (!user?.email) {
    return (
      <Loading
      fallback={<LoadingOverlay fadeOut={false}/>}
      trigger={!isUninitialized && !isLoading && !isFetching }
    >
      <div >
        <h1>Unauthorized :(</h1>
        <InlineLink to='/login'>Login  to gain access</InlineLink>
      </div>
      </Loading>
    )
  }
  return <Outlet/>;
}
 
export default ProtectedRoute;