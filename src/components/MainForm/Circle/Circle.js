import React from "react";

import "./Circle.css";

const Circle = (props) => {
  const radius = 20; //precnik
  const stroke = 1.5;
  const normalizedRadius = radius - stroke * 2; //normalizovani precnik bez debljine ivica
  const circumference = normalizedRadius * 2 * Math.PI; //obim kruga

  let checkmarkSvg, checkmarkSvgCircle, myText, checkmarkSvgCheck;
  if (props.valid) {
    checkmarkSvg = "CheckmarkSvg";
    checkmarkSvgCircle = "CheckmarkSvg__circle";
    myText = "myText";
    checkmarkSvgCheck = "CheckmarkSvg__check";
  }

  return (
    <svg
      className={checkmarkSvg}
      xmlns="http://www.w3.org/2000/svg"
      height={radius * 2}
      width={radius * 2}
      preserveAspectRatio="none"
    >
      <defs>
        {/* filter za pravljenje senke */}
        <filter
          id="dropshadow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="-1" dy="0.2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        className={checkmarkSvgCircle}
        filter="url(#dropshadow)"
        stroke="#2296F3"
        fill="white"
        overflow="hidden"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      ></circle>
      <text
        className={myText}
        x="50%"
        y="50%"
        strokeWidth={0.5}
        dominantBaseline="middle"
        alignmentBaseline="middle"
        textAnchor="middle"
        fill="#2296F3"
        display="block"
      >
        {props.text}
      </text>
      <path
        className={checkmarkSvgCheck}
        fill="none"
        d="m11.1 19.2 l4.1 6.2 14-14"
        dominantBaseline="middle"
        alignmentBaseline="middle"
      />
    </svg>
  );
};

export default Circle;
