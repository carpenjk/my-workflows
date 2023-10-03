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
            // cellRef.current.focus();
          break;
        default:
          if(inputElement instanceof HTMLElement){
            // inputElement.focus();
          }
      }
    }
  }

  return ( 
    <div
    onKeyDown={handleKeyDown}
    // tabIndex={0}
     ref={cellRef}
     className={twMerge(` whitespace-normal relative flex items-center justify-stretch w-full min-h-[52px] lg:min-h-[58px] 
      pt-2 pb-2 px-3 border border-solid rounded-sm shadow-inner border-primary-8 bg-primary-9
      dark:bg-dk-primary-9 focus-within:outline-2 focus-within:outline focus-within:outline-sky-600/70
       focus-within:-outline-offset-2 text-text-normal dark:text-dk-text-normal font-maven text-xs xl:text-sm`, className)}
       >
      {children}
    </div>
   );
}
 
export default InputCell;