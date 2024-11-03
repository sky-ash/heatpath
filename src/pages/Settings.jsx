// src/pages/Settings.jsx

import React from 'react';
import { Typography, Switch, Button, Box } from '@mui/material';

export default function Settings({ darkMode, setDarkMode }) {
  const handleDeleteCachedData = () => {
    localStorage.clear();
    alert('Cached data deleted');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom mt={8}>
        Settings
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" component="p" style={{ marginRight: '1rem' }}>
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
      </Box>

      <Button variant="contained" color="secondary" onClick={handleDeleteCachedData}>
        Delete Cached Data
      </Button>
    </>
  );
}