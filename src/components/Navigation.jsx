import React from 'react';
import { Box, Fab, IconButton, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';

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
