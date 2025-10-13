import { configureStore } from "@reduxjs/toolkit";
import authUIReducer from "./authUISlice";

export const store = configureStore({
  reducer: {
    authUI: authUIReducer,
  },
});
