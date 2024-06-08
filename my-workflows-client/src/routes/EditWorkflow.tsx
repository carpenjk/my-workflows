import { memo } from "react";
import { useParams } from "react-router-dom";
import WorkflowWrapper from "features/workflow/WorkflowWrapper";

const EditWorkflow = memo(() => {
  const {workflowID} = useParams<{workflowID: string}>();

  return(
      workflowID ? <WorkflowWrapper workflowID={workflowID}/> : null
  )
})
 
export default EditWorkflow;