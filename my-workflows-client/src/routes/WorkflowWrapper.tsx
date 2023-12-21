import { User, useGetUsersQuery } from "app/services/user";
import { useGetWorkflowQuery } from "app/services/workflow";
import { LoadingOverlay } from "features/loading";
import useLoadingEffect from "features/loading/useLoadingEffect";
import { WorkflowCard } from "features/workflow";
import { useEffect, useState } from "react";

const WorkflowWrapper = ({workflowID}:{workflowID: string}) => {
  const {data: workflow, isLoading: isLoadingWorkflows, isUninitialized: isWorkflowsUninitialized, isFetching: isFetchingWorkflows} = useGetWorkflowQuery(workflowID);
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUsersUninitialized, isFetching: isFetchingUsers} = useGetUsersQuery();
  
  const {loading, complete, LoadItem} = useLoadingEffect(!(isWorkflowsUninitialized || isLoadingWorkflows || isFetchingWorkflows
    || isUsersUninitialized || isLoadingUsers || isFetchingUsers));
  const [isFadingout, setIsFadingOut] = useState(false);
  
  useEffect(() => {
    if(isWorkflowsUninitialized || isLoadingWorkflows || isFetchingWorkflows
    || isUsersUninitialized || isLoadingUsers || isFetchingUsers){
      console.log('loading')
      loading();
      return;
    } else {
      console.log('complete') 
      complete();
    }
  },[
    isLoadingWorkflows,
    isFetchingWorkflows,
    isWorkflowsUninitialized,
    isLoadingUsers,
    isFetchingUsers,
    isUsersUninitialized,
    loading,
    complete
  ])


  return (
    <LoadItem
      fallback={<LoadingOverlay fadeOut={isFadingout} />}
      onLoaded={()=>setIsFadingOut(true)}
      onMount={()=>setIsFadingOut(false)}
    >
      <WorkflowCard workflow={workflow} users={users as User[]}/>
    </LoadItem> );
}
 
export default WorkflowWrapper;