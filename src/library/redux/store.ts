import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";
import ModalSlice from "./features/ModalSlice";
import userSlice from "./features/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      theme: themeSlice,
      modal: ModalSlice,
      user: userSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
