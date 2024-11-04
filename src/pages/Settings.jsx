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
      <Typography variant="h3" my={8}>
        Settings
      </Typography>
      <Box mb={12} px={4}
           sx={{ height: '100%',
                 width: '100%',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'flex-start',
                 alignItems: 'left',
           }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',
                  justifyContent: 'space-between'
      }}>
        <Typography variant="body1">
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Button variant="contained" color="secondary" onClick={handleDeleteCachedData}>
        Delete Cached Data
      </Button>
      </Box>

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