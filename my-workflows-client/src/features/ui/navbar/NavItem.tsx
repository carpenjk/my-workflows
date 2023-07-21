import NavLink from "./NavLink";

type Props = {
  to: string,
  collapsed: boolean,
  children: React.ReactNode
}
const NavItem = ({to, collapsed, children}: Props) => {
  return ( 
    <li className='w-1/4 sm:w-full'>
      <div className="w-full">
      <NavLink to={to} collapsed={collapsed} >
        <div className='flex flex-col items-center justify-center p-4 sm:flex-row sm:space-x-4 '>
          {children}
        </div>
      </NavLink>
      </div>
    </li>
   );
}
 
export default NavItem;