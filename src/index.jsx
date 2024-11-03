// src/index.js

// Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import { CssBaseline } from '@mui/material';
import '@fontsource/roboto';

import './styles/global.css'; // Import the global CSS file

// Get the root container element
const container = document.getElementById('root');

// Create a root for React
const root = createRoot(container);

// Render the app within the root element
root.render(
  <React.StrictMode>
    {/* CssBaseline to provide a consistent baseline for styles */}
    <CssBaseline />
    {/* Main App component */}
    <App />
  </React.StrictMode>
);