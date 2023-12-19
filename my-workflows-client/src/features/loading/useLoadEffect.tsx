import { useContext, useEffect, useRef, useState, JSX, PropsWithChildren, ReactElement, memo, useMemo, useCallback } from "react";
import { LoadingConfig, LoadingContext } from "./LoadingContext";
import useTimeSince from "./useTimeSince";


type LoadingEffectReturn = {
  complete: ()=>void,
  loading: ()=>void,
  // RenderChildren: (children:React.ReactNode)=> ReactElement
  LoadItem: ({ children }: {
    children: React.ReactNode;
}) => JSX.Element
}

const useLoadingEffect = (initialLoadValue: boolean): LoadingEffectReturn => {
  const {
     loadingState,
     setComponentLoadingState,
     fallback,
     onUnmount,
     config
  } = useContext(LoadingContext);

  const [execOnLoaded, setExecOnLoaded] = useState(false);
  const [_config, setConfig] = useState<LoadingConfig>(config);

  const timeLoading = useTimeSince();
  const prevIsLoadingRef = useRef(false);
  const prevIsMountedRef = useRef(!initialLoadValue);
  
  const {isComponentMounted, isLoading} = loadingState;
  const {delay, minLoading, onLoaded} = _config;

  const mountingDelay = Math.max(minLoading - timeLoading.get(), 0) + delay;
  

  useEffect(() => {
    const justStartedLoading = isLoading && prevIsLoadingRef.current === false;
    const justLoaded = !isLoading && prevIsLoadingRef.current === true;
    if(justStartedLoading){ //go back into loading state when isLoading changes to true
      setComponentLoadingState((prev) => ({
        ...prev,
        isComponentMounted: false
      }))
      
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
  },[isLoading, onLoaded, minLoading, timeLoading, setComponentLoadingState])


  useEffect(() => {
    const justMounted = isComponentMounted && prevIsMountedRef.current === false
    if(justMounted && onUnmount){
      onUnmount();
    }
    prevIsMountedRef.current = isComponentMounted;
  }, [isComponentMounted, onUnmount]);


  const  mountComponent = useCallback(() => {
    console.log('start mount')
    const mount = ()=> {
      console.log('mount component')
      return setComponentLoadingState({
        isLoading: false,
        isComponentMounted: true
      });
    };

    if(mountingDelay){
      console.log('mounting delayed')
      setTimeout(mount, mountingDelay);
      return;
    }
    mount()
  },[mountingDelay, setComponentLoadingState])


  const loading = useCallback((config?: LoadingConfig) => {
    if(isLoading && !isComponentMounted) return;
    setComponentLoadingState({
      isLoading: true,
      isComponentMounted: false
    })
    setConfig((prev) => ({...prev, ...config}));
  },[isLoading, isComponentMounted, setComponentLoadingState])


  const complete = useCallback(() => {
    console.log("🚀 ~ file: useLoadEffect.tsx:92 ~ complete ~ isComponentMounted:", isComponentMounted)
    console.log("🚀 ~ file: useLoadEffect.tsx:93 ~ complete ~ isLoading:", isLoading)
    if(!isLoading && isComponentMounted) return;
    mountComponent();
  },[isLoading, isComponentMounted, mountComponent])
  

  const LoadItem = useCallback(({children}: {children: React.ReactNode}) =>{
    // render *********************
    if(isComponentMounted){
      return (<>{children}</>)
    }
    // if(!isLoading){
    //   const justLoaded = prevIsLoadingRef.current === true
    //   if(justLoaded) {
    //     mountComponent();
    //     if(!execOnLoaded) {
    //       setExecOnLoaded(true);
    //     }
    //     if(!mountingDelay){
    //       return (children)
    //     }
    //   }
    // }
    return (<>{fallback}</>)
  }, [isComponentMounted, fallback])

  return ( {
    complete,
    loading,
    LoadItem
  } );
}
 
export default useLoadingEffect;