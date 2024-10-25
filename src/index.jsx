// src/index.js

// Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import { CssBaseline } from '@mui/material';
import '@fontsource/roboto';


// Render the app
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);