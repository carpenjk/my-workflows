import Logo from "../UI/Logo";
import Header from "./Header";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";


const Layout = () => {
  return ( 
    <>
    <div className="flex w-full h-screen max-w-screen-2xl">
      <div className="h-full w-fit">
        <Header className="fixed top-0 left-0 w-full h-24 pl-8 pr-6 max-w-screen-2xl" logo={<Logo/>}></Header>
        <aside >
          <Navbar className="pt-28"/>
        </aside>
      </div>
      <main className="flex items-center justify-center flex-1 px-4 sm:px-16 " >
        <Outlet/>
      </main>
    </div> 
  </>
  );
}

export default Layout; 