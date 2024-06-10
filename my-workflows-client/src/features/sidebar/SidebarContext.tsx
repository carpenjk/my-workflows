import { createContext } from 'react'

const defaultValue = {isCollapsed: false, toggleSidebar:()=>{} };

const SidebarContext = createContext(defaultValue)

export default SidebarContext