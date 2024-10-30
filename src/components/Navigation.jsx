// src/components/Navigation.jsx

import React from 'react';
import { Box, Fab, Button, IconButton, AppBar, Toolbar } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';

export default function Navigation() {
  
  /*
  const location = useLocation();
  if (location.pathname === '/') {
    return null; // Do not render the footer on the home page
  }
  */

  /*
  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });
  */
  
  return (
    <AppBar position="fixed"
            bgcolor="background.paper"
            p={2}
            sx={{ top: 'auto', 
                  bottom: 0, 
               }}>
      
      <Link to="/path">
        <Fab color="primary"
             sx={{ position: 'absolute', zIndex: 1,
                   margin: '0 auto', top: -20,
                   left: 0, right: 0, }}>
          <AppsIcon />
        </Fab>
      </Link>

      <Toolbar>
        
        <Link to="/" sx={{alignItems: 'flex-start'}}>
          <IconButton color="primary">
            <HomeIcon />
          </IconButton>
        </Link>

        <Box sx={{flexGrow: 1}} />

        <Link to="/settings" sx={{alignItems: 'flex-end'}}>
          <IconButton color="primary">
            <SettingsIcon />
          </IconButton>
        </Link>

      </Toolbar>

    </AppBar>
  );
}