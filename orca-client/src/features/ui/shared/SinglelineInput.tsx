import { ComponentProps } from "react";
import { Control } from "react-hook-form";
import React from 'react';
import { ClassNameValue, twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
  id?: string,
  name: string,
  label?: string,
  inputClasses?: ClassNameValue
  control: Control<any>
}

const SinglelineInput = React.forwardRef<HTMLInputElement, Props>((
  {name,control, label, className, inputClasses, id, placeholder, ...inputProps},
  forwardedRef) => {

    const enterInput = (element: HTMLInputElement) => {
      element.setSelectionRange(element.value.length, element.value.length);
    }
    const handleClick = (e: React.MouseEvent  | React.FocusEvent) => enterInput(e.target as HTMLInputElement);
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => enterInput(e.target);

  return ( 
    <input
      ref={forwardedRef}
      id={id}
      className={twMerge(`relative flex flex-wrap items-center justify-start 
        w-full max-w-full p-0 text-text-normal dark:text-dk-text-normal font-maven resize-none border-none 
        bg-transparent text-xs break-words focus:ring-0 shadow-none`, inputClasses)}
      type='text'
      {...inputProps}
      onClick={handleClick}
      onFocus={handleFocus}
    />
   );
})
 
export default SinglelineInput;