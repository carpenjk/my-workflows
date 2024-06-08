import { setTextAreaHeight } from 'utils/autoHeightTextArea';
import { ComponentProps, useEffect, useImperativeHandle, useRef } from 'react';
import React from 'react'
import { Control } from 'react-hook-form';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<"textarea"> {
  id?: string,
  name: string,
  label?: string,
  labelClasses?: ClassNameValue,
  textAreaClasses?: ClassNameValue
  control: Control<any>
} 

type Ref = HTMLTextAreaElement;

const MultilineTextInput = React.forwardRef<Ref, Props>(({name,control, label, labelClasses,className, textAreaClasses, id, placeholder, ...inputProps}, forwardedRef) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  useImperativeHandle(forwardedRef, ()=> textAreaRef.current as HTMLTextAreaElement)

  useEffect(() => {
    if(textAreaRef.current){
      setTextAreaHeight(textAreaRef.current);
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTextAreaHeight(e.target);
    console.log(e.target.value);
    if(inputProps.onChange){
      inputProps.onChange(e);
    }
  }

  const enterInput = (element: HTMLTextAreaElement) => {
    element.setSelectionRange(element.value.length, element.value.length);
  }
  const handleClick = (e: React.MouseEvent  | React.FocusEvent) => enterInput(e.target as HTMLTextAreaElement);
  const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = (e) => enterInput(e.target);

  return ( 
    <div className='relative flex items-center justify-start w-full min-h-fit'>
      {label && (
        <label className={twMerge(`block text-xs xl:text-sm font-bold text-text-normal 
        dark:text-dk-text-normal font-maven`, labelClasses)} htmlFor={id}>
          {label}
      </label>
      )}
      <div ref={containerRef} className='relative flex w-full h-full'>
          <textarea
            onFocus={handleFocus}
            className={twMerge(`relative flex flex-wrap items-center justify-start 
              w-full max-w-full text-text-normal dark:text-dk-text-normal font-maven resize-none border-none 
              bg-transparent text-xs break-words focus:ring-0`,
              textAreaClasses)}
            style={{height: "0px"}}
            id={id}
            rows={1}
            ref={textAreaRef}
            spellCheck={false}
            name={name}
            {...inputProps}
            onChange={handleChange}
            onClick={handleClick}
          />
      </div>
    </div>
   );
});
 
export default MultilineTextInput;