import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import ModalSlice from "./features/ModalSlice";
import userSlice from "./features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  theme: themeReducer,
  modal: ModalSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["theme"], // зөвхөн theme state-г хадгална
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // 🟢 Эдгээрийг нэмсэн
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
