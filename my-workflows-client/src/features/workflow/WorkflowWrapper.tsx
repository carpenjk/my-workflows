import {WorkflowForm} from "features/workflow";
import { useGetWorkflowQuery } from "app/services/workflow";
import { User, useGetUsersQuery } from "app/services/user";
import { TableCard } from "features/ui";

const WorkflowWrapper = ({workflowID}: {workflowID: string}) => {
  const {data: workflow } = useGetWorkflowQuery(workflowID);
  const {data: users } = useGetUsersQuery();

  return(
        workflow 
        ? (
        <TableCard
          title={`Edit Workflow: ${workflow?.workflowID ?? "New Workflow"}`}
        >
          <WorkflowForm workflow={workflow} users={users as User[]}/>
        </TableCard>
    )
        : <TableCard
        title={`Edit Workflow: ${workflowID ?? "New Workflow"}`}
      >
      </TableCard>
  )
}
 
export default WorkflowWrapper;