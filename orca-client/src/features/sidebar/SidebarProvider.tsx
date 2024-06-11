import { FC, ReactNode, useState } from "react"
import SidebarContext from "./SidebarContext"

const SidebarProvider: FC<{ children: ReactNode
}> = ({ children }) => {

  const initialSetting = localStorage.collapseSidebar ?? false;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialSetting);
  const toggleSidebar = () => {
    setIsCollapsed((prev)=>!prev);
  } 

  return <SidebarContext.Provider value={{isCollapsed: isCollapsed, toggleSidebar: toggleSidebar}} >{children}</SidebarContext.Provider>
}

export default SidebarProvider