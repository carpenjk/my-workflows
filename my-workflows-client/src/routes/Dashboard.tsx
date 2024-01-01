import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY } from "features/loading/config";
import { Loader, Loading } from "features/loading";
import { DashboardCard } from "features/dashboard";


const Dashboard = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const isLoaded = !(isLoadingUser || isUninitializedUser || isFetchingUser);
  const [isFadingOut, setIsFadingOut] =useState(false);
  
  useEffect(() => {
    if(!loggedInUser?.email){
      navigate('/login')
    }
  }, [loggedInUser, navigate])


  return (  
    <Loading
    initialLoadState={true}
    fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    config={{delay: FADE_OUT_DELAY}}
    >
      <Loader
        isLoaded={isLoaded}
        onLoaded={()=>setIsFadingOut(true)}
        onMount={()=>setIsFadingOut(false)}
      >
        <DashboardCard />
      </Loader>
    </Loading>
  );
}
 
export default Dashboard;