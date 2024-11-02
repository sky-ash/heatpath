import React from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

export default function InfoButton() {
  return (
  <Link to="/sources">
<IconButton
      color='primary'
       sx={{ position: 'absolute', zIndex: 1,
             top: 16,
             right: 16, 
             /*
             backgroundColor: 'primary.main', // Pbfd8
             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // P1e56
             borderRadius: '8px' // P1e56
             */
           }}>
    <InfoIcon />
  </IconButton>
</Link>
  );
}