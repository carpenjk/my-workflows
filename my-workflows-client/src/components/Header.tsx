import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<HTMLDivElement> {
  logo: React.ReactNode
}

const Header = ({logo, className, ...divProps}: Props) => {
  const Logo = logo;

  return ( 
    <header 
      className={twMerge("w-fill h-24 max-w-7xl mx-auto flex justify-between items-center md:ml-4"
          , className)}
      {...divProps}>
      {/* <div className={twMerge(defaultClasses, className)} {...divProps}> */}
          <div>{Logo}</div>
          {/* {isLoggedIn ? 
            <button className="transition-all duration-300 rounded-md bg-size-200 hover:bg-right-bottom hover:bg-gray-100 hover:bg-gradient-to-r hover:from-slate-400 hover:via-slate-200 hover:to-gray-100">
              <div className="p-2 text-transparent transition-all duration-300 animate-text font-maven text-md bg-clip-text text-grey-200 bg-gradient-to-r from-gray-50 via-slate-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-600 hover:via-slate-600 hover:to-gray-800">
                Logout
              </div>
            </button> 
            : undefined } */}
      {/* </div> */}
    </header>
  );
}
 
export default Header;