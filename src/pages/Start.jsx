// src/pages/Start.js

import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Grid from '@mui/material/Grid2';

export default function Start() {
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle the "Get Started" button click
  const handleGetStarted = () => {
    navigate('/path');
  };

  return (
    <>
      <Typography mt={8} variant="h2">
        Welcome to Heat Path
      </Typography>

      <Typography my={4} variant="subtitle1">
        Learn about the health risks of climate change through interactive lectures and quizzes.
      </Typography>

      <Box mb={12}
           sx={{ height: '100%',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
           }}>
        <img src={`${import.meta.env.BASE_URL}imgs/logo.png`} alt="Heat Path Logo" style={{ maxWidth: '50%', height: 'auto' }} />
      </Box>

      <Navigation />
    </>
  );
}