import React, { useLayoutEffect, useRef } from "react";

import "./ProgressCircle.css";

const ProgressCircle = (props) => {
  const radius = 25; //precnik
  const stroke = 2;
  const normalizedRadius = radius - stroke * 2; //normalizovani precnik bez debljine ivica
  const circumference = normalizedRadius * 2 * Math.PI; //obim kruga
  let progress = props.progress; // progres prosledjen preko props-a na osnovu broja validiranih elemenata

  const textRef = useRef();
  const circleRef = useRef();

  const animateValue = (start, end) => {
    const range = end - start;
    let current = start;
    if (range === 0) {
      return;
    }
    const increment = end > start ? 1 : -1;
    const duration = 500;
    const stepTime = Math.abs(Math.floor(duration / range));
    const counter = () => {
      current += increment;
      textRef.current.innerHTML = `${current}%`;
      circleRef.current.style.strokeDashoffset =
        circumference - (current / 100) * circumference; //  formula za obracun: const strokeDashoffset = circumference - (progress / 100) * circumference;
    };
    counter();

    const timer = setInterval(function () {
      counter();
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  const animateValueRef = useRef(animateValue);
  const progressRef = useRef(progress);

  useLayoutEffect(() => {
    animateValueRef.current(progressRef.current, progress);
  }, [progress]);

  useLayoutEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  let pathChecmarkClass, myTextForHundredClass;
  if (progress === 100) {
    myTextForHundredClass = "MyTextForHundred";
    pathChecmarkClass = "ChecmarkForHundred";
  }

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#9EB7D7"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        ref={circleRef}
        stroke="white"
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference}
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text
        ref={textRef}
        className={myTextForHundredClass}
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
      >
        {progress}%
      </text>
      <path
        className={pathChecmarkClass}
        fill="none"
        d="m14.1 26.2 l6.1 6.2 15-15"
        dominantBaseline="middle"
        alignmentBaseline="middle"
      />
    </svg>
  );
};

export default ProgressCircle;
