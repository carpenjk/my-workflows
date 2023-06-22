import NavItem from '../UI/NavItem';
import {HomeIcon, SquaresPlusIcon, TableCellsIcon, UserIcon} from '@heroicons/react/24/outline'
const Sidebar = () => {
  return (
    <div className='w-full'>
      <ul className="w-full space-y-4 ">
        <NavItem to="/"><HomeIcon className=' flex-none w-5 h-5'/><span>Dashboard</span></NavItem>
        <NavItem to="/workflows"><SquaresPlusIcon className='flex-none w-5 h-5'/><span>Create Workflow</span></NavItem>
        <NavItem to="/manage"><TableCellsIcon className='flex-none w-5 h-5'/><span>Manage Workflows</span></NavItem>
        <NavItem to="/login"><UserIcon className='flex-none w-5 h-5'/><span>Login</span></NavItem>
      </ul>
    </div> 
  );
}
 
export default Sidebar;