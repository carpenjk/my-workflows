import { ComponentProps, useRef, useState } from 'react';
import React from 'react'
import { useWatch, Control } from 'react-hook-form';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<"textarea"> {
  id?: string,
  name: string,
  label?: string,
  placeholder: string,
  labelClasses?: ClassNameValue,
  textAreaClasses?: ClassNameValue
  control: Control<any>
} 

type Ref = HTMLTextAreaElement;

const MultilineTextInput = React.forwardRef<Ref, Props>(({name,control, label, labelClasses,className, textAreaClasses, id, placeholder, ...inputProps}, ref) => {
  const inputControl = useWatch({name: name, control: control});
  const [isCursorInside, setIsCursorInside] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(!inputControl);
  const containerRef = useRef<HTMLDivElement>(null);

  const leaveInput = () => {
    setIsCursorInside(false);
    if(!inputControl){
      setShowPlaceholder(true)
    }
  }

  const enterInput = (element: HTMLTextAreaElement) => {
    element.setSelectionRange(0, element.value.length);
    setShowPlaceholder(false);
    setIsCursorInside(true);
  }
  const handleClick = (e: React.MouseEvent  | React.FocusEvent) => enterInput(e.target as HTMLTextAreaElement);
  const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = (e) => enterInput(e.target);
  const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = (e) => leaveInput();

  const textAreaDisplayClass = isCursorInside ? 'relative text-text-normal dark:text-dk-text-normal' : 'text-transparent';  
  
  return ( 
    <div className='relative flex items-center justify-start w-full min-h-fit'>
      {label && (
        <label className={twMerge(`block text-xs xl:text-sm font-bold text-text-normal 
        dark:text-dk-text-normal font-maven`, labelClasses)} htmlFor={id}>
          {label}
      </label>
      )}
      <div ref={containerRef} className='relative flex w-full h-full'>
        <div className={twMerge(`relative flex flex-wrap items-center justify-start 
          w-full max-w-full h-full min-h-fit text-text-normal dark:text-dk-text-normal font-maven text-xs xl:text-sm bg-transparent overflow-hidden`, className)}>
          {!isCursorInside ? inputControl : null}
          {(!inputControl && showPlaceholder) ? placeholder : null}
          <textarea
            onFocus={handleFocus}
            onBlurCapture={handleBlur}
            className={twMerge(`resize-none absolute inset-0 p-0 border-none 
              bg-transparent w-full h-full min-h-fit text-xs xl:text-sm break-words focus:ring-0`,
              textAreaDisplayClass , textAreaClasses)}
            id={id}
            rows={2}
            ref={ref}
            spellCheck={false}
            name={name}
            {...inputProps}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
   );
});
 
export default MultilineTextInput;