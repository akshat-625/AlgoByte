import React from "react";

interface LogoProps {
  size?: number; // size in pixels
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 120, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-[30%] shadow-lg ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #06B6D4 100%)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
      >
        <path
          d="M35 30 L15 50 L35 70"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 30 L40 70"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M65 30 L85 50 L65 70"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Logo;
