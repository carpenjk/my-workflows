import ThemeSwitch from "features/theme/ThemeSwitch";
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
      <ThemeSwitch/>
    </header>
  );
}
 
export default Header;