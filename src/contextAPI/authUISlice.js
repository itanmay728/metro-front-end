import { createSlice } from "@reduxjs/toolkit";

const authUISlice = createSlice({
  name: "authUI",
  initialState: {
    currentForm: "register", // default view
  },
  reducers: {
    showLoginForm: (state) => {
      state.currentForm = "login";
    },
    showRegisterForm: (state) => {
      state.currentForm = "register";
    },
  },
});

export const { showLoginForm, showRegisterForm } = authUISlice.actions;
export default authUISlice.reducer;
