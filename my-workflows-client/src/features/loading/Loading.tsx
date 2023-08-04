import { useEffect, useRef, useState } from "react";
import useTimeSince from "./useTimeSince";

type Props = {
  children: React.ReactNode,
  fallback: JSX.Element,
  isLoading: boolean,
  delay?: number,
  minLoading?: number,
  onLoaded?: ()=> void,
  onUnmount?: ()=> void,
};

function Loading ({children, delay = 0, fallback, isLoading, minLoading = 0, onLoaded, onUnmount}:Props) {
  const [isComponentMounted, setIsComponentMounted] = useState(!isLoading);
  const [execOnLoaded, setExecOnLoaded] = useState(false);
  const timeLoading = useTimeSince();
  const prevIsLoadingRef = useRef<boolean>(false);
  const prevIsMountedRef = useRef<boolean>(!isLoading);

  useEffect(() => {
    const justStartedLoading = isLoading && prevIsLoadingRef.current === false;
    const justLoaded = !isLoading && prevIsLoadingRef.current === true;
    if(justStartedLoading){ //go back into loading state when isLoading changes to true
      setIsComponentMounted(false);
      timeLoading.reset();
    } else{
      if(justLoaded && onLoaded){ 
        const onLoadedDelay = minLoading - timeLoading.get();
        if(onLoadedDelay){
          setTimeout(onLoaded, onLoadedDelay);
        } else {
          onLoaded();
        }
      }
    }
    prevIsLoadingRef.current = isLoading;
  },[isLoading, onLoaded, minLoading, timeLoading])

  useEffect(() => {
    const justMounted = isComponentMounted && prevIsMountedRef.current === false
    if(justMounted && onUnmount){
      onUnmount();
    }
    prevIsMountedRef.current = isComponentMounted;
  }, [isComponentMounted, onUnmount]);

  const mountingDelay = Math.max(minLoading - timeLoading.get(), 0) + delay;

  function mountComponent(){
    const mountCallback = ()=> {
      return setIsComponentMounted(true);
    };
      const _mountComponent = mountingDelay
        ? ()=> setTimeout(mountCallback, mountingDelay)
        : mountCallback;
      _mountComponent();
  }
  

  // render *********************
  if(isComponentMounted){
    return (<>{children}</>)
  }

  if(!isLoading){
    const justLoaded = prevIsLoadingRef.current === true
    if(justLoaded) {
      mountComponent();
      if(!execOnLoaded) {
        setExecOnLoaded(true);
      }
      if(!mountingDelay){
        return (<>{children}</>)
      }
    }
  }
  return (<>{fallback}</>)
}
 
export default Loading;