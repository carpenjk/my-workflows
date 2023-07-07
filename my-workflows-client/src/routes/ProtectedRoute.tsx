import { useSelector } from 'react-redux';
import { User, useGetUserDetailsQuery } from '../app/services/auth';
import { getUser } from '../features/auth/auth'
import { NavLink, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  // const user:User | null = useSelector(getUser);
  const {data: user} = useGetUserDetailsQuery();
  console.log("🚀 ~ file: ProtectedRoute.tsx:8 ~ ProtectedRoute ~ user:", user)

  if (!user) {
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