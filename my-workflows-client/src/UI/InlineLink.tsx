import { NavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode
}

const InlineLink = ({children}: Props) => {
  return ( 
    <NavLink 
      to='/register'
      className="text-sm underline transition-colors duration-500 text-teal-300/90 underline-offset-4 decoration-transparent hover:text-teal-500 hover:decoration-teal-500 hover:underline"
      type="button"
    >
      {children}
    </NavLink>
   );
}
 
export default InlineLink;