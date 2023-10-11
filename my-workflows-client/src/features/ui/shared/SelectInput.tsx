import React, { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Fragment } from 'react'
import useResizeObserver from "use-resize-observer";
import { Listbox, Transition } from '@headlessui/react'
import { ComponentProps } from 'react';
import {Control, Controller, ControllerRenderProps} from 'react-hook-form'
import { ClassNameValue, twMerge } from 'tailwind-merge';
import ScrollLock from './ScrollLock';


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
  values: Value[], 
  multiple?: boolean,
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
  multiple,
  defaultValue,
}: Props, ref) =>  {
    
  const optionsRef = useRef<HTMLUListElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const placeOptionsContainer =useCallback((optionsElement: HTMLUListElement, bodyWidth?: number)=> {
    if(!containerRef?.current){
      return;
    }
    const _bodyWidth = bodyWidth
      ? bodyWidth
      : document.body.getBoundingClientRect().width;
    

    const { parentElement, offsetHeight } = containerRef.current;
    const xAnchorElement = parentElement ?? containerRef.current;
    const containerRect = containerRef.current.getBoundingClientRect();
    const xAnchorRect = xAnchorElement.getBoundingClientRect();
    
    const optionsTop = containerRect.top + document.body.scrollTop + offsetHeight;
    const optionsLeft = xAnchorRect.left + document.body.scrollLeft ;
    const optionsWidth = parentElement?.offsetWidth ?? 0;
    const rightX = optionsLeft + optionsWidth;
    
    if(rightX < _bodyWidth){
      optionsElement.style.setProperty('top', `${optionsTop}px`);
      optionsElement.style.setProperty('left', `${optionsLeft}px`);
      optionsElement.style.setProperty('width', `${optionsWidth}px`);  
    } else {
      optionsElement.style.setProperty('top', `${optionsTop}px`);
      optionsElement.style.setProperty('right', `0`);
      optionsElement.style.setProperty('width', `${optionsWidth}px`);  
    }
    
  }, [])

  const { width } = useResizeObserver<HTMLElement>({
    ref: document.body,
    onResize: ({width})=> {
      if(optionsRef.current && width){
        placeOptionsContainer(optionsRef.current, width)
      }
    }
  });

  const onRefChange = useCallback((optionsElement: HTMLUListElement | null) => {
    if (optionsElement === null) { 
      if(containerRef.current){
        const buttonElement = containerRef.current.querySelector('button');
        if(buttonElement){
          buttonElement.focus();
        }
      }
      return;
    } else {
      optionsRef.current = optionsElement;
      placeOptionsContainer(optionsElement, width)
    }
  }, [placeOptionsContainer, width]);

  const getDisplayValues = (field: ControllerRenderProps<any, string>): string | undefined => {
    if(!Array.isArray(field.value)){
      return values.find((val) => val.value === field.value)?.displayValue;
    }
    const displayValue = values.filter(val=> field.value.includes(val.value));
    return (displayValue.length > 0 ? displayValue.map(val=> val.displayValue).toString() : undefined);
  }
  
  return (
    <Controller
    control={control}
    name={id}
    defaultValue={defaultValue}
    render={({ field }) => {
      console.log("🚀 ~ file: SelectInput.tsx:119 ~ field:", field)
      return (
        <Listbox ref={containerRef} value={field.value} onChange={field.onChange} name={id} multiple={multiple}>
          {({ open }: { open: boolean; }) => {
            return (
              <div className='relative flex items-center justify-start w-full bg-transparent min-h-fit text-text-normal dark:text-dk-text-normal font-maven'>
                {label && (
                  <Listbox.Label className={twMerge(`block text-xs xl:text-sm font-bold text-text-normal 
              dark:text-dk-text-normal font-maven`, labelClasses)}>{label}:</Listbox.Label>
                )}
                <div className="relative flex w-full h-full">
                  <div className={twMerge(`relative flex flex-wrap items-center justify-start 
                      w-full max-w-full h-full min-h-fit text-text-normal dark:text-dk-text-normal font-maven 
                      text-xs lg:text-sm bg-transparent`, className)}>
                    <Listbox.Button className={`relative cursor-text border-none 
                      bg-transparent w-full h-full min-h-fit text-xs xl:text-sm break-words focus:ring-0 focus:outline-none`}>
                      <span className="flex items-center">
                        <span className="block truncate">{getDisplayValues(field) ?? placeholder}</span>
                      </span>
                    </Listbox.Button>
                  </div>
                </div>
                {(ReactDOM.createPortal(
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className='contents'>
                      <ScrollLock disablePortal />
                      <Listbox.Options ref={onRefChange} className={twMerge(`absolute top-0 z-50 py-1 mt-1 overflow-auto
                          bg-primary-9 rounded-md shadow-lg max-h-56 ring-0 focus:outline-none sm:text-sm
                          text-text-normal dark:text-dk-text-normal`, listboxClasses)}>
                        {values.map((value) => (
                          <Listbox.Option
                            key={value.value}
                            className={({ active }: { active: boolean; }) => classNames(
                              active ? ' bg-dk-primary-6 text-dk-primary-2' : ' text-text-normal',
                              'relative cursor-default select-none py-2 px-3 font-maven text-xs xl:text-sm'
                            )}
                            value={value.value}
                          >
                            {({ selected, active }: { selected: boolean; active: boolean; }) => (
                              <>
                                <div className="flex items-center">
                                  <div
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                  >
                                    {value.displayValue}
                                  </div>
                                </div>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Transition>,
                  document.body))}
              </div>);
          } }
        </Listbox>);
    }}
    />
    
  )
})

export default SelectInput;
