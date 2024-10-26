// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import Start from './pages/Start';
import Path from './pages/Path';
import Lecture from './pages/Lecture';
import Settings from './pages/Settings';
import Navigation from './components/Navigation';
import { lightTheme, darkTheme } from './theme';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router basename="/heatpath">
        <Container maxWidth="sm" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/path" element={<Path />} />
            <Route path="/lecture/:id" element={<Lecture />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </Container>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
}