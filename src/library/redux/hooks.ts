import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

// 🔹 `useDispatch`-ийг зөвшөөрөгдсөн төрлөөр тодорхойлох
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 🔹 `useSelector`-ийг зөвшөөрөгдсөн төрлөөр тодорхойлох
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 🔹 `useStore`-ийг зөвшөөрөгдсөн төрлөөр тодорхойлох
export const useAppStore = () => useStore<AppStore>();
