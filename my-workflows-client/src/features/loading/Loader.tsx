import {  useLoadingEffect } from "features/loading";
import { useEffect } from "react";

type Props = {
  isLoaded: boolean,
  component: React.ReactNode,
  fallback?: React.JSX.Element,
  onLoaded?: Function,
  onMount?: Function
}

const Loader = ({isLoaded, component, ...loadProps}: Props) => {
  
  const {complete, LoadItem} = useLoadingEffect(isLoaded);

  useEffect(() => {
    if(isLoaded){
      complete();
    }
  }, [complete, isLoaded])

  return ( 
  <LoadItem
    {...loadProps}
  >
    {component}
  </LoadItem> );
}
 
export default Loader;