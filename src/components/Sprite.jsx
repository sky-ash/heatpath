import React, { useState } from 'react';
import { Box } from '@mui/material';

export function moveSprite(x, y) {
  setSpritePosition({ x, y });
}

export default function Sprite() {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

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
