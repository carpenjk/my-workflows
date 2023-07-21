import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode,
  fallback: JSX.Element,
  trigger: boolean,
  delay?: number,
  onTrigger?: ()=> void,
};

function Suspend ({children, trigger, delay = 0, fallback, onTrigger}:Props){
  const [unmountFallback, setUnmountFallback] = useState(false);
  const prevTriggerRef = useRef<boolean>();
  const prevUnmountFallbackref = useRef<boolean>(); 
  const wasPrevFallback = (prevTriggerRef.current && true !== trigger && true) && prevUnmountFallbackref.current === false

  const unMountCallback = () => setUnmountFallback(true);


  useEffect(() => {
    prevTriggerRef.current = trigger;
    prevUnmountFallbackref.current = unmountFallback;
  }, [trigger, unmountFallback]);

  //render fallback if not triggered
  if(!trigger){
    return (<>{fallback}</>)
  }

  if(prevTriggerRef.current !== trigger) {
    if(onTrigger){
      onTrigger()
    }
  }
  
  //unmount fallback and render component immediately if no delay 
  if(unmountFallback || !delay){
    setUnmountFallback(true);
    return (<>{children}</>)
  }

  setTimeout(unMountCallback, delay)
  
  return (<>{fallback}</>);
}
 
export default Suspend;