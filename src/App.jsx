import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';

import Start from './pages/Start';
import Path from './pages/Path';
import Lecture from './pages/Lecture';
import Settings from './pages/Settings';
import Sources from './pages/Sources';
import NotFound from './pages/NotFound';

import Navigation from './components/Navigation';

import { lightTheme, darkTheme } from './theme';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router basename="/heatpath">
        <Container className="container" maxWidth="sm" sx={{ textAlign: 'center', justifyContent: 'flex-start' }}>
          <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/path" element={<Path />} />
              <Route path="/lecture/:id" element={<Lecture />} />
              <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
