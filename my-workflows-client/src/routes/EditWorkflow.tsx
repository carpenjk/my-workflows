import { memo } from "react";
import { useParams } from "react-router-dom";
import { LoadingOverlay, Loading } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import WorkflowWrapper from "features/workflow/WorkflowWrapper";

const EditWorkflow = memo(() => {
  const {workflowID} = useParams<{workflowID: string}>();

  return(
    <Loading
    initialLoadState={true}
    fallback={<LoadingOverlay fadeOut={false}/>}
    config={{delay: FADE_OUT_DELAY, minLoading: MIN_LOADING}}
    >
      {workflowID ? <WorkflowWrapper workflowID={workflowID}/> : null}
    </Loading>)
})
 
export default EditWorkflow;