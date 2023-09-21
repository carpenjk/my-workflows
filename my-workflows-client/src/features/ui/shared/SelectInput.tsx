import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ComponentProps } from 'react';
import {Control, Controller, useWatch} from 'react-hook-form'
import { ClassNameValue, twMerge } from 'tailwind-merge';
import useOnClickOutside from 'hooks/useOnClickOutside';


interface Value {
  value: string,
  displayValue: string,
}

interface Props extends ComponentProps<"input"> {
  id: string,
  label?: string,
  placeholder: string,
  labelClasses?: ClassNameValue,
  listboxClasses?: ClassNameValue,
  control: Control<any>,
  values: Value[]
} 

type Ref = HTMLDivElement;

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
 
 const SelectInput = React.forwardRef<Ref, Props>(({
  id,
  values,
  label,
  placeholder,
  className,
  listboxClasses,
  labelClasses,
  control,
}: Props, ref) =>  {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isCursorInside, setIsCursorInside] = useState(false);
  const inputControl = useWatch({name: id, control: control});
  
  const optionsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    setIsCursorInside(false);
    if(!inputControl){
      setShowPlaceholder(true)
    }
  }
  
  useOnClickOutside(containerRef, handleClickOutside);  

  const onRefChange = useCallback((optionsElement: HTMLUListElement | null) => {
    if (optionsElement === null) { 
      return
    } else {
      if(containerRef.current){
        
        const { parentElement, offsetHeight } = containerRef.current;
        console.log("🚀 ~ file: SelectInput.tsx:65 ~ onRefChange ~ parentElement:", parentElement)
        const containerRect = containerRef.current.getBoundingClientRect();
        console.log("🚀 ~ file: SelectInput.tsx:67 ~ onRefChange ~ containerRect:", containerRect)
        const parentRect = parentElement?.getBoundingClientRect();
        console.log("🚀 ~ file: SelectInput.tsx:69 ~ onRefChange ~ parentRect:", parentRect)

        const containerPL = parentElement
          ? parseFloat(window?.getComputedStyle(parentElement, null).getPropertyValue('padding-left')) / 2
          : 0;
        const optionsTop = containerRect.top + document.body.scrollTop + offsetHeight;
        const optionsLeft = parentRect
        ? parentRect.left + document.body.scrollLeft + 8 //! why do I need to add 8 here?
        : containerRect.left + document.body.scrollLeft;
        const optionsWidth = parentElement?.offsetWidth;
  
        optionsElement.style.setProperty('top', `${optionsTop}px`);
        optionsElement.style.setProperty('left', `${optionsLeft}px`);
        optionsElement.style.setProperty('width', `${optionsWidth}px`);
      }
    }
  }, []);
  
  return (
    <Controller
    control={control}
    name="ownerID"
    // defaultValue={10}
    render={({ field }) => (
      <Listbox ref={containerRef} value={field.value} onChange={field.onChange}>
        {({ open }:{open: boolean}) => (
          <div className='relative flex items-center justify-start w-full text-xs bg-transparent min-h-fit text-text-normal dark:text-dk-text-normal font-maven lg:text-sm'>
            {label && (
              <Listbox.Label className={twMerge(`block text-xs lg:text-sm font-bold text-text-normal 
              dark:text-dk-text-normal font-maven`, labelClasses)}>{label}:</Listbox.Label>
            )}
            <div className="relative flex w-full h-full">
              <div className={twMerge(`relative flex flex-wrap items-center justify-start 
                w-full max-w-full h-full min-h-fit text-text-normal dark:text-dk-text-normal font-maven 
                text-xs lg:text-sm bg-transparent`, className)}>
                <Listbox.Button className={`relative cursor-text border-none 
                  bg-transparent w-full h-full min-h-fit text-xs lg:text-sm break-words focus:ring-0 focus:outline-none`}>
                  <span className="flex items-center">
                    <span className="block ml-3 truncate">{values.find((val)=> val.value === field.value)?.displayValue}</span>
                  </span>
                </Listbox.Button>
              </div>
            </div>
            {ReactDOM.createPortal(
                <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                  <Listbox.Options ref={onRefChange} className={twMerge(`absolute z-40 py-1 mt-1 overflow-auto
                      bg-primary-9 rounded-md shadow-lg max-h-56 ring-0 focus:outline-none sm:text-sm`, listboxClasses)}>
                    {values.map((value) => (
                      <Listbox.Option
                        key={value.value}
                        className={({ active }: {active: boolean}) =>
                          classNames(
                            active ? ' bg-dk-primary-6 text-dk-primary-2' : ' text-text-normal',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                          )
                        }
                        value={value.value}
                      >
                        {({ selected, active }: {selected: boolean, active: boolean}) => (
                          <>
                            <div className="flex items-center">
                              <div
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {value.displayValue}
                              </div>
                            </div>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
            , document.body)}
          </div>)}
      </Listbox>)}
    
    />
    
  )
})

export default SelectInput;
