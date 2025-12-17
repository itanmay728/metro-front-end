import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for employee profile
 */
const cardData = JSON.parse(localStorage.getItem("card"));
const initialState = {
  profile: cardData,        // Full employee object
  loading: false,       // Useful if you add async later
  error: null,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    /**
     * Set employee profile (after login or refresh)
     * payload should be full employee object
     */
    setCardData: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
     localStorage.setItem("card", JSON.stringify(action.payload));
    },

    /**
     * Clear employee data (on logout)
     */
    clearCardData: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      // localStorage.removeItem("employee");
    },

    /**
     * Optional helpers for future
     */
    setCardDataLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setCardDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCardData,
  clearCardData,
  setCardDataLoading,
  setCardDataError,
} = cardSlice.actions;

export default cardSlice.reducer;
