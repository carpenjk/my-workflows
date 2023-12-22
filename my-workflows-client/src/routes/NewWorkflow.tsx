import { useGetUsersQuery } from "app/services/user";
import { Loader, Loading, LoadingOverlay } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import WorkflowCard from "features/workflow/WorkflowCard";
import { useState } from "react";

const NewWorkflow = () => {
  const [isFadingOut, setIsFadingOut] =useState(false);
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUninitializedUsers, isFetching: isFetchingUsers} = useGetUsersQuery();
  const isLoaded = !(isLoadingUsers || isUninitializedUsers || isFetchingUsers)

  return(
    <Loading
    initialLoadState={true}
    fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    config={{delay: FADE_OUT_DELAY, minLoading: MIN_LOADING}}
    >
      <Loader
        isLoaded={isLoaded}
        onLoaded={()=>setIsFadingOut(true)}
        onMount={()=>setIsFadingOut(false)}
        component={(<WorkflowCard users={users || []}/>)}
      />
    </Loading>
 )
}
 
export default NewWorkflow;