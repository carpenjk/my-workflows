import { User, useGetUsersQuery } from "app/services/user";
import {  useGetWorkflowQuery } from "app/services/workflow";
import useLoadingEffect from "features/loading/useLoadEffect";
import { WorkflowCard } from "features/workflow";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkflow = memo(() => {
  const {workflowID} = useParams<{workflowID: string}>();
  const {data: workflow, isLoading: isLoadingWorkflows, isUninitialized: isWorkflowsUninitialized, isFetching: isFetchingWorkflows} = useGetWorkflowQuery(workflowID as string);
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUsersUninitialized, isFetching: isFetchingUsers} = useGetUsersQuery();
  
  const {loading, complete, LoadItem} = useLoadingEffect(true);
  
  console.log('render edit workflow')

  const isNotComplete = isWorkflowsUninitialized || isLoadingWorkflows || isFetchingWorkflows || isUsersUninitialized || isLoadingUsers || isFetchingUsers;
  console.log("🚀 ~ file: EditWorkflow.tsx:18 ~ EditWorkflow ~ isNotComplete:", isNotComplete)

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
  
  const navigate = useNavigate();
  return(<LoadItem><WorkflowCard workflow={workflow} users={users as User[]}/></LoadItem>)
})
 
export default EditWorkflow;