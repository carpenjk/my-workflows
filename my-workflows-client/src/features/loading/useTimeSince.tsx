import { useState } from "react";

const  getTime = (): number => new Date().getTime();

const useTimeSince = () => {
  const [timeMounted, setTimeMounted] = useState<number>(getTime());

  function getTimeSinceMounted(): number{
    return new Date().getTime() - timeMounted;   
  }

  return {
    get: getTimeSinceMounted,
    reset: ()=> setTimeMounted(getTime())
  };
}
 
export default useTimeSince;