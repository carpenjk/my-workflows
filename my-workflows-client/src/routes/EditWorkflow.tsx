import { memo} from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkflowWrapper from "./WorkflowWrapper";
import { LoadingOverlay, Loading } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";

const EditWorkflow = memo(() => {
  const {workflowID} = useParams<{workflowID: string}>();
  
  console.log('render edit workflow')
  const navigate = useNavigate();
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