import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  return ( themeContext );
}
 
export default useThemeContext;