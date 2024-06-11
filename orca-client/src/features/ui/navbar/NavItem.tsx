import { MouseEventHandler } from "react";
import NavLink from "./NavLink";

type Props = {
  to: string,
  collapsed: boolean,
  children: React.ReactNode,
  button?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const NavItem = ({to, button, collapsed, children, onClick}: Props) => {
  return ( 
    <li className='w-1/4 md:w-full'>
      <div className="flex items-start justify-start w-full">
        {!button && (
          <NavLink to={to} collapsed={collapsed} >
            <div className='flex flex-col items-center justify-center p-4 md:flex-row md:space-x-4 '>
              {children}
            </div>
        </NavLink>
        )}
        {(button)  && (
          <button type='button' onClick={onClick} >
            <div className='flex flex-col items-center justify-center p-4 md:flex-row md:space-x-4 '>
              {children}
            </div>
          </button>  
          )}
      </div>
    </li>
    );
}
  
export default NavItem;