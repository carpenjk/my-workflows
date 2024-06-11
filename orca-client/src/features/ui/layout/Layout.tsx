import { Header } from "features/ui/header";
import { Navbar } from 'features/ui/navbar';
import { Outlet } from "react-router-dom";
import Logo from "../shared/Logo";
import {useSidebarToggle} from "features/sidebar";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const {isCollapsed} = useSidebarToggle();
  const padForSidebar = `${isCollapsed ? 'md:pl-32 md:pr-6': 'md:pl-[240px] md:pr-6'}`
  
  return ( 
    <>
        <div className="relative flex w-full h-screen">
          <div className="z-50 h-full w-fit">
            <Header logo={<Logo/>}/>
            <aside  className="z-40">
              <div>
                <Navbar />
              </div>
            </aside>
          </div>
            <main className={`relative z-40 flex items-start justify-center flex-1 w-full h-full max-w-screen-2xl px-2 pt-16 pb-[68px] sm:pb-[76px] ${padForSidebar}`}>
              <div className="relative w-full h-full">
              <Outlet/>
              <ToastContainer
                className="content-centered"
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
              </div>
            </main>
        </div>
    </>
  );
}

export default Layout; 