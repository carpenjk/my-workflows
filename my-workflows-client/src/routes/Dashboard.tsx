import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import useLoading from "features/loading/useLoading";

const Dashboard = () => {
  const navigate = useNavigate();
  const {Loading, setLoading, isLoading} = useLoading(true);
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized, isFetching} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);

  console.log('render Dashboard')

  useEffect(() => {
    if(!loggedInUser){
      navigate('/login')
    }
  }, [loggedInUser, navigate])
  
  useEffect(() => {
    console.log('Dashboard effect')
    if(!isFetching){
      setLoading(isLoadingUser || isFetching)
      return;
    } 
    setLoading(false)
  }, [isUninitialized, isLoadingUser, isFetching, isLoading, setLoading]);

  return (  
    <Loading
      fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
      isLoading={isLoading}
      delay={FADE_OUT_DELAY}
      minLoading={MIN_LOADING}
      onLoaded={()=> setIsFadingOut(true)}
    >
      <div>Dashboard</div>);
    </Loading>
  )
}
 
export default Dashboard;