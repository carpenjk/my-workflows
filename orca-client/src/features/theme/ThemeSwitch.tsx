import useThemeContext from "./UseThemeContext";

const ThemeSwitch = () => {
  const theme = useThemeContext();
  const handleClick = ()=> {
    theme.changeCurrentTheme();
  }

  const isDarkMode = theme.currentTheme === 'dark';
  return ( 
    <>
      <div className="hidden sm:flex">
        <button type="button" onClick={handleClick} className="flex shadow-inner rounded-xl bg-primary-4 dark:bg-primary-3 shadow-secondary-5/40">
          <div className={`text-sm transparent w-12 py-1 rounded-xl ${!isDarkMode && ' bg-secondary-3'}`}>light</div>
          <div className={`text-sm transparent w-12 py-1 rounded-xl ${isDarkMode && 'bg-secondary-3'}`}>dark</div>
          </button>
        </div>
    </> 
  );
}
 
export default ThemeSwitch;