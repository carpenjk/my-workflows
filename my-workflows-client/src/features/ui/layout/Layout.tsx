import { Header } from "features/ui/header";
import { Navbar } from 'features/ui/navbar';
import { Outlet } from "react-router-dom";
import useElementWidth from "hooks/useElementWidth";
import Logo from "../shared/Logo";
import { useEffect, useRef } from "react";

const Layout = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarWidth = useElementWidth(sidebarRef);

  useEffect(() => {
    if(mainRef.current){
      mainRef.current.style.maxWidth = `calc(100% - ${sidebarWidth}px)`;
    }
    
  }, [sidebarWidth]);
  return ( 
    <>
      <div className="relative flex w-full h-screen">
        <div className="z-50 h-full w-fit">
          <Header className="fixed top-0 left-0 z-50 w-full h-24 pl-8 pr-6 max-w-screen-2xl"
            logo={<Logo/>}
          />
          <aside  className="z-40">
            <div ref={sidebarRef}>
              <Navbar />
            </div>
          </aside>
        </div>
          <main ref={mainRef} className="relative z-40 flex items-center justify-center flex-1 w-full h-full px-6">
            <Outlet/>
          </main>
      </div> 
    </>
  );
}

export default Layout; 