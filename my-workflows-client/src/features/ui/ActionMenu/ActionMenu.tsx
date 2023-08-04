import { NavLink } from "react-router-dom";
import ActionButton from "./ActionButton";
import { useRef, useState } from "react";
import useOnClickOutside from "hooks/useClickOutside";

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
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, ()=> setIsOpen(false) )

  return ( 
    <div className="relative flex items-center w-full h-full justify-stretch">
      <ActionButton onClick={()=> setIsOpen(true)}/>
      {isOpen && (
        <div ref={menuRef} className={`overflow-hidden z-50 absolute top-[25%] left-[125%] w-fit min-w-[5.5rem] bg-dk-primary-6
        text-dk-text-normal rounded-md`}>
        <ul className="">
          {actions.map((action) => (
            <li key={action.action} className="flex hover:bg-link-200 dark:hover:bg-link-100 hover:text-link-950">
              { 'to' in action && (<NavLink className='px-4 py-2 text-sm font-maven' to={action.to}>{action.action}</NavLink>)}
              { 'fn' in action && (<button className='px-4 py-2 text-sm font-maven' onClick={action.fn}>{action.action}</button>)}
            </li> 
          ))}
        </ul>
      </div>
      )}
    </div>
   );
}
 
export default ActionMenu;