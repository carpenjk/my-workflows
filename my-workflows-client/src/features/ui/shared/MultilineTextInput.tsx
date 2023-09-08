import useOnClickOutside from 'hooks/useOnClickOutside';
import { ComponentProps, useRef, useState } from 'react';
import React from 'react'
import { useWatch, Control } from 'react-hook-form';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<"textarea"> {
  id: string,
  label?: string,
  placeholder: string,
  labelClasses?: ClassNameValue,
  textAreaClasses?: ClassNameValue
  control: Control<any>
} 

type Ref = HTMLTextAreaElement;

const MultilineTextInput = React.forwardRef<Ref, Props>(({control, label, labelClasses,className, textAreaClasses, id, placeholder, ...inputProps}, ref) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isCursorInside, setIsCursorInside] = useState(false);
  const inputControl = useWatch({name: id, control: control});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    setShowPlaceholder(false);
    setIsCursorInside(true);
  }

  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    setIsCursorInside(false);
    if(!inputControl){
      setShowPlaceholder(true)
    }
  }

  useOnClickOutside(containerRef, handleClickOutside);  
  const textAreaDisplayClass = isCursorInside ? 'relative text-text-normal dark:text-dk-text-normal' : 'text-transparent';  
  
  return ( 
    <div className='relative flex items-center justify-start w-full h-full min-h-fit'>
      {label && (
        <label className={twMerge(`block text-xs lg:text-sm font-bold text-text-normal 
        dark:text-dk-text-normal font-maven`, labelClasses)} htmlFor={id}>
          {label}
      </label>
      )}
      <div ref={containerRef} className='relative flex w-full h-full'>
        <div className={twMerge(`relative flex flex-wrap items-center justify-start 
          w-full max-w-full h-full min-h-fit text-text-normal dark:text-dk-text-normal font-maven text-xs lg:text-sm bg-transparent overflow-hidden`, className)}>
          {!isCursorInside ? inputControl : null}
          {(!inputControl && showPlaceholder) ? placeholder : null}
          <textarea
            className={twMerge(`resize-none absolute inset-0 p-0 border-none 
              bg-transparent w-full h-full min-h-fit text-xs lg:text-sm break-words`,
              textAreaDisplayClass , textAreaClasses)}
            id={id}
            rows={2}
            ref={ref}
            // wrap='off'
            spellCheck={false}
            {...inputProps}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
   );
});
 
export default MultilineTextInput;