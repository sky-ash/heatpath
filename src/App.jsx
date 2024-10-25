// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

// Import the components for each page
import Home from './pages/Home';
import Path from './pages/Path';
import Lecture from './pages/Lecture';
import Quiz from './pages/Quiz';

// The main App component
export default function App() {
  return (
    <Router>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/path" element={<Path />} />
          <Route path="/lecture/:id" element={<Lecture />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </Container>
    </Router>
  );
}
