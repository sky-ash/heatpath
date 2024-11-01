import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

export default function Sprite() {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const moveSprite = (x, y) => {
    setSpritePosition({ x, y });
  };

  useEffect(() => {
    // Example of moving the sprite to a new position
    moveSprite(50, 50);
  }, []);

  return (
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
  );
}
