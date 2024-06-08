import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WorkflowsSummary from "features/workflow/WorkflowsSummary";
import { useGetWorkflowsQuery } from "app/services/workflow";

const Workflow = () => {
  const navigate = useNavigate();
  const {data: loggedInUser, isLoading: isLoadingUser, isUninitialized: isUninitializedUser, isFetching: isFetchingUser} = useGetUserDetailsQuery();
  const {data: workflows, isLoading: isLoadingWorkflows, isUninitialized: isUninitializedWorkflows, isFetching: isFetchingWorkflows} = useGetWorkflowsQuery({limit: 10});
  
  useEffect(() => {
    if(!loggedInUser){
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  return (  
          <WorkflowsSummary workflows={workflows || []}/>
  )
}
 
export default Workflow;