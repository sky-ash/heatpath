// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@fontsource/roboto';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);