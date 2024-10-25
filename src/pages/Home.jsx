// src/pages/Home.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/path'); // Redirect to the learning path
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Heat Path
      </Typography>
      <Typography variant="body1" paragraph>
        Learn about the health risks of climate change through interactive lectures and quizzes.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGetStarted}>
        Get Started
      </Button>
    </Container>
  );
}
