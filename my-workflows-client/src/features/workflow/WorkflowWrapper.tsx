import {WorkflowForm} from "features/workflow";
import { useGetWorkflowQuery } from "app/services/workflow";
import { User, useGetUsersQuery } from "app/services/user";
import { PanelCard } from "features/ui";
import PanelHeader from "./PanelHeader";

const WorkflowWrapper = ({workflowID}: {workflowID: string}) => {
  const {data: workflow } = useGetWorkflowQuery(workflowID);
  const {data: users } = useGetUsersQuery();

  const panelTitle = workflow ? `${workflow.workflowID}.${workflow.name}` : "";
  
  return(
        workflow 
        ? (
        <PanelCard
          title={panelTitle}
        >
          <PanelHeader  title={panelTitle} workflow={workflow} users={users as User[]}/>
          <WorkflowForm workflow={workflow} users={users as User[]}/>
        </PanelCard>
    )
        : <PanelCard
        title={`Edit Workflow: ${workflowID ?? "New Workflow"}`}
      >
      </PanelCard>
  )
}
 
export default WorkflowWrapper;