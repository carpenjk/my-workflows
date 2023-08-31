import { FC, ReactNode } from "react"
import SidebarContext from "./SidebarContext"
import useElementWidth from "hooks/useElementWidth"

const SidebarProvider: FC<{ children: ReactNode, sidebarRef: React.RefObject<HTMLElement> }> = ({ children, sidebarRef }) => {
  const elementWidth = useElementWidth(sidebarRef);
  return <SidebarContext.Provider value={elementWidth ?? 0} >{children}</SidebarContext.Provider>
}

export default SidebarProvider