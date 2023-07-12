import { HTMLProps, useState } from 'react';
import NavItem from '../UI/NavItem';
import {HomeIcon, SquaresPlusIcon, TableCellsIcon, UserIcon, ArrowsRightLeftIcon} from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge';
import { useSelector } from 'react-redux';
import { getUser } from '../features/auth/auth';
import { User, useGetUserDetailsQuery, useLogoutMutation } from '../app/services/auth';

type Props = {
  className?: HTMLProps<HTMLElement>["className"];
}

const Navbar = ({className}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {data: user} = useGetUserDetailsQuery();
  const [logOut] = useLogoutMutation();
  const loggedInUser: User | null = useSelector(getUser);

  return (
    <div className={twMerge("fixed bottom-0 sm:relative w-screen sm:h-screen sm:pl-4 sm:pr-8 sm:flex sm:flex-col sm:w-auto bg-gradient-to-b from-sky-950/10 via-sky-900/20 to-slate-900", className)}>
      <nav className='relative w-full'>
        <ul className="flex justify-between w-full sm:space-y-6 sm:flex-col ">
          <NavItem collapsed={isCollapsed} to="/" ><HomeIcon className='flex-none w-5 h-5 '/>{<span>Dashboard</span>}</NavItem>
          <NavItem collapsed={isCollapsed} to="/workflows" ><SquaresPlusIcon className='flex-none w-5 h-5'/><span className='flex space-x-1.5'><span>Create</span><span className='hidden sm:flex'>Workflow</span></span></NavItem>
          <NavItem collapsed={isCollapsed} to="/manage" ><TableCellsIcon className='flex-none w-5 h-5'/><span className='flex space-x-1.5'><span>Manage</span><span className='hidden sm:flex'> Workflows</span></span></NavItem>
          {!user?.email && 
            <NavItem collapsed={isCollapsed} to="/login" ><UserIcon className='flex-none w-5 h-5'/><span>Login</span></NavItem>
          }
          {user?.email && 
          <NavItem collapsed={isCollapsed} to="/logout" ><UserIcon className='flex-none w-5 h-5'/><span>Logout</span></NavItem>
          // <NavItem collapsed={isCollapsed}>
          //   <button onClick={()=>logOut} ><UserIcon className='flex-none w-5 h-5'/><span>Logout</span></button>
          // </NavItem>
          }
        </ul>
        <button onClick={()=> setIsCollapsed((prev)=> !prev)} className='absolute hidden p-1 border rounded-md sm:flex text-slate-200 slate-400 w-7 h-7 -right-11 top-3 hover:animate-bounce-once border-slate-600'><ArrowsRightLeftIcon/></button>
      </nav>
    </div> 
  );
}
 
export default Navbar;