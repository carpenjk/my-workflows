import ThemeSwitch from "features/theme/ThemeSwitch";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLDivElement> {
  logo: React.ReactNode
}

const Header = ({logo, className, ...divProps}: Props) => {
  const Logo = logo;

  return ( 
    <header 
      className={twMerge("w-fill mx-auto flex justify-between items-center pl-6  pr-6 fixed top-0 left-0 z-50 w-full h-14 md:h-16 max-w-screen-2xl"
          , className)}
      {...divProps}>
      <div>{Logo}</div>
      <ThemeSwitch/>
    </header>
  );
}
 
export default Header;