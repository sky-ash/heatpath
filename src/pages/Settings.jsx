// src/pages/Settings.jsx

import React, { useState, useEffect } from 'react';
import { Container, Typography, Switch, Button, Box } from '@mui/material';

export default function Settings({ darkMode, setDarkMode }) {
  const handleDeleteCachedData = () => {
    localStorage.clear();
    alert('Cached data deleted');
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" component="p" style={{ marginRight: '1rem' }}>
          Dark Mode
        </Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="primary"
        />
      </Box>
      <Button variant="contained" color="secondary" onClick={handleDeleteCachedData}>
        Delete Cached Data
      </Button>
    </Container>
  );
}