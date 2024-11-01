import React from "react";
import "../styles/button.css";

const ButtonContainer = ({
  width = 100,
  height = 100,
  buttonTopColor = "#5f309b",
  buttonTopHoverColor = "#a661ff",
  buttonSidesColor = "#371b5b",
  buttonSidesHoverColor = "#763ac2",
  glowMeOpacity = 0.5,
  glowAllOpacity = 1,
}) => {
  return (
    <div className="button-container">
      <svg
        tabindex="0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
        height={height}
        width={width}
      >
        <rect
          fill={buttonSidesColor}
          height="8"
          width="90.62"
          y="51"
          x="5.04999"
          className="buttonSides"
        ></rect>
        <rect
          fill={buttonSidesColor}
          transform="matrix(0.866025 -0.5 0.866025 0.5 1 59)"
          rx="8"
          height="57"
          width="57"
          className="buttonSides"
        ></rect>
        <g clipPath="url(#clip0_106_11)">
          <rect
            fill={buttonTopColor}
            transform="matrix(0.866025 -0.5 0.866025 0.5 1 51)"
            rx="8"
            height="57"
            width="57"
            className="buttonTop"
          ></rect>
          <g filter="url(#filter0_d_106_11)" className="glowAll"></g>
          <g
            filter="url(#filter1_f_106_11)"
            opacity={glowMeOpacity}
            className="glowMe"
          ></g>
        </g>
      </svg>
      {/*
      <svg
        tabindex="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        height="100"
        width="100"
        fill="none"
      >
        <rect
          fill="#371b5b"
          height="8"
          width="90.62"
          y="51"
          x="5.04999"
          class="buttonSides"
        />
        <rect
          fill="#371b5b"
          height="57"
          width="57"
          class="buttonSides"
          transform="matrix(0.866025 -0.5 0.866025 0.5 1 59)"
          rx="8"
        />
          <rect
            fill="#5f309b"
            transform="matrix(0.866025 -0.5 0.866025 0.5 1 51)"
            rx="8"
            height="57"
            width="57"
            class="buttonTop"
          />
      </svg>
        */}
    </div>
  );
};

export default ButtonContainer;
