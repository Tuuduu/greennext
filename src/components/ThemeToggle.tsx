"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "../library/redux/features/themeSlice";
import { RootState } from "../library/redux/store";

export default function ThemeToggle() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      dispatch(setTheme(savedTheme));

      // 🔥 Сервер талд биш, зөвхөн клиент талд "dark" классыг тохируулах
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      setMounted(true);
    }
  }, [dispatch]);

  if (!mounted) {
    return null; // SSR зөрчил гарахаас сэргийлэх
  }

  return (
    <button
      onClick={() => {
        dispatch(toggleTheme());
        document.documentElement.classList.toggle("dark", theme === "light");
      }}
      className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all 
      bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none 
      focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-600"
    >
      <span className="flex items-center justify-center text-2xl transition-transform">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
