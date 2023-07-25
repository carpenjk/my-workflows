import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";


export type Config = {
  minLoading?: number,
  delay?: number,
  ignoreOnLoad?: boolean,
  key?: string
}
export type ConfigReturn = {
  props?: Config,
  key?: Config['key']
}


export type LoadingSetter = (val: boolean, config?: Config)=> void;

const useLoading = (initialValue = true ) => {
  const [isLoading, setIsLoading] = useState(initialValue);
  const [config, setConfig] = useState<ConfigReturn[]>([]);
  const prevValRef = useRef(initialValue);

  const handleSet: LoadingSetter = function(val, config){
    const {key, ...props} = config || {};
    if(key){
      if(props){
        console.log(`settingIsLoading: ${key}:`, val)
        setConfig((prev)=> {
          const original = prev.filter((config) => config.key === key);
          if(original){
            const value = prev.filter((config) => config !== original);
            value.push({...original, ...config})
            return (value);
          }
          return( [...prev, {key, props}])
        });
      }
      
      return;
    }
    
    setIsLoading(val);
  }

  useEffect(() => {
    if(prevValRef.current !== isLoading){

    }
    prevValRef.current = isLoading;
  }, [isLoading]);

  return ( {
    Loading: Loading,
    setLoading: handleSet,
    isLoading: isLoading,
    config: config
  } );
}
 
export default useLoading;