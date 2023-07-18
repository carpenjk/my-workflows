import { NavLink } from "react-router-dom";

interface Props extends React.ComponentPropsWithoutRef<"a">{
  children: React.ReactNode,
  to: string
}

const InlineLink = ({children, to, ...compProps}: Props) => {
  return ( 
    <NavLink 
      to={to}
      className="text-sm underline transition-colors duration-500 text-teal-300/90 underline-offset-4 decoration-transparent hover:text-teal-500 hover:decoration-teal-500 hover:underline"
      {...compProps}
    >
      {children}
    </NavLink>
   );
}
 
export default InlineLink;