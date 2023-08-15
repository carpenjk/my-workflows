import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props extends React.ComponentPropsWithoutRef<"a">{
  children: React.ReactNode,
  to: string
}

const InlineLink = ({children, to,className, ...compProps}: Props) => {
  return ( 
    <NavLink 
      to={to}
      className={twMerge(` font-roboto text-sm font-bold underline transition-colors duration-500 text-link-700 
        hover:text-link-700/80 dark:text-link-300/90 underline-offset-4 decoration-transparent 
        dark:hover:text-link-300 hover:decoration-link-500 hover:underline`, className)}
      {...compProps}
    >
      {children}
    </NavLink>
   );
}
 
export default InlineLink;