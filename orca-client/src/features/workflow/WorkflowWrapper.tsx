import {WorkflowForm} from "features/workflow";
import { useGetWorkflowQuery } from "app/services/workflow";
import { User, useGetUsersQuery } from "app/services/user";
import { PanelCard, PanelTitle } from "features/ui";
import PanelHeader from "./PanelHeader";
import { NavLink } from "react-router-dom";

const WorkflowWrapper = ({workflowID}: {workflowID: string}) => {
  const {data: workflow } = useGetWorkflowQuery(workflowID);
  const {data: users } = useGetUsersQuery();

  const previous = "Workflow > "
  const panelTitle = workflow ? `${workflow.workflowID}.${workflow.name}` :  "";
  
  return(
        workflow 
        ? (
        <PanelCard>
          <PanelHeader>
            <PanelTitle ><NavLink className=" text-link-700 underline-offset-1 hover:underline" to="/workflow">{previous}</NavLink>{panelTitle}</PanelTitle>
          </PanelHeader>
          <WorkflowForm workflow={workflow} users={users as User[]}/>
        </PanelCard>
    )
        : (
        <PanelCard>
          <PanelHeader>
          <PanelTitle >{panelTitle}</PanelTitle>
          </PanelHeader>
        </PanelCard>
        )
  )
}
 
export default WorkflowWrapper;