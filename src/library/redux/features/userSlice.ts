import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
