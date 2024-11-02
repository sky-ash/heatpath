import React from 'react';
import { Box, Fab, IconButton, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import InfoIcon from '@mui/icons-material/Info';

export default function Navigation() {
  return (
    <AppBar position="fixed"
            sx={{ top: 'auto', 
                  bottom: 0, 
                  backgroundColor: 'background.paper', 
               }}>
      
      <Link to="/path">
        <Fab color="primary"
             sx={{ position: 'absolute', zIndex: 1,
                   margin: '0 auto', top: -20,
                   left: 0, right: 0, 
                   /*
                   backgroundColor: 'primary.main', // Pbfd8
                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // P1e56
                   borderRadius: '8px' // P1e56
                   */
                 }}>
          <AppsIcon />
        </Fab>
      </Link>

      <Toolbar>
        
        <Link to="/">
          <IconButton color="primary">
            <HomeIcon />
          </IconButton>
        </Link>

        <Box sx={{flexGrow: 1}} />

        <Link to="/settings">
          <IconButton color="primary">
            <SettingsIcon />
          </IconButton>
        </Link>

      </Toolbar>
    </AppBar>
  );
}
