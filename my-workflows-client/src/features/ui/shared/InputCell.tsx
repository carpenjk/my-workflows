import { useRef } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode,
  className?: ClassNameValue,
  inputName?: string,
  focusOnEsc?: Boolean
}

const InputCell = ({children, className, inputName, focusOnEsc = false}: Props) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const handleKeyDown: React.KeyboardEventHandler = (e)=>{
    if(cellRef.current){
      const inputElement = cellRef.current.querySelector(`*[name="${inputName}"]`) as HTMLElement;
      switch(e.key){
        case 'Escape':
            if(inputElement && focusOnEsc){
              inputElement.focus();
            }
      }
    }
  }

  return ( 
    <div
    onKeyDown={handleKeyDown}
    // tabIndex={0}
     ref={cellRef}
     className={twMerge(`relative flex items-center justify-stretch w-full 
       border border-solid rounded-sm focus-within:shadow-inner border-primary-8 dark:border-dk-primary-7 bg-primary-9
      dark:bg-dk-primary-8 focus-within:outline-2 focus-within:outline focus-within:outline-sky-600/70
       focus-within:-outline-offset-2 `, className)}
       >
      {children}
    </div>
   );
}
 
export default InputCell;