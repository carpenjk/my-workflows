import Logo from "../UI/Logo";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet} from "react-router-dom";


const Layout = () => {
  return ( 
    <>
    <div className="flex h-screen pt-4">
      <aside className={"h-full flex-initial w-72 pt-2 pr-8 pl-8  border-slate-400/20 md:border-r"}>
      <Header className="fixed w-screen h-24 md:w-full " logo={<Logo/>}></Header>
        <Sidebar/>
      </aside>
      <main className="flex items-center justify-center flex-1 px-32 " >
        <Outlet/>
      </main>
    </div> 
  </>
  );
}
 
export default Layout; 