import { useState, useEffect, FC, ReactNode } from 'react'
import ThemeContext from './ThemeContext'

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const initialTheme = localStorage.theme ?? (window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light');
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  const changeCurrentTheme = (newTheme?: 'light' | 'dark') => {
    if(!newTheme){
      setTheme((prev) => prev === 'light' ? 'dark' : 'light');
      return;
    }
    setTheme(newTheme);
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') document.body.classList.remove('dark')
    else document.body.classList.add('dark')
  }, [theme])

  return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider