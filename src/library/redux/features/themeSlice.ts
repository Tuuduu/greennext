import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark"); // 🟢 Theme-г анх ачаалахад тохируулна
    return savedTheme;
  }
  return "light"; // SSR үед анхдагч утга
};

const initialState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (typeof window !== "undefined") {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        state.theme = newTheme;

        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.remove("dark"); // 🔥 Алдааг засах: `toggle` биш, `remove`
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        }
      }
    },
    setTheme: (state, action) => {
      if (typeof window !== "undefined") {
        state.theme = action.payload;

        localStorage.setItem("theme", action.payload);
        document.documentElement.classList.remove("dark"); // 🔥 Алдааг засах: `toggle` биш, `remove`
        if (action.payload === "dark") {
          document.documentElement.classList.add("dark");
        }
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
