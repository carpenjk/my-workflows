interface Props {
  logo: React.ReactNode
}

const Header = ({logo}: Props) => {
  const isLoggedIn = true;
  const Logo = logo;

  
  return ( 
    <header className="w-fill lg:border-b lg:border-slate-400/20 border-slate-50/[0.06]">
      <div className=" h-24 w-fill max-w-7xl mx-auto flex justify-between items-center pl-4 pr-4 ">
        <div>{Logo}</div>
        {isLoggedIn ? 
          <button className="bg-size-200 duration-300 hover:bg-right-bottom rounded-md hover:bg-gray-100 hover:bg-gradient-to-r hover:from-slate-400 hover:via-slate-200 hover:to-gray-100 transition-all">
            <div className="animate-text duration-300 font-Maven p-2 text-md bg-clip-text text-transparent text-grey-200 bg-gradient-to-r from-gray-50 via-slate-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-600 hover:via-slate-600 hover:to-gray-800 transition-all">
              Logout
            </div>
          </button> 
          : undefined }
      </div>
  </header>
  );
}
 
export default Header;