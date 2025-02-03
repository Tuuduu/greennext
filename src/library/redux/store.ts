import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import modalReducer from "./features/ModalSlice";
import userReducer from "./features/userSlice";
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

// 🔹 SSR (Server-Side Rendering) үед localStorage ашиглахгүй байх
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

// 🔹 LocalStorage зөвхөн browser орчинд ажиллахыг баталгаажуулах
const isBrowser = typeof window !== "undefined";
const storageType = isBrowser ? storage : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: storageType, // 🔹 Next.js SSR орчинд тохируулав
  version: 1,
  whitelist: ["theme"], // 🔹 Зөвхөн `theme` state-г хадгална
};

// 🔹 Reducer-үүдийг нэгтгэх
const rootReducer = combineReducers({
  theme: themeReducer,
  modal: modalReducer,
  user: userReducer,
});

// 🔹 Persist reducer үүсгэх
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ Persist үйлдлүүдийг зөвшөөрөх
      },
    }),
});

// 🔹 Persistor үүсгэх
export const persistor = persistStore(store);

// 🔹 Төрлийн тодорхойлолтууд
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store; // ✅ `AppStore`-г тодорхойлсон
