import React, { useState, useEffect } from 'react';
import { Box, Fab, Button, IconButton, AppBar, Toolbar } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';

export default function Navigation() {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const moveSprite = (x, y) => {
    setSpritePosition({ x, y });
  };

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

      <Box
        sx={{
          position: 'absolute',
          top: `${spritePosition.y}%`,
          left: `${spritePosition.x}%`,
          width: '30px',
          height: '30px',
          backgroundColor: 'red',
          borderRadius: '50%',
          transition: 'top 0.5s, left 0.5s',
        }}
      />
    </AppBar>
  );
}
