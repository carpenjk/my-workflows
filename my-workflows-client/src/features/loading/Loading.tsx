import { useEffect, useRef, useState } from "react";
import useTimeSinceMount from "./useTimeSinceMount";

type Props = {
  children: React.ReactNode,
  fallback: JSX.Element,
  isLoading: boolean,
  delay?: number,
  minLoading?: number,
  onLoaded?: ()=> void,
};

function Loading ({children, delay = 0, fallback, isLoading, minLoading = 0, onLoaded}:Props) {
  const [isComponentMounted, setIsComponentMounted] = useState(!isLoading);
  const [execOnLoaded, setExecOnLoaded] = useState(false);
  const timeSinceMount = useTimeSinceMount();
  const previsLoadingRef = useRef<boolean>(false);

  useEffect(() => {
    if(isLoading && previsLoadingRef.current === false){
      setIsComponentMounted(false);
    } else{
      if(execOnLoaded && onLoaded && !isLoading){
        const onLoadedDelay = minLoading - timeSinceMount.get();
        if(onLoadedDelay){
          setTimeout(onLoaded, onLoadedDelay);
        } else {
          onLoaded();
        }
      }
    }
    previsLoadingRef.current = isLoading;
  },[isLoading, execOnLoaded, onLoaded, minLoading, timeSinceMount])

  const mountingDelay = Math.max(minLoading - timeSinceMount.get(), 0) + delay;

  function mountComponent(){
    const mountCallback = ()=> {
      return setIsComponentMounted(true);
    };
      const _mountComponent = mountingDelay
        ? ()=> setTimeout(mountCallback, mountingDelay)
        : mountCallback;
      _mountComponent();
  }
  
  if(isComponentMounted){
    return (<>{children}</>)
  }

  if(!isLoading){
    const justLoaded = previsLoadingRef.current === true
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