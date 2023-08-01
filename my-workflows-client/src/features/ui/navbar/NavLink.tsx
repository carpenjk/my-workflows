import {NavLink} from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
type Props = {
  to: string,
  collapsed?: boolean,
  children: React.ReactNode
}

const CustomNavLink = ({to, collapsed,children}: Props) => {
  
  return ( 
    <NavLink 
    className={({isActive}) =>  twMerge(` w-full flex items-center justify-center 
      md:justify-stretch  text-xs sm:text-base dark:text-dk-text-normal 
      text-text-normal hover:bg-primary-9 dark:hover:bg-dk-primary-7 rounded-sm md:rounded-md 
      overflow-x-hidden transition-all truncate duration-300 ease-in-out font-normal font-roboto`,
      isActive && " dark:bg-dk-primary-7 bg-primary-9 ", collapsed && "md:w-navbar-collapsed flex-none ")}
    to={to} 
    >
      {children}
    </NavLink>
   );
}
 
export default CustomNavLink;