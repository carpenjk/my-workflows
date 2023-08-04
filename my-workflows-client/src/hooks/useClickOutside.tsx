import { useEffect } from 'react';


const useOnClickOutside = (ref:React.RefObject<HTMLElement>, handler:(e:Event) => void) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if(ref.current && event?.target instanceof HTMLElement){
        // Do nothing if clicking ref's element or descendent elements
        if (ref.current?.contains(event.target)) {
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