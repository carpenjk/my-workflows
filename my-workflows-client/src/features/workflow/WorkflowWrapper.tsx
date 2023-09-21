import { useGetWorkflowQuery } from "app/services/workflow";
import WorkflowCard from "./WorkflowCard";
import { useGetUsersQuery } from "app/services/user";

type Props = {
  workflowID: string;
}

const WorkflowWrapper = ({ workflowID }: Props) => {
  const {data: workflow, isLoading: isLoadingWorkflows, isUninitialized: isWorkflowsUninitialized, isFetching: isWorkflowsFetching} = useGetWorkflowQuery(workflowID);
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUsersUninitialized, isFetching: isUsersFetching} = useGetUsersQuery();
  
  return (workflow && users ? <WorkflowCard workflow={workflow} users={users}/> : null);
}
 
export default WorkflowWrapper;