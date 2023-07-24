import {  useGetUserDetailsQuery } from 'app/services/auth';
import Loading from 'features/loading/Loading';
import LoadingOverlay from 'features/loading/LoadingOverlay';
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const {data: user, isLoading, isUninitialized, isFetching} = useGetUserDetailsQuery();

  if (!user?.email) {
    return (
      <Loading
      fallback={<LoadingOverlay fadeOut={false}/>}
      trigger={!isUninitialized && !isLoading && !isFetching }
    >
      <div className='unauthorized'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
      </Loading>
    )
  }
  return <Outlet/>;
}
 
export default ProtectedRoute;