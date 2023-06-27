import { HTMLProps, useState } from 'react';
import NavItem from '../UI/NavItem';
import {HomeIcon, SquaresPlusIcon, TableCellsIcon, UserIcon, ArrowsRightLeftIcon} from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: HTMLProps<HTMLElement>["className"];
}

const Sidebar = ({className}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapsedWidth = 'w-12';

  return (
    <div className={twMerge("fixed bottom-0 sm:relative w-screen sm:h-screen sm:pl-4 sm:pr-8 sm:flex sm:flex-col sm:w-auto bg-gradient-to-b from-sky-950/10 via-sky-900/20 to-slate-900", className)}>
      <nav className='relative w-full'>
        <ul className="flex justify-between w-full sm:space-y-6 sm:flex-col ">
          <NavItem collapsed={isCollapsed} collapsedWidth={collapsedWidth} to="/" ><HomeIcon className='flex-none w-5 h-5 '/>{<span>Dashboard</span>}</NavItem>
          <NavItem collapsed={isCollapsed} collapsedWidth={collapsedWidth} to="/workflows" ><SquaresPlusIcon className='flex-none w-5 h-5'/><span className='flex space-x-1.5'><span>Create</span><span className='hidden sm:flex'>Workflow</span></span></NavItem>
          <NavItem collapsed={isCollapsed} collapsedWidth={collapsedWidth} to="/manage" ><TableCellsIcon className='flex-none w-5 h-5'/><span className='flex space-x-1.5'><span>Manage</span><span className='hidden sm:flex'> Workflows</span></span></NavItem>
          <NavItem collapsed={isCollapsed} collapsedWidth={collapsedWidth} to="/login" ><UserIcon className='flex-none w-5 h-5'/><span>Login</span></NavItem>
        </ul>
        <button onClick={()=> setIsCollapsed((prev)=> !prev)} className='absolute hidden p-1 border rounded-md sm:flex text-slate-200 slate-400 w-7 h-7 -right-11 top-3 hover:animate-bounce-once border-slate-600'><ArrowsRightLeftIcon/></button>
      </nav>
    </div> 
  );
}
 
export default Sidebar;