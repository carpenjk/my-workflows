import { Header } from "features/ui/header";
import { Navbar } from 'features/ui/navbar';
import { Outlet } from "react-router-dom";
import Logo from "../shared/Logo";


const Layout = () => {
  return ( 
    <>
    <div className="relative flex w-full h-screen max-w-screen-2xl">
      <div className="z-50 h-full w-fit">
        <Header className="fixed top-0 left-0 z-50 w-full h-24 pl-8 pr-6 max-w-screen-2xl" logo={<Logo/>}></Header>
        <aside className="z-40">
          <Navbar className="sm:pt-28"/>
        </aside>
      </div>
      <main className="z-40 flex items-center justify-center flex-1" >
        <Outlet/>
      </main>
    </div> 
  </>
  );
}

export default Layout; 