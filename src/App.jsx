// src/App.js

// Import the necessary components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

// Import the components from the pages/ directory
import Start from './pages/Start';
import Path from './pages/Path';
import Lecture from './pages/Lecture';

// The main App component
export default function App() {
  return (

    // React Router for navigation
    <Router>

      {/* MUI Container Component for Styling */}
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>

        <Routes>

          {/* Route for Starting-Page (root) (the Home-Page) */}
          <Route path="/" element={<Start />} />

          {/* Route for the Path-Page (Lecture Overview) */}
          <Route path="/path" element={<Path />} />

          {/* Route for the individual Lecture-Page, consisting of Cards and Quiz */}
          <Route path="/lecture/:id" element={<Lecture />} />
        </Routes>
      </Container>
    </Router>
  );
}
