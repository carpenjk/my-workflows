import { useCreateWorkflowMutation } from "app/services/workflow";
import { LoadingOverlay, useLoading } from "features/loading";
import { FADE_OUT_DELAY, MIN_LOADING } from "features/loading/config";
import { TableCard } from "features/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewWorkflow = () => {
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
       <TableCard
          title="Create New"
          table={<div>create new form</div>}
       />
    </Loading>
 )
}
 
export default NewWorkflow;