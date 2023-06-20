import Sidebar from "../components/Sidebar";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return ( 
  <div>
    <aside><Sidebar/></aside>
    <main>
      <Outlet/>
    </main>
  </div> );
}
 
export default Layout; 