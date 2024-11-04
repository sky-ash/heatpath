// src/pages/Settings.jsx

import React from 'react';

// Material-UI components
import { Typography, Switch, Button, Box, Fab, Link } from '@mui/material';
import Navigation from '../components/Navigation';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

// Settings component
export default function Settings({ darkMode, setDarkMode }) {
  // Function to handle deletion of cached data
  const handleDeleteCachedData = () => {
    localStorage.clear();
    alert('Cached data deleted');
  };
  const navigate = useNavigate(); 

  return (
    <>
      <Typography variant="h3" gutterBottom mt={8} mb={8}>
        Settings
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" component="p" style={{ marginRight: '1rem' }}>
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
      </Box>

      {/* Button to delete cached data */}
      <Button variant="contained" color="secondary" onClick={handleDeleteCachedData}>
        Delete Cached Data
      </Button>
      <Navigation />
      <Fab color="primary"
           onClick={() => navigate('/sources')}
           sx={{ position: 'fixed', zIndex: 'tooltip',
                 left: '50%', transform: 'translateX(-50%)',
                 bottom: 32, }}>
        <InfoIcon />
      </Fab>
    </>
  );
}