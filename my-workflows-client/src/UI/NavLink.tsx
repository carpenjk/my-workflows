import {NavLink} from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
type Props = {
  to: string,
  collapsed?: boolean,
  collapsedWidth?: string,
  children: React.ReactNode
}

const CustomNavLink = ({to, collapsed, collapsedWidth,children}: Props) => {
  
  return ( 
    <NavLink 
    className={({isActive}) =>  twMerge(" w-full flex items-center justify-center  sm:justify-stretch  text-xs sm:text-sm  text-gray-100 rounded-sm sm:rounded-md  overflow-x-hidden transition-all truncate hover:bg-slate-700 duration-300 ease-in-out ",
     isActive && " bg-slate-700", collapsed && "w-navbar-collapsed flex-none ")}
    to={to} 
    >
      {children}
    </NavLink>
   );
}
 
export default CustomNavLink;