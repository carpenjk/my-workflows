import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "features/loading/Loading";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";

const Dashboard = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized} = useGetUserDetailsQuery();
  console.log("🚀 ~ file: Dashboard.tsx:11 ~ Dashboard ~ isUninitialized:", isUninitialized)
  console.log("🚀 ~ file: Dashboard.tsx:11 ~ Dashboard ~ isLoadingUser:", isLoadingUser)
  const [isFadingOut, setIsFadingOut] =useState(false);

  useEffect(() => {
    if(!loggedInUser){
      navigate('/login')
    }
  }, [loggedInUser, navigate])
  return (  
    <Loading
      fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
      trigger={!isUninitialized && !isLoadingUser}
      delay={FADE_OUT_DELAY}
      minLoading={MIN_LOADING}
      onTrigger={()=> setIsFadingOut(true)}
    >
      <div>Dashboard</div>);
    </Loading>
  )
}
 
export default Dashboard;