"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const Loading = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      anime({
        targets: textRef.current,
        opacity: [0.3, 1],
        duration: 1000,
        easing: "easeInOutQuad",
        loop: true,
        direction: "alternate",
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
      <p
        ref={textRef}
        className="text-lg font-bold text-gray-700 dark:text-gray-300"
      >
        Уншиж байна...
      </p>
    </div>
  );
};

export default Loading;
