import Logo from "../UI/Logo";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet} from "react-router-dom";


const Layout = () => {
  return ( 
    <>
    <div className="flex w-full h-screen max-w-screen-2xl">
      <div className="flex-initial h-full pt-2 pl-8 pr-8 w-72 border-slate-400/20 md:border-r">
        <Header className="fixed top-0 left-0 w-full h-24 pl-12 pr-6 max-w-screen-2xl" logo={<Logo/>}></Header>
        <aside className={"mt-24"}>
          <Sidebar/>
        </aside>
      </div>
      <main className="flex items-center justify-center flex-1 px-16 " >
        <Outlet/>
      </main>
    </div> 
  </>
  );
}

export default Layout; 