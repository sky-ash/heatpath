// src/App.js

// Import the necessary components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Start from './pages/Start';
import Path from './pages/Path';
import Lecture from './pages/Lecture';
import Navigation from './components/Navigation';

// The main App component
export default function App() {
  return (
    <Router>
      <Container maxWidth="sm" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/path" element={<Path />} />
          <Route path="/lecture/:id" element={<Lecture />} />
        </Routes>
      </Container>
      <Navigation />
    </Router>
  );
}