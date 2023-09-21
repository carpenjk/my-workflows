import { useGetUsersQuery } from "app/services/user";
import { LoadingOverlay, useLoading } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import WorkflowCard from "features/workflow/WorkflowCard";
import { useEffect, useState } from "react";

const NewWorkflow = () => {
  const {Loading, setLoading, isLoading, config} = useLoading(true);
  const [isFadingOut, setIsFadingOut] =useState(false);
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUsersUninitialized, isFetching: isFetchingUsers} = useGetUsersQuery();

  useEffect(() => {
    setLoading(isLoadingUsers || isFetchingUsers);
  })

  return(
    <Loading 
       isLoading={isLoading && isLoadingUsers}
       fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
       delay={FADE_OUT_DELAY}
       minLoading={MIN_LOADING}
       onLoaded={()=> setIsFadingOut(true)}
       onUnmount={()=>setIsFadingOut(false)}
       {...config}
    >
       <WorkflowCard users={users || []}/>
    </Loading>
 )
}
 
export default NewWorkflow;