import { enUSFormatter } from "utils/date";
import { Workflow } from "app/services/workflow";
import { InlineLink, ItemContainer } from "features/ui";
import CardHeader from "features/ui/shared/CardHeader";
import ColumnHeader from "features/ui/table/ColumnHeader";
import TableCell from "features/ui/table/TableCell";
import { Fragment } from "react";
import { ActionMenu } from "features/ui/ActionMenu";
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import InlineButton from "features/ui/shared/InlineButton";

interface Props {
  workflows: Workflow[]
}


const actions = [
  {
    action: 'edit',
    to: '/workflow'
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
    <ItemContainer className=" max-w-fit w-full p-6 lg:p-9 min-h-[488px]">
    <CardHeader>My Workflows</CardHeader> 
    <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit w-">
      <div className={`grid w-fit min-h-[288px]
        grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(9rem,13rem)_minmax(5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(5rem,8rem)]
        lg:grid-cols-[3.5rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8rem)] 
         content-start
      `}>
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
      </div>
    </div>
    <div className="flex items-center justify-center w-full py-4">
        <InlineButton>
          <span>more</span>
          <span className="duration-500 group-hover:animate-bounce-down"><ChevronDownIcon className="w-6 h-5 "/></span>
        </InlineButton>
        <InlineLink to={'/workflow/new'} className="absolute right-4 sm:right-20">New Workflow</InlineLink>
    </div>
  </ItemContainer>
  )
}
 
export default WorkflowsSummary;