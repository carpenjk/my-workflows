import { enUSFormatter } from "utils/date";
import { Workflow, transformWorkflow, useCreateWorkflowMutation, useDeleteWorkflowMutation } from "app/services/workflow";
import { Table, TableCard } from "features/ui";
import ColumnHeader from "features/ui/table/ColumnHeader";
import TableCell from "features/ui/table/TableCell";
import { Fragment, useState } from "react";
import ActionDropDown from "features/ui/ActionMenu/ActionDropDown";
import { LoadingOverlay } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";

interface Props {
  workflows: Workflow[]
}

const WorkflowsSummary = ({workflows}: Props) => {
  const [deleteWorkflow, deleteStatus] = useDeleteWorkflowMutation();
  const [createWorkflow, createStatus] = useCreateWorkflowMutation();
  // const {Loading, setLoading, isLoading, config} = useLoading(false);
  const [isFadingOut, setIsFadingOut] =useState(false);
  
  async function handleCopy(workflow:Workflow){
    const workflowCopy = transformWorkflow(workflow);
    console.log("🚀 ~ file: WorkflowsSummary.tsx:23 ~ handleCopy ~ workflowCopy:", workflowCopy)
    try{
      await createWorkflow(workflowCopy).unwrap();
    }catch(e){
      console.log(e);   
    } finally{
      // setLoading(false, {minLoading:MIN_LOADING, delay:FADE_OUT_DELAY});
    }
  }
  
  return(
    // <Loading
    //   isLoading={isLoading}
    //   fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
    //   delay={FADE_OUT_DELAY}
    //   minLoading={MIN_LOADING}
    //   onLoaded={()=> setIsFadingOut(true)}
    //   onUnmount={()=>setIsFadingOut(false)}
    //   {...config}
    // >
      <TableCard
        title="My workflows"
        
      >
      <div className="flex items-start justify-start w-full max-w-fit">
        <Table
          className={`grid w-full min-h-[288px]
            grid-cols-[4rem_minmax(7.5rem,10rem)_minmax(9rem,13rem)_minmax(4.5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(4.5rem,8rem)]
            lg:grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8.25rem)] 
            content-start`}
          // actionComponent={
          //   <InlineLink to={'/workflow/new'} className="absolute right-4 sm:right-20">
          //           New Task
          //   </InlineLink>
          // }
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
          loadMore={()=>{}}
        >
            {workflows.map((workflow) => {
              return (
              <Fragment key={workflow.workflowID}>
                <TableCell><ActionDropDown actions={
                  [
                    {
                      action: 'edit',
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
                }/></TableCell>
                <TableCell>{workflow.name}</TableCell>
                <TableCell>{workflow.description}</TableCell>
                <TableCell>{workflow.status}</TableCell>
                <TableCell>{workflow.duration}</TableCell>
                <TableCell>{workflow.workflowOwner.name}</TableCell>
                <TableCell>{enUSFormatter.format(new Date(workflow.updatedAt))}</TableCell>
              </Fragment>
              ) 
            })}
        </Table>
      </div>
    </TableCard>
  // </Loading>
  )
}
 
export default WorkflowsSummary;