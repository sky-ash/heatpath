// src/App.js

// Import the necessary components
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import Start from './pages/Start';
import Path from './pages/Path';
import Lecture from './pages/Lecture';

// Navigation Footer Component
function NavigationFooter() {
  const location = useLocation();
  if (location.pathname === '/') {
    return null; // Do not render the footer on the home page
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bgcolor="background.paper"
      p={2}
      display="flex"
      justifyContent="space-around"
      boxShadow={3}
    >
      <Button variant="contained" color="primary" href="/">
        Home
      </Button>
      <Button variant="contained" color="primary" href="/path">
        Path
      </Button>
    </Box>
  );
}

// The main App component
export default function App() {
  return (
    <Router>
      <Container maxWidth="md" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/path" element={<Path />} />
          <Route path="/lecture/:id" element={<Lecture />} />
        </Routes>
      </Container>
      <NavigationFooter />
    </Router>
  );
}