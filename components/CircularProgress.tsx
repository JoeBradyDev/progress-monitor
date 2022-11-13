import { format } from "date-fns";
import { FC, useEffect, useState } from "react";

interface ICircularProgress {
  color: string;
  endText: string;
  hoverText?: string;
  percentage: number;
  showTime?: boolean;
  size: number;
  startText: string;
  strokeWidth: number;
}

const CircularProgress: FC<ICircularProgress> = ({
  color,
  endText,
  hoverText: initialHoverText,
  percentage,
  showTime = false,
  size,
  startText,
  strokeWidth,
}) => {
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  const mainText = showTime
    ? format(new Date(), "h:mm aaa")
    : `${Math.round(percentage)}%`;

  const hoverText = showTime ? `${Math.round(percentage)}%` : initialHoverText;

  const displayText =
    hovering && (showTime || initialHoverText) ? hoverText : mainText;

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`${hovering ? "opacity-80" : "opacity-100"}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        fill="none"
        r={radius}
        stroke="#ccc"
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        fill="none"
        r={radius}
        stroke={color}
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        style={{ transition: "all 0.5s" }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        dy="28px"
        fill="grey"
        fontSize="20px"
        x="50%"
        y="18%"
        textAnchor="middle"
      >
        {startText}
      </text>
      <text
        dy={showTime && !hovering ? "15px" : "20px"}
        fill="black"
        fontSize={showTime && !hovering ? "28px" : "40px"}
        textAnchor="middle"
        x="50%"
        y="48%"
      >
        {displayText}
      </text>
      <text
        dy="23px"
        fill="grey"
        fontSize="20px"
        textAnchor="middle"
        x="50%"
        y="64%"
      >
        {endText}
      </text>
    </svg>
  );
};

export default CircularProgress;
