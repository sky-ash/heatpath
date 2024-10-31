// src/pages/Start.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Start() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/path');
  };

  return (
    <Container className="container"
               sx={{ textAlign: 'center',
                     justifyContent: 'space-evenly', // 'space-between', 'space-around'
                  }}>
      
      <Box>
        <Typography variant="h2" 
                    gutterBottom>
          Welcome to Heat Path
        </Typography>
        <Typography variant="subtitle1"
                    gutterBottom>
          Learn about the health risks of climate change through interactive lectures and quizzes.
        </Typography>
      </Box>

      <Box>
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

      <Navigation />
    </Container>
  );
}