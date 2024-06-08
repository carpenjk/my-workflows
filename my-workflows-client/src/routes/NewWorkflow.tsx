import { useGetUsersQuery } from "app/services/user";
import { WorkflowForm } from "features/workflow";

const NewWorkflow = () => {
  const {data: users, isLoading: isLoadingUsers, isUninitialized: isUninitializedUsers, isFetching: isFetchingUsers} = useGetUsersQuery();

  return(
    <WorkflowForm users={users || []}/>
 )
}
 
export default NewWorkflow;