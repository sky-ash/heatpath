// src/pages/Start.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/path');
  };

  const handleDeleteCachedData = () => {
    localStorage.clear();
    // Optionally, you can also clear cookies if needed
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    alert('Cached data deleted');
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Heat Path
      </Typography>
      <Typography variant="body1" component="p">
        Learn about the health risks of climate change through interactive lectures and quizzes.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleGetStarted} style={{ marginRight: '1rem' }}>
          Get Started
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDeleteCachedData}>
          Delete Cached Data
        </Button>
      </Box>
    </Container>
  );
}