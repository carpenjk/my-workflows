import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingOverlay from "features/loading/LoadingOverlay";
import { FADE_OUT_DELAY } from "features/loading/config";
import WorkflowsSummary from "features/workflow/WorkflowsSummary";
import { useGetWorkflowsQuery } from "app/services/workflow";
import { Loader, Loading } from "features/loading";

const Workflow = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const {data: workflows, isLoading: isLoadingWorkflows, isUninitialized: isUninitializedWorkflows, isFetching: isFetchingWorkflows} = useGetWorkflowsQuery({limit: 10});
  const [isFadingOut, setIsFadingOut] =useState(false);
  
  const isLoaded = !(isLoadingUser || isUninitializedUser || isFetchingUser || isLoadingWorkflows 
    || isUninitializedWorkflows || isFetchingWorkflows)

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
        <div className="flex items-start w-full h-full justify-stretch md:justify-start pt-28">
          <WorkflowsSummary workflows={workflows || []}/>
        </div>
      </Loader>
    </Loading>
  )
}
 
export default Workflow;