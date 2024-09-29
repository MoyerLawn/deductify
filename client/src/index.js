import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './index.css'; // Ensure you have global styles if needed

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);