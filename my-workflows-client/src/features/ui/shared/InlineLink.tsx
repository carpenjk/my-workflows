import { NavLink } from "react-router-dom";

interface Props extends React.ComponentPropsWithoutRef<"a">{
  children: React.ReactNode,
  to: string
}

const InlineLink = ({children, to, ...compProps}: Props) => {
  return ( 
    <NavLink 
      to={to}
      className="text-sm text-teal-700 underline transition-colors duration-500 hover:text-teal-700/80 dark:text-teal-300/90 underline-offset-4 decoration-transparent dark:hover:text-teal-300 hover:decoration-teal-500 hover:underline"
      {...compProps}
    >
      {children}
    </NavLink>
   );
}
 
export default InlineLink;