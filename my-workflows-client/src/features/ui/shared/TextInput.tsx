import { ComponentProps } from 'react';
import React from 'react'
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<"input"> {
  label: string,
  id: string,
  placeholder: string,
  labelClasses?: string
} 

type Ref = HTMLInputElement;

const TextInput = React.forwardRef<Ref, Props>(({label, labelClasses,className, id, ...inputProps}, ref) => {
  return ( 
    <>
      <label className={twMerge(`block mb-2 text-base font-bold text-text-normal dark:text-dk-text-normal 
        font-roboto`, labelClasses)} htmlFor={id}>
          {label}
      </label>
      <input
        className={twMerge("w-full text-base border-none", className)}
        id={id}
        type="text"
        ref={ref}
        {...inputProps}
      >
      </input>
    </>
   );
});
 
export default TextInput;