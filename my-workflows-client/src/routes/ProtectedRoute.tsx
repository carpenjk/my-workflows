import {  useGetUserDetailsQuery } from 'app/services/auth';
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const {data: user} = useGetUserDetailsQuery();

  if (!user?.email) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }
  return <Outlet/>;
}
 
export default ProtectedRoute;