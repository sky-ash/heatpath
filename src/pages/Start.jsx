// src/pages/Start.js

import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle the "Get Started" button click
  const handleGetStarted = () => {
    navigate('/path');
  };

  return (
    <>
      {/* Container for the welcome message */}
      <Box>
        <Typography variant="h2" gutterBottom mt={8} mb={8}>
          Welcome to Heat Path
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Learn about the health risks of climate change through interactive lectures and quizzes.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          THIS IS A PROTOTYPE, CURRENTLY IN DEVELOPMENT!
        </Typography>
      </Box>

      {/* insert the image from path "heatpath/public/imgs/logo.png" here, centered */}
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <img src="public/imgs/logo.png" alt="Heat Path Logo" style={{ maxWidth: '50%', height: 'auto' }} />
      </Box>
      
      {/* Container for the "Start" button */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetStarted}
          sx={{ width: '80%', maxWidth: '220px', height: '50px', fontWeight: 'bold', fontSize: '18px' }}
        >
          Start
        </Button>
      </Box>
    </>
  );
}