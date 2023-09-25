import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";
import ActionButton from "./ActionButton";
import { useCallback, useRef, useState } from "react";
import useOnClickOutside from "hooks/useOnClickOutside";
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

const ActionMenu = ({actions}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);
  const actionButtonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(menuRef, ()=> setIsOpen(false) )

  const onRefChange = useCallback((menuElement: HTMLDivElement | null)=> {
    if(!menuElement){
      return;
    }
    setMenuRef(menuElement);
    const buttonRect = actionButtonRef.current?.getBoundingClientRect();
    const RIGHT_OFFSET = 16;
    const TOP_OFFSET = 8;
    
    if(buttonRect){
      const top = buttonRect?.top + document.body.scrollTop + TOP_OFFSET;
      const left = buttonRect?.left + document.body.scrollLeft + buttonRect.width + RIGHT_OFFSET;
      menuElement.style.setProperty('top', `${top}px`);
      menuElement.style.setProperty('left', `${left}px`);
    }
  },[])

  return ( 
    <div className=" z-[1] relative flex items-center w-full h-full justify-stretch">
      <ActionButton ref={actionButtonRef} onClick={()=> setIsOpen(true)}/>
      {isOpen && ReactDOM.createPortal(
        <>
        <ScrollLock disablePortal/>
          <div ref={onRefChange} className={`overflow-hidden z-50 absolute w-fit min-w-[5.5rem] bg-primary-3
          text-dk-text-normal rounded-md`}>
            <ul className="flex flex-col items-stretch">
              {actions.map((action) => (
                <li key={action.action} className="flex flex-col items-stretch hover:bg-primary-5 dark:hover:bg-link-100">
                  { 'to' in action && (
                    <NavLink className='px-4 py-2 text-sm font-maven' to={action.to}>
                      {action.action}
                    </NavLink>)}
                  { 'fn' in action && (
                    <button className='flex px-4 py-2 text-sm justify-items-start font-maven' onClick={action.fn}>
                      {action.action}
                    </button>)}
                </li> 
              ))}
            </ul>
        </div>
      </>
      , document.body)}
    </div>
   );
}
 
export default ActionMenu;