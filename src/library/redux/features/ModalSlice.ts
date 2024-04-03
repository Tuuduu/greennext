import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentValue: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.currentValue = state.currentValue === false ? true : false;
    },
  },
});

export const { toggleModal } = ModalSlice.actions;
export default ModalSlice.reducer;
