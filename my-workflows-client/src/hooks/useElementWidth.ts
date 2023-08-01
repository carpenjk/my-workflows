import { useEffect, useRef, useState } from "react";

const useElementWidth = (elem: React.RefObject<HTMLElement>): number | void => {
  const [elemWidth, setElemWidth] = useState<number>();
  const observer = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      setElemWidth(entries[0].target.getBoundingClientRect().width);
    })
  )
  
  useEffect(() => {
    const _observer = observer.current;
    if(elem.current){
      setElemWidth(elem.current.getBoundingClientRect().width);
      observer.current.observe(elem.current);
    }
    return () => _observer.disconnect();
  }, [elem]);
  return elemWidth;
}
 
export default useElementWidth;