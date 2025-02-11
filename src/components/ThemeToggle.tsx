"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "../library/redux/features/themeSlice";
import { RootState } from "../library/redux/store";
import anime from "animejs";

export default function ThemeToggle() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true); // 🌙 Default утга нь dark
  const toggleRef = useRef<HTMLDivElement>(null); // Ref ашиглах

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedTheme = localStorage.getItem("theme");

      // Theme хадгалагдаагүй бол default-оор "dark" байхаар тохируулах
      if (!savedTheme) {
        savedTheme = "dark";
        localStorage.setItem("theme", "dark");
      }

      dispatch(setTheme(savedTheme));
      setIsDark(savedTheme === "dark");

      // Dark mode-г root дээр тохируулах
      document.documentElement.classList.toggle("dark", savedTheme === "dark");

      setMounted(true);
    }
  }, [dispatch]);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(toggleTheme());
    setIsDark(newTheme === "dark");

    // LocalStorage-т шинэ theme-г хадгалах
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // 🔥 Анимэйшнийг зөвхөн дарахад ажиллуулах
    if (toggleRef.current) {
      anime({
        targets: toggleRef.current,
        translateX: newTheme === "dark" ? 24 : 0,
        easing: "easeOutQuad",
        duration: 300,
      });
    }
  };

  if (!mounted) return null; // SSR зөрчилөөс сэргийлэх

  return (
    <button
      onClick={handleToggle}
      className={`relative w-14 h-8 flex items-center rounded-full transition-all duration-300 
        ${
          isDark ? "bg-gray-800" : "bg-gray-300"
        } shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-600`}
    >
      <span className="absolute left-1 top-1 w-6 h-6 flex items-center justify-center text-xl">
        🌙
      </span>
      <span className="absolute right-1 top-1 w-6 h-6 flex items-center justify-center text-xl">
        ☀️
      </span>

      <div
        ref={toggleRef}
        className="toggle-thumb absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300"
        style={{ transform: `translateX(${isDark ? "24px" : "0px"})` }} // 🎯 Refresh хийхэд зөв байрлалд үлдээнэ
      ></div>
    </button>
  );
}
