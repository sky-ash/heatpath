// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';

import Start from './pages/Start';
import Path from './pages/Path';
import Lecture from './pages/Lecture';
import Settings from './pages/Settings';
import Sources from './pages/Sources';

import Navigation from './components/Navigation';

import { lightTheme, darkTheme } from './theme';

export default function App() {
  // State to manage dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  // useEffect to save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container className="container" 
               maxWidth="sm"
               height="100vh"
               sx={{ textAlign: 'center',
                     alignItems: 'center',
               }}>
      <Router basename="/heatpath">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/path" element={<Path />} />
          <Route path="/lecture/:id" element={<Lecture />} />
          <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/sources" element={<Sources />} />
        </Routes>  
      </Router>
      </Container>
    </ThemeProvider>
  );
}