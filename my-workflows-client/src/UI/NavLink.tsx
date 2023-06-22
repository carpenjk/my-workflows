import {NavLink} from 'react-router-dom';
type Props = {
  to: string,
  children: React.ReactNode
}

const CustomNavLink = ({to, children}: Props) => {
  
  return ( 
    <NavLink 
    className={({isActive}) => "flex w-full text-sm  text-gray-100 p-4 rounded-md" + (isActive ? " bg-slate-700" : "") }
    to={to} 
    >
      {children}
    </NavLink>
   );
}
 
export default CustomNavLink;