import { useGetUserDetailsQuery } from "app/services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Workflows } from "features/workflows";
import { useGetWorkflowsQuery } from "app/services/workflow";
import { PanelCard, PanelTitle } from "features/ui";
import PanelHeader from "features/workflow/PanelHeader";

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
    <PanelCard
    >
      <PanelHeader>
        <PanelTitle>Workflows</PanelTitle>
      </PanelHeader>
          <Workflows workflows={workflows || []}/>
    </PanelCard>
  )
}
 
export default Workflow;