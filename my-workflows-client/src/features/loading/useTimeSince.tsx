import { useCallback, useState } from "react";

const  getTime = (): number => new Date().getTime();

const useTimeSince = () => {
  const [timeMounted, setTimeMounted] = useState<number>(getTime());

  const getTimeSinceMounted = useCallback((): number => {
    return getTime() - timeMounted;   
  },[timeMounted])

  return {
    get: getTimeSinceMounted,
    reset: ()=> setTimeMounted(getTime())
  };
}
 
export default useTimeSince;