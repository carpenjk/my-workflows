import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { LoadingConfig, LoadingContext } from "./LoadingContext";
import useTimeSince from "./useTimeSince";

type LoadItemProps = {
  children: React.ReactNode;
  fallback?: React.JSX.Element;
  onMount?: Function,
  onLoaded?: Function,
  isLoaded?: boolean
}

type LoadingEffectReturn = {
  complete: ()=>void,
  loading: ()=>void,
  isComponentMounted: boolean,
  fallback: React.JSX.Element
  // LoadItem: (props: LoadItemProps) => JSX.Element
}

type LoadingEventFunctions = {
  onLoaded?: Function,
  onMount?: Function
}

type LoadingEffectProps = {
  initialLoading: boolean,
  onMount?: Function,
  onLoaded?: Function
}

const useLoadingEffect = ({initialLoading, onMount, onLoaded}: LoadingEffectProps): LoadingEffectReturn => {
  const {
     loadingState,
     setComponentLoadingState,
     fallback,
     config
  } = useContext(LoadingContext);

  const [_config, setConfig] = useState<LoadingConfig>(config);
  const eventFunctions = useRef<LoadingEventFunctions>({onLoaded:onLoaded, onMount:onMount});
  

  const timeLoading = useTimeSince();
  const prevIsLoadingRef = useRef(initialLoading);
  const prevIsMountedRef = useRef(!initialLoading);
  
  const {isComponentMounted, isLoading} = loadingState;
  const {delay, minLoading} = _config;

  useEffect(() => {
    const justStartedLoading = isLoading && prevIsLoadingRef.current === false;
    const justLoaded = !isLoading && prevIsLoadingRef.current === true;

    const {onLoaded} = eventFunctions.current;
    if(justStartedLoading){ //go back into loading state when isLoading changes to true
      setComponentLoadingState((prev) => ({
        ...prev,
        isComponentMounted: false
      }))
      
      timeLoading.reset();
    } else{
      if(justLoaded && onLoaded){ 
        onLoaded();
      }
    }
    prevIsLoadingRef.current = isLoading;
  },[isLoading, minLoading, timeLoading, setComponentLoadingState])


  useEffect(() => {
    const justMounted = isComponentMounted && prevIsMountedRef.current === false
    const {onMount} = eventFunctions.current
    if(justMounted && onMount){
      onMount();
    }
    prevIsMountedRef.current = isComponentMounted;
  }, [isComponentMounted]);


  const  mountComponent = useCallback(() => {
    const {onLoaded} = eventFunctions.current;

    const minWait = Math.max((minLoading - delay) - timeLoading.get(), 0)
    const mountingDelay =  minWait + delay;

    const mount = ()=> {
      return setComponentLoadingState({
        isLoading: false,
        isComponentMounted: true
      });
    };

    //onLoad lifecycle occurs between load complete and component mounting
    if(onLoaded) {
      onLoaded()
    };

    if(mountingDelay){
      setTimeout(mount, mountingDelay);
      return;
    }
    mount()
  },[setComponentLoadingState, timeLoading,  delay, minLoading])


  const loading = useCallback((config?: LoadingConfig) => {
    if(isLoading && !isComponentMounted) return;
    setComponentLoadingState({
      isLoading: true,
      isComponentMounted: false
    })
    setConfig((prev) => ({...prev, ...config}));
  },[isLoading, isComponentMounted, setComponentLoadingState])


  const complete = useCallback(() => {
    const remTime = minLoading - timeLoading.get();
    const waitTimeFullfilled = remTime <= 0;
    if((!isLoading && isComponentMounted) || !waitTimeFullfilled) return;
    mountComponent();
  },[isLoading, isComponentMounted, mountComponent, timeLoading, minLoading])

  return ( {
    complete,
    loading,
    // LoadItem,
    fallback,
    isComponentMounted
  } );
}
 
export default useLoadingEffect;
