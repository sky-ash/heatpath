import React from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';

export default function InfoButton() {
  return (
    // Link to the sources page
    <Link to="/sources">
      <IconButton
        color="primary"
        sx={{ position: 'absolute', zIndex: 1, top: 16, right: 16 }}
      >
        <InfoIcon />
      </IconButton>
    </Link>
  );
}