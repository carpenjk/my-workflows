import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLDivElement> {
  logo: React.ReactNode
}

const Header = ({logo, className, ...divProps}: Props) => {
  const [isDarkMode, setDarkMode] = useState(true);
  const Logo = logo;
  const handleClick = ()=> {
    setDarkMode((prev) => !prev);
  }

 useEffect(() => {
    if(!isDarkMode){
      document.querySelector('html')?.classList.remove('dark');
      return;
    }
    document.querySelector('html')?.classList.add('dark');
  },[isDarkMode])

  return ( 
    <header 
      className={twMerge("w-fill mx-auto flex justify-between items-center pl-4"
          , className)}
      {...divProps}>
      <div>{Logo}</div>
      <div className="hidden sm:flex">
        <button type="button" onClick={handleClick} className="flex shadow-inner rounded-xl bg-primary-4 dark:bg-primary-3 shadow-sky-500/40">
          <div className={`text-sm transparent w-12 py-1 rounded-xl ${!isDarkMode && ' bg-secondary-3'}`}>light</div>
          <div className={`text-sm transparent w-12 py-1 rounded-xl ${isDarkMode && 'bg-sky-700'}`}>dark</div>
        </button>
      </div>
    </header>
  );
}
 
export default Header;