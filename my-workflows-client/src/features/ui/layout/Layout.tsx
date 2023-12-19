import { RefObject, memo } from "react";
import { Header } from "features/ui/header";
import { Navbar } from 'features/ui/navbar';
import { Outlet } from "react-router-dom";
import Logo from "../shared/Logo";
import { useEffect, useRef } from "react";
import { screens } from "features/theme/screensExtension";
import useSidebarWidth from "features/sidebar/useSidebarWidth";

type Props = {
  sidebarRef: RefObject<HTMLDivElement>
}

const Layout = memo(({sidebarRef}: Props) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const sidebarWidth = useSidebarWidth();
  
  useEffect(() => {
    if(mainRef.current){
      mainRef.current.style.width= `calc(100% - ${sidebarWidth}px`
      mainRef.current.style.maxWidth = `calc(${screens["2xl"]} - ${sidebarWidth}px)`;
    }
    
  }, [sidebarWidth]);
  return ( 
    <>
        <div className="relative flex w-full h-screen">
          <div className="z-50 h-full w-fit">
            <Header className="fixed top-0 left-0 z-50 w-full h-16 pl-4 pr-6 md:pl-8 md:h-24 max-w-screen-2xl"
              logo={<Logo/>}
            />
            <aside  className="z-40">
              <div ref={sidebarRef}>
                <Navbar />
              </div>
            </aside>
          </div>
            <main ref={mainRef} className="relative z-40 flex items-start justify-center flex-1 w-full h-full p-2 pt-20 md:py-28 md:px-6">
              <Outlet/>
            </main>
        </div>
    </>
  );
})

export default Layout; 