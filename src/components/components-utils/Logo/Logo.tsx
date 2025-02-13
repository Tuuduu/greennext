"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function Logo() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Долгион үүсгэх анимаци
      anime({
        targets: ".wave-letter",
        translateY: [
          { value: -10, duration: 600 },
          { value: 0, duration: 500 },
        ],
        delay: anime.stagger(100, { start: 0 }), // Үсгүүдийн хоорондох саатал
        easing: "easeInOutSine",
        loop: false,
      });
    }
  }, []);

  const text = "GREEN OFFICE";

  return (
    <div className="flex flex-col items-center mb-4 text-green-700 font-bold text-2xl">
      {/* <div ref={textRef}>
        {text.split("").map((char, index) => (
          <span key={index} className="wave-letter inline-block text-lg">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div> */}
      GREEN OFFICE
    </div>
  );
}
