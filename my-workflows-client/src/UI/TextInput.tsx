import { ComponentProps } from 'react';
import React from 'react'

interface Props extends ComponentProps<"input"> {
  label: string,
  id: string,
  placeholder: string,
} 

type Ref = HTMLInputElement;

const TextInput = React.forwardRef<Ref, Props>(({label, id, ...inputProps}, ref) => {
  return ( 
    <>
      <label className="block mb-2 text-sm font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        // {...register(id,  { required: true })}
        className="w-full " 
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