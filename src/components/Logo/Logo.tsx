import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="50"
      viewBox="0 0 200 50"
      fill="none"
    >
      <rect width="200" height="50" rx="8" fill="#F0F8F4" />

      <text
        x="50%"
        y="50%"
        fill="#34A853"
        font-size="18"
        font-family="Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        GREEN OFFICE TEST
      </text>

      <path
        d="M160 15 C165 5, 180 5, 185 15 S175 25, 160 15 Z"
        fill="#34A853"
      />
    </svg>
  );
}
