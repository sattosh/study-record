import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { NotificationErrorBoundary, NotificationHandler } from './components/layout';
import './index.css';
import { store } from './redux';
import { defaultTheme } from './theme/theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <BrowserRouter>
          <NotificationHandler />
          <NotificationErrorBoundary>
            <App />
          </NotificationErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
