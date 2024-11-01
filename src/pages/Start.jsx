// src/pages/Start.js

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

import Button3D from '../components/Button3D';
import { darkTheme } from '../theme';

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
      
      <Button3D
        //width={150}
        //height={150}
        buttonTopColor={darkTheme.palette.primary.main}
        buttonSidesColor={darkTheme.palette.primary.dark}
        buttonDepth={1}
      />

      <Box>
        <Typography variant="h2" 
                    gutterBottom>
          Welcome to Heat Path
        </Typography>
        <Typography variant="subtitle1"
                    gutterBottom>
          Learn about the health risks of climate change through interactive lectures and quizzes.
        </Typography>
        <Typography variant="subtitle1"
                    gutterBottom>
          THIS IS AN PROTOTYPE, CURRENTLY IN DEVELOPMENT! 
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