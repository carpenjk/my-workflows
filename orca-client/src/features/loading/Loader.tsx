import { useEffect } from "react";
import useLoadingEffect from "./useLoadingEffect";

type Props = React.PropsWithChildren<{
  isLoaded: boolean,
  // component: React.ReactNode,
  fallback?: React.JSX.Element,
  onLoaded?: Function,
  onMount?: Function,
}>

const Loader = ({children, fallback: priorityFallback, onLoaded, onMount, isLoaded}: Props) =>{
  const {complete, loading, fallback, isComponentMounted} = useLoadingEffect({initialLoading: true, onLoaded, onMount});

  useEffect(() => {
    if(isLoaded){
      complete();
      return
    } 
    loading();
  }, [complete, loading, isLoaded])

  const _fallback = priorityFallback || fallback;
  // just render component if already mounted
  if(isComponentMounted){
    return (<>{children}</>)
  }
  
  return (<>{_fallback}</>)
}

export default Loader;