import { useEffect, useRef, useState } from "react";
import useTimeSinceMount from "./useTimeSinceMount";

type Props = {
  children: React.ReactNode,
  fallback: JSX.Element,
  trigger: boolean,
  delay?: number,
  minLoading?: number,
  onTrigger?: ()=> void,
};

function Loading ({children, trigger, delay = 0, fallback, minLoading = 0, onTrigger}:Props) {
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [execTrigger, setExecTrigger] = useState(false);
  const timeSinceMount = useTimeSinceMount();
  const prevTriggerRef = useRef<boolean>(false);

  useEffect(() => {
    if(execTrigger && onTrigger && trigger){
      const triggerDelay = minLoading - timeSinceMount.get();
      if(triggerDelay){
        setTimeout(onTrigger, triggerDelay);
      } else {
        onTrigger();
      }
    }
    prevTriggerRef.current = trigger && true;
    
  }, [trigger, execTrigger, onTrigger, minLoading, timeSinceMount]);

  const mountingDelay = Math.max(minLoading - timeSinceMount.get(), 0) + delay;

  function mountComponent(){
    const mountCallback = ()=> setIsComponentMounted(true);
      const _mountComponent = mountingDelay
        ? ()=> setTimeout(mountCallback, mountingDelay)
        : mountCallback;
      _mountComponent();
  }
  
  if(isComponentMounted){
    return (<>{children}</>)
  }

  if(trigger){
    const justTriggered = prevTriggerRef.current === false
    if(justTriggered) {
      mountComponent()
      if(!execTrigger) {
        setExecTrigger(true);
      }
      if(!mountingDelay){
        return (<>{children}</>)
      }
    }
  }
  return (<>{fallback}</>)
}
 
export default Loading;