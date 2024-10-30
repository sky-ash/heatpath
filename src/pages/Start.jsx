// src/pages/Start.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/path');
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h2" gutterBottom>
        Welcome to Heat Path
      </Typography>
      <Typography variant="body1" component="p">
        Learn about the health risks of climate change through interactive lectures and quizzes.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleGetStarted} 
        sx={{ position: 'absolute',
          zIndex: 1,
          bottom: 20,
          left: 0,
          right: 0,
          margin: '0 auto'}}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}