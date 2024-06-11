import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from 'features/theme/ThemeProvider';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import { initTheme } from 'features/theme/themeScript';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

initTheme();
root.render(
  <React.StrictMode>
      <ThemeProvider>
      <Provider store={store}>
            <App/>
      </Provider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
