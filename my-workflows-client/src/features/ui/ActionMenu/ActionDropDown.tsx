import React, { useCallback, useRef } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { ScrollLock } from '../shared';

type ButtonAction =   {
  action: string,
  fn:React.MouseEventHandler
}

type LinkAction =   {
  action: string,
  to: string
}

type Actions = (ButtonAction | LinkAction)[];
type Props = {
  actions: Actions
}


const ActionDropDown = ({actions}: Props) => {
  const actionButtonRef = useRef<HTMLButtonElement>(null);
  const onRefChange = useCallback((menuElement: HTMLDivElement | null)=> {
    if(!menuElement){
      return;
    }
    // setMenuRef(menuElement);
    const buttonRect = actionButtonRef.current?.getBoundingClientRect();
    const RIGHT_OFFSET = 16;
    const TOP_OFFSET = 8;
    
    if(buttonRect){
      const top = buttonRect?.top + document.body.scrollTop + TOP_OFFSET;
      const left = buttonRect?.left + document.body.scrollLeft + buttonRect.width + RIGHT_OFFSET;
      menuElement.style.setProperty('top', `${Math.round(top)}px`);
      menuElement.style.setProperty('left', `${Math.round(left)}px`);
    }
  },[])

  return (
    <Menu>
      <MenuButton ref={actionButtonRef} className={`group flex items-center justify-center w-full h-full  
      rounded-sm focus:outline-2 focus:outline focus:outline-sky-600/70 focus:-outline-offset-2 data-[hover]:fill-link-200/75 dark:group-hover:fill-transparent dark:group-hover:text-link-400
    `}>
        <EllipsisHorizontalCircleIcon className={`w-5 h-5 fill-transparent text-text-normal dark:text-dk-text-normal
        group-hover:fill-link-200/75 dark:group-hover:fill-transparent dark:group-hover:text-link-400 transition-all duration-500
      `}/>
      </MenuButton>
        <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className='contents'>
          <ScrollLock disablePortal/>
          <MenuItems 
            ref={onRefChange} 
            anchor={{to: 'right start', gap: "-4px"}}
            className={`flex flex-col items-stretch overflow-hidden z-50 absolute w-fit min-w-[5.5rem] bg-primary-3
            text-dk-text-normal  rounded-md`}>
            {actions.map((action) => (
              <MenuItem 
                key={action.action}
                >
                <div className={`data-[active]:bg-primary-5 '} flex flex-col items-stretch`}>
                { 'to' in action && (
                  <NavLink className={` w-full px-2 py-2 text-xs font-maven`} to={action.to}>
                    {action.action}
                  </NavLink>)}
                { 'fn' in action && (
                  <button className='flex px-2 py-2 text-xs justify-items-start font-maven' onClick={action.fn}>
                    {action.action}
                  </button>)}
                </div>
              </MenuItem>
            ))}
          </MenuItems>
        </div>
    </Transition>
    </Menu>
  )
}

export default ActionDropDown;