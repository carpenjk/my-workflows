import { useContext } from "react";
import SidebarContext from "./SidebarContext";

const useSidebarWidth = () => {
  const sidebarContext = useContext(SidebarContext);
  return ( sidebarContext );
}
 
export default useSidebarWidth;