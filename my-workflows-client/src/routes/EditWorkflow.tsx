import { memo} from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkflowLoader from "../features/workflow/WorkflowLoader";
import { LoadingOverlay, Loading } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";

const EditWorkflow = memo(() => {
  const {workflowID} = useParams<{workflowID: string}>();
  
  const navigate = useNavigate();
  return(
    <Loading
    initialLoadState={true}
    fallback={<LoadingOverlay fadeOut={false}/>}
    config={{delay: FADE_OUT_DELAY, minLoading: MIN_LOADING}}
    >
      {workflowID ? <WorkflowLoader workflowID={workflowID}/> : null}
    </Loading>)
})
 
export default EditWorkflow;