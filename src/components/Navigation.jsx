// src/components/Navigation.jsx

import React from 'react';
import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  if (location.pathname === '/') {
    return null; // Do not render the footer on the home page
  }

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bgcolor="background.paper"
      p={2}
      display="flex"
      justifyContent="space-around"
      boxShadow={3}
    >
      <Button variant="contained" color="primary" href="/">
        Home
      </Button>
      <Button variant="contained" color="primary" href="/path">
        Path
      </Button>
    </Box>
  );
}