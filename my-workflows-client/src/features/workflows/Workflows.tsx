import { enUSFormatter } from "utils/date";
import { Workflow, transformWorkflow, useCreateWorkflowMutation, useDeleteWorkflowMutation } from "app/services/workflow";
import { Table, TableCell, ColumnHeader, ActionButtonCell } from "features/ui/table";
import { Fragment } from "react";
import ActionDropDown from "features/ui/ActionMenu/ActionDropDown";
import { InputCell } from "features/ui";

interface Props {
  workflows: Workflow[]
}

const Workflows = ({workflows}: Props) => {
  
  const [deleteWorkflow, deleteStatus] = useDeleteWorkflowMutation();
  const [createWorkflow, createStatus] = useCreateWorkflowMutation();
  
  async function handleCopy(workflow:Workflow){
    const workflowCopy = transformWorkflow(workflow);
    try{
      await createWorkflow(workflowCopy).unwrap();
    }catch(e){
      console.log(e);   
    }
  }
  
  return(
    
      <form className="contents" onSubmit={()=>{}}>
        <Table
          className={`grid w-full min-h-[288px]
            grid-cols-[4rem_minmax(7.5rem,10rem)_minmax(9rem,13rem)_minmax(4.5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(4.5rem,8rem)]
            lg:grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8.25rem)] 
            content-start`}
          headers={
            <>
              <ColumnHeader className=""></ColumnHeader>
              <ColumnHeader>Name</ColumnHeader>
              <ColumnHeader>Description</ColumnHeader>
              <ColumnHeader>Status</ColumnHeader>
              <ColumnHeader>Duration</ColumnHeader>
              <ColumnHeader>Owner</ColumnHeader>
              <ColumnHeader>Last Modified</ColumnHeader>
            </>
          }
        >
            {workflows.map((workflow) => {
              return (
              <Fragment key={workflow.workflowID}>
                <ActionButtonCell>
                  <ActionDropDown 
                    actions={
                      [
                        {
                          action: 'open',
                          to: `/workflow/${workflow.workflowID}`
                        },
                        {
                          action: 'copy',
                          fn: async () => handleCopy(workflow)
                        },
                        {
                          action: 'delete',
                          fn: ()=> deleteWorkflow(workflow.workflowID)
                        },
                        {
                          action: 'deploy',
                          to: `/workflow${workflow.workflowID}`
                        },
                      ]
                    }/> 
                </ActionButtonCell>
                <InputCell><TableCell>{workflow.name}</TableCell></InputCell>
                <InputCell><TableCell>{workflow.description}</TableCell></InputCell>
                <InputCell><TableCell>{workflow.status}</TableCell></InputCell>
                <InputCell><TableCell>{workflow.duration}</TableCell></InputCell>
                <InputCell><TableCell>{workflow.workflowOwner.name}</TableCell></InputCell>
                <InputCell><TableCell>{enUSFormatter.format(new Date(workflow.updatedAt))}</TableCell></InputCell>
              </Fragment>
              ) 
            })}
        </Table>
    </form> 
    )
}
 
export default Workflows;