import { useGetWorkflowQuery } from "app/services/workflow";
import WorkflowCard from "./WorkflowCard";

type Props = {
  workflowID: string;
}

const WorkflowWrapper = ({ workflowID }: Props) => {
  const {data: workflow, isLoading: isLoadingWorkflows, isUninitialized: isWorkflowsUninitialized, isFetching: isWorkflowsFetching} = useGetWorkflowQuery(workflowID);
  return (workflow ? <WorkflowCard workflow={workflow}/> : null);
}
 
export default WorkflowWrapper;