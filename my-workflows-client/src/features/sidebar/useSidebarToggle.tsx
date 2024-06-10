import { useContext } from "react";
import SidebarContext from "./SidebarContext";

const useSidebarToggle = () => {
  const sidebarContext = useContext(SidebarContext);
  return ( sidebarContext );
}
 
export default useSidebarToggle;