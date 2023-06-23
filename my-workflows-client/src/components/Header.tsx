import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLDivElement> {
  logo: React.ReactNode
}

const Header = ({logo, className, ...divProps}: Props) => {
  const Logo = logo;

  return ( 
    <header 
      className={twMerge("w-fill mx-auto flex justify-between items-center pl-4"
          , className)}
      {...divProps}>
      <div>{Logo}</div>
      <div><h4>Dark Mode</h4></div>    
    </header>
  );
}
 
export default Header;