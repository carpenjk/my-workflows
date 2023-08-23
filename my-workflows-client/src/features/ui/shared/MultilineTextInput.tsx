import useOnClickOutside from 'hooks/useOnClickOutside';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import React from 'react'
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<"textarea"> {
  label: string,
  id: string,
  placeholder: string,
  labelClasses?: string
} 

type Ref = HTMLTextAreaElement;

const MultilineTextInput = React.forwardRef<Ref, Props>(({label, labelClasses,className, id, placeholder, ...inputProps}, ref) => {
  const [displayValue, setDisplayValue] =useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isCursorInside, setIsCursorInside] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDisplayValue(e.target.value);
  }

  const handleClick = (e: React.MouseEvent) => {
    setShowPlaceholder(false);
    setIsCursorInside(true);
  }

  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    console.log("🚀 ~ file: MultilineTextInput.tsx:36 ~ handleClickOutside ~ e:", e)
    setIsCursorInside(false);
    if(!displayValue){
      setShowPlaceholder(true)
    }
  }

  useOnClickOutside(containerRef, handleClickOutside);
  
  const textAreaDisplayClass = isCursorInside ? 'relative text-text-normal dark:text-dk-text-normal' : 'text-transparent';  
  
  return ( 
    <div className='relative flex items-center justify-start w-full h-full min-h-fit'>
      <label className={twMerge(`block text-sm font-bold text-text-normal dark:text-dk-text-normal 
        font-maven`, labelClasses)} htmlFor={id}>
          {label}
      </label>
      <div ref={containerRef} className='relative flex h-full min-h-fit'>
        <div className={twMerge('relative flex flex-wrap break-words items-center justify-start w-full h-full min-h-fit font-maven text-sm bg-transparent', className)}>
          {!isCursorInside ? displayValue : null}
          {(!displayValue && showPlaceholder) ? placeholder : null}
          <textarea
            className={`${textAreaDisplayClass} resize-none absolute inset-0 p-0 border-none bg-transparent w-full h-full min-h-fit text-sm`}
            rows={2}
            id={id}
            ref={ref}
            {...inputProps}
            onChange={handleInput}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
   );
});
 
export default MultilineTextInput;