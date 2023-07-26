import { twMerge } from "tailwind-merge"

interface Props {
  children: React.ReactNode,
  className?: string,
}
const NavText = ({children, className}: Props) => {
  return ( 
    <span className={twMerge("", className)}>{children}</span>
   );
}
 
export default NavText;