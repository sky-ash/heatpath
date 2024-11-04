// src/components/Navigation.jsx

import React from 'react';
import { Box, Fab, Button, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Apps } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { Replay, TurnLeft } from '@mui/icons-material';


export default function Navigation() {
  
  const location = useLocation();
  if (location.pathname === '/') {
    return (
        <Link to="/path">
          <Fab color="primary"
               variant='extended'
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <Typography display='flex'
                        p={2}
                        alignItems='center'
                        variant='h6'
                        fontWeight='bold'
                        >
              <NavigationIcon sx={{mr: 1}} />
              START
            </Typography>
          </Fab>
        </Link>
    );
  }
  
  else if (location.pathname === '/path') {
    return (
      <AppBar position="fixed"
              bgcolor="background.paper"
              p={2}
              sx={{ top: 'auto', 
                    bottom: 0, 
                }}>
        
        <Link to="/settings">
          <Fab color="primary"
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <SettingsIcon />
          </Fab>
        </Link>

        <Toolbar>
          <Link to="/" sx={{alignItems: 'flex-start'}}>
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
          </Link>

          <Box sx={{flexGrow: 1}} />

          <Link to="/sources">
            <IconButton
              color="primary"
            >
              <InfoIcon />
            </IconButton>
          </Link>

        </Toolbar>
      </AppBar>
    );
  } else if (location.pathname === '/settings' || location.pathname === '/sources') {
    return (
      <AppBar position="fixed"
              bgcolor="background.paper"
              p={2}
              sx={{ top: 'auto', 
                    bottom: 0, 
                }}>
        
        {/*
        <Link to="/sources">
          <Fab color="primary"
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <InfoIcon />
          </Fab>
        </Link>
        <Link to="/settings">
          <Fab color="primary"
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <SettingsIcon />
          </Fab>
        </Link>
        */}

        <Toolbar>
          <Link to="/" sx={{alignItems: 'flex-start'}}>
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
          </Link>

          <Box sx={{flexGrow: 1}} />

          <Link to="/path">
            <IconButton
              color="primary"
            >
              <TurnLeft />
            </IconButton>
          </Link>

        </Toolbar>
      </AppBar>
    );
  } /*
  else if (location.pathname === '/sources') {
    return (
      <AppBar position="fixed"
              bgcolor="background.paper"
              p={2}
              sx={{ top: 'auto', 
                    bottom: 0, 
                }}>
        
        <Toolbar>
          <Link to="/" sx={{alignItems: 'flex-start'}}>
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
          </Link>

          <Box sx={{flexGrow: 1}} />

          <Link to="/path">
            <IconButton
              color="primary"
            >
              <TurnLeft />
            </IconButton>
          </Link>

        </Toolbar>
      </AppBar>
    );
  } */
  else if (location.pathname.startsWith('/lecture/')) {
    return (
      <AppBar position="fixed"
              bgcolor="background.paper"
              p={2}
              sx={{ top: 'auto', 
                    bottom: 0
                }}>
  
        <Link to="/path">
          <Fab color="primary"
               sx={{ position: 'fixed', zIndex: 'tooltip',
                     left: '50%', transform: 'translateX(-50%)',
                     bottom: 32, }}>
            <NavigationIcon />
          </Fab>
        </Link>

        <Toolbar>
          <Link to="/" sx={{alignItems: 'flex-start'}}>
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
          </Link>
  
          <Box sx={{flexGrow: 1}} />
  
          <Link to="/path" sx={{alignItems: 'flex-end'}}>
            <IconButton color="primary">
              <TurnLeft />
            </IconButton>
          </Link>
  
        </Toolbar>
      </AppBar>
    );
  }
  else {
    return null
  }
  
}