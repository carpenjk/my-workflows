import { useGetUsersQuery } from "app/services/user";
import { Loader, Loading, LoadingOverlay } from "features/loading";
import { FADE_OUT_DELAY } from "features/loading/config";
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
    config={{delay: FADE_OUT_DELAY}}
    >
      <Loader
        isLoaded={isLoaded}
        onLoaded={()=>setIsFadingOut(true)}
        onMount={()=>setIsFadingOut(false)}
      >
        <WorkflowCard users={users || []}/>
      </Loader>
    </Loading>
 )
}
 
export default NewWorkflow;