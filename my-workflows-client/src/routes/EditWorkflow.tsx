import { useCreateWorkflowMutation } from "app/services/workflow";
import { LoadingOverlay, useLoading } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import WorkflowWrapper from "features/workflow/WorkflowWrapper";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkflow = () => {
  const {workflowID} = useParams<{workflowID: string}>();
  
  const navigate = useNavigate();
  const {Loading, setLoading, isLoading, config} = useLoading(true);
  const [isFadingOut, setIsFadingOut] =useState(false);
  const [createNew, status] = useCreateWorkflowMutation();


  useEffect(() => {
    setLoading(false);
  })


  return(
    <Loading 
       isLoading={isLoading}
       fallback={<LoadingOverlay fadeOut={isFadingOut}/>}
       delay={FADE_OUT_DELAY}
       minLoading={MIN_LOADING}
       onLoaded={()=> setIsFadingOut(true)}
       onUnmount={()=>setIsFadingOut(false)}
       {...config}
    >
      {workflowID ? <WorkflowWrapper workflowID={workflowID}/> : null}
    </Loading>
 )
}
 
export default EditWorkflow;