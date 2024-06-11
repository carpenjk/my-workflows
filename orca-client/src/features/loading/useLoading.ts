import { useState } from "react";
import Loading from "./Loading";

export type Config = {
  minLoading?: number,
  delay?: number,
  onLoaded?: ()=> void,
}

export type LoadingSetter = (val: boolean, configObj?: Config)=> void;

const useLoading = (initialValue = true, configObj?: Config ) => {
  const [isLoading, setIsLoading] = useState(initialValue);
  const [config, setConfig] = useState<Config>(configObj || {});

  const handleSet: LoadingSetter = function(val, configObj){
    if(configObj){
      setConfig((prev) => ({...prev, ...configObj}));
    }
    setIsLoading(val);
  }

  return ( {
    Loading: Loading,
    setLoading: handleSet,
    isLoading: isLoading,
    config: config || {}
  } );
}
 
export default useLoading;