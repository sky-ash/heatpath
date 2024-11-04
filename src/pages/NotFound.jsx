import React from 'react';
import { Typography, Box, Fab } from '@mui/material';
import { TurnLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturnToPath = () => {
    navigate('/path');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Fab
        color="primary"
        onClick={handleReturnToPath}
        sx={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <TurnLeft />
      </Fab>
    </Box>
  );
};

export default NotFound;
