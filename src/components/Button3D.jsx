import React, { useState } from 'react';

const Button3D = ({
  width = 100,
  height = 100,
  buttonTopColor = '#5f309b',
  buttonSidesColor = '#371b5b',
  buttonDepth = 8,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const buttonStyles = {
    container: {
      display: 'inline-block',
      cursor: 'pointer',
      userSelect: 'none',
    },
    svg: {
      transition: 'transform 0.1s ease',
      transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
    },
    buttonSides: {
      fill: buttonSidesColor,
    },
    buttonTop: {
      fill: buttonTopColor,
      transition: 'fill 300ms linear',
    },
  };

  return (
    <div style={buttonStyles.container}>
      <svg
        tabindex="0"
        xmlns="http://www.w3.org/2000/svg"
        //viewBox="0 0 100 100"
        height={height}
        width={width}
        fill="none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={buttonStyles.svg}
      >
        <rect
          height={buttonDepth}
          width="90.62"
          y={isPressed ? 51 + buttonDepth / 2 : 51}
          x="5.04999"
          style={buttonStyles.buttonSides}
        />
        <rect
          height="57"
          width="57"
          transform="matrix(0.866025 -0.5 0.866025 0.5 1 59)"
          rx="8"
          style={buttonStyles.buttonSides}
        />
        <rect
          transform="matrix(0.866025 -0.5 0.866025 0.5 1 51)"
          rx="8"
          height="57"
          width="57"
          style={buttonStyles.buttonTop}
          y={isPressed ? buttonDepth / 2 : 0}
        />
      </svg>
    </div>
  );
};

export default Button3D;