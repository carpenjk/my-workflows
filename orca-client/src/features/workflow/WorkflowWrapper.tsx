import {WorkflowForm} from "features/workflow";
import { useGetWorkflowQuery } from "app/services/workflow";
import { ColumnHeader, PanelCard, PanelTitle, Table } from "features/ui";
import PanelHeader from "./PanelHeader";
import { NavLink } from "react-router-dom";
import { useGetTasksQuery } from "app/services/task";

const WorkflowWrapper = ({workflowID}: {workflowID: string}) => {
  const {data: workflow } = useGetWorkflowQuery(workflowID);
  const {data: tasks} = useGetTasksQuery(workflowID.toString());


  const previous = "Workflow > "
  const panelTitle = workflow ? `${workflow.workflowID}.${workflow.name}` :  "";
  
  return(
        workflow 
        ? (
        <PanelCard>
          <PanelHeader>
            <PanelTitle ><NavLink className=" text-link-700 dark:text-link-300 underline-offset-1 hover:underline" to="/workflow">{previous}</NavLink>{panelTitle}</PanelTitle>
          </PanelHeader>
          <Table
            className={`grid w-full h-full content-start
              grid-cols-[auto_minmax(9rem,11.5rem)_minmax(12rem,1fr)_minmax(9rem,1fr)_minmax(3rem,_.25fr)_minmax(7rem,.25fr)]`}
            title='Tasks'
            headers={
              <>
                <ColumnHeader></ColumnHeader>
                <ColumnHeader>Name</ColumnHeader>
                <ColumnHeader>Description</ColumnHeader>
                <ColumnHeader>Dependencies</ColumnHeader>
                <ColumnHeader>Due Day</ColumnHeader>
                <ColumnHeader>Owner</ColumnHeader>
              </>
            }
          >
            {tasks ? 
              <WorkflowForm workflowID={workflow.workflowID}  tasks={tasks}/> 
              : null
            }
          
      </Table>
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