import { useState } from "react";

const useTimeSinceMount = () => {
  const [timeMounted, setTimeMounted] = useState(new Date().getTime());

  function getTimeSinceMounted(): number{
    return new Date().getTime() - timeMounted;   
  }
  return {get: getTimeSinceMounted};
}
 
export default useTimeSinceMount;