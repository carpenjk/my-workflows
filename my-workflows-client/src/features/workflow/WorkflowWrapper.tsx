import {  useState} from "react";
import {WorkflowCard} from "features/workflow";
import { Loader, LoadingOverlay } from "features/loading";
import { useGetWorkflowQuery } from "app/services/workflow";
import { User, useGetUsersQuery } from "app/services/user";

const WorkflowWrapper = ({workflowID}: {workflowID: string}) => {
  const {data: workflow, isLoading: isLoadingWorkflows, isUninitialized: isUninitializedWorkflows, isFetching: isFetchingWorkflows} = useGetWorkflowQuery(workflowID);
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUninitializedUsers, isFetching: isFetchingUsers} = useGetUsersQuery();

  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const isLoaded = !(isUninitializedWorkflows || isLoadingWorkflows || isFetchingWorkflows
    || isUninitializedUsers || isLoadingUsers || isFetchingUsers)


  return(
      <Loader
      isLoaded={isLoaded}
      fallback={<LoadingOverlay fadeOut={isFadingOut} />}
      onLoaded={()=>setIsFadingOut(true)}
      onMount={()=>setIsFadingOut(false)}
      >
        workflowID 
        ? <WorkflowCard workflow={workflow} users={users as User[]}/> 
        : null
      </Loader>)
}
 
export default WorkflowWrapper;