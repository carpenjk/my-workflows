import { Workflow } from "app/services/workflow";
import { ItemContainer } from "features/ui";
import CardHeader from "features/ui/shared/CardHeader";
import ColumnHeader from "features/ui/table/ColumnHeader";
import TableCell from "features/ui/table/TableCell";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  workflows: Workflow[]
}


const enUSFormatter = new Intl.DateTimeFormat('en-US');

const WorkflowCard = ({workflows}: Props) => {
  
  return(
    <ItemContainer className=" max-w-fit w-full p-6 lg:p-9 min-h-[488px]">
    <CardHeader>My Workflows</CardHeader> 
    <div className="flex items-start justify-start w-full overflow-x-auto max-w-fit">
      <div className={`grid w-fit min-h-[288px]
        grid-cols-[3rem_minmax(8rem,10rem)_minmax(9rem,13rem)_minmax(5rem,7rem)_minmax(5rem,8rem)_minmax(5rem,8.5rem)_minmax(5rem,8rem)]
        lg:grid-cols-[3rem_minmax(8rem,10rem)_minmax(11rem,13rem)_minmax(6rem,7rem)_minmax(6rem,8rem)_minmax(6rem,8.5rem)_minmax(6rem,8rem)] 
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
            <>
            <TableCell key={`${workflow.workflowID}_1`}>{<div className="w-full h-full"><EllipsisHorizontalCircleIcon/></div>}</TableCell>
            <TableCell key={`${workflow.workflowID}_2`}>{workflow.name}</TableCell>
            <TableCell key={`${workflow.workflowID}_3`}>{workflow.description}</TableCell>
            <TableCell key={`${workflow.workflowID}_4`}>{workflow.status}</TableCell>
            <TableCell key={`${workflow.workflowID}_5`}>{workflow.duration}</TableCell>
            <TableCell key={`${workflow.workflowID}_6`}>{workflow.owner}</TableCell>
            <TableCell>{'03/12/2023'}</TableCell>
            </>
           ) 
          })}
      </div>
    </div>
  </ItemContainer>
  )
}
 
export default WorkflowCard;