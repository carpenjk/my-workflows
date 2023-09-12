import { enUSFormatter } from "utils/date";
import { Workflow } from "app/services/workflow";
import { Table, TableCard } from "features/ui";
import ColumnHeader from "features/ui/table/ColumnHeader";
import TableCell from "features/ui/table/TableCell";
import { Fragment } from "react";
import { ActionMenu } from "features/ui/ActionMenu";

interface Props {
  workflows: Workflow[]
}


const actions = [
  {
    action: 'edit',
    to: '/workflow/1'
  },
  {
    action: 'copy',
    to: '/workflow'
  },
  {
    action: 'delete',
    fn: ()=> null
  },
  {
    action: 'deploy',
    to: '/workflow'
  },
]

const WorkflowsSummary = ({workflows}: Props) => {
  
  return(
    <TableCard
      title="My workflows"
      
    >
    <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit w-">
      <Table
        className={`grid w-fit min-h-[288px]
          grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(9rem,13rem)_minmax(5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(5rem,8rem)]
          lg:grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8rem)] 
          content-start`}
        // actionComponent={
        //   <InlineLink to={'/workflow/new'} className="absolute right-4 sm:right-20">
        //           New Task
        //   </InlineLink>
        // }
        loadMore={()=>{}}
      >
        <div className=""></div>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Description</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
          <ColumnHeader>Duration</ColumnHeader>
          <ColumnHeader>Owner</ColumnHeader>
          <ColumnHeader>Last Modified</ColumnHeader>
          {workflows.map((workflow) => {
            return (
            <Fragment key={workflow.workflowID}>
              <TableCell><ActionMenu actions={actions}/></TableCell>
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
  )
}
 
export default WorkflowsSummary;