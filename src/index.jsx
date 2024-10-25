// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from '@mui/material'; // Import Material UI's CSS baseline

// Import Material UI's font (Roboto)
import '@fontsource/roboto';

// Render the main App component inside the root div
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline /> {/* Apply global CSS resets */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
