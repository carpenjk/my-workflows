import NavLink from "./NavLink";

type Props = {
  to: string,
  children: React.ReactNode
}
const NavItem = ({to, children}: Props) => {
  return ( 
    <li className='w-full'>
      <NavLink to={to} >
        <div className='flex items-center space-x-4'>
          {children}
        </div>
      </NavLink>
    </li>
   );
}
 
export default NavItem;