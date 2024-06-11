import { useEffect } from 'react';


const useOnClickOutside = (ref:React.RefObject<HTMLElement> | HTMLElement | null, handler:(e:MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    if(!ref){
      return;
    }
    
    const listener = (event: MouseEvent | TouchEvent) => {
      const _ref = "current" in ref ? ref.current : ref;
      if(event?.target instanceof HTMLElement){
        // Do nothing if clicking ref's element or descendent elements
        if (_ref?.contains(event.target)) {
          return;
        }
        handler(event);
      };  
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [ref, handler]);
};

export default useOnClickOutside;