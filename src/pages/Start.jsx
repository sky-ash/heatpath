// src/pages/Start.js

// Import the necessary components
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// The Start component
export default function Start() {
  // useNavigate-hook from React to navigate on Button-Click
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/path'); // Redirect to the Path-Page (Lecture Overview)
  };

  // Render the Start-Page
  return (
    
    // MUI Container Component for Styling
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>

      {/* Heading */}
      <Typography variant="h2" gutterBottom>
        Welcome to Heat Path
      </Typography>

      {/* Subheading */}
      <Typography variant="body1" component="p">
        Learn about the health risks of climate change through interactive lectures and quizzes.
      </Typography>

      {/* Button to "start the App" */}
      <Button variant="contained" color="primary" onClick={handleGetStarted}>
        Get Started
      </Button>
    </Container>
  );
}
