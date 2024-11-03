// src/pages/Start.js

import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Start() {
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle the "Get Started" button click
  const handleGetStarted = () => {
    navigate('/path');
  };

  return (
    <>
      <Typography variant="h2" gutterBottom mt={8}>
        Welcome to Heat Path
      </Typography>
      <Typography variant="subtitle1" gutterBottom mt={4}>
        Learn about the health risks of climate change through interactive lectures and quizzes.
      </Typography>

      <Box display="flex" justifyContent="center" mt={12}>
        <img src={`${import.meta.env.BASE_URL}imgs/logo.png`} alt="Heat Path Logo" style={{ maxWidth: '50%', height: 'auto' }} />
      </Box>

      {/*
      <Box mt={8}>
        <Button variant="contained"
                color="primary"
                onClick={handleGetStarted}
                sx={{ width: '80%', 
                      maxWidth: '220px', 
                      height: '50px', 
                      fontWeight: 'bold', 
                      fontSize: '18px'
                   }}>
          Start
        </Button>
      </Box>
      <Box height="150px"/>
      */}
      <Navigation />
    </>
  );
}