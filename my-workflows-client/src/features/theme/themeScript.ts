export function initTheme() {
  var theme = localStorage.getItem('theme') || 'light'
  if (theme === 'dark' || window.matchMedia('prefers-color-scheme: dark').matches) {
    document?.querySelector('body')?.classList.add('dark')
  }
}
