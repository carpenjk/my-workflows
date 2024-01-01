import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY } from "features/loading/config";
import { Loader, Loading } from "features/loading";

const Manage = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const [isFadingOut, setIsFadingOut] =useState(false);
  const isLoaded = !(isLoadingUser || isUninitializedUser || isFetchingUser)

  useEffect(() => {
    if(!loggedInUser){
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
        <div className="text-text-normal dark:text-dk-text-normal">Manage Workflows</div>
       </Loader>
    </Loading>
  )
}
 
export default Manage;