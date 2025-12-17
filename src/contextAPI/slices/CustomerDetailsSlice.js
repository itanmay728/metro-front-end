import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for employee profile
 */
const customerData = JSON.parse(localStorage.getItem("customer"));
const initialState = {
  profile: customerData,        // Full employee object
  loading: false,       // Useful if you add async later
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    /**
     * Set employee profile (after login or refresh)
     * payload should be full employee object
     */
    setCustomerProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
     localStorage.setItem("customer", JSON.stringify(action.payload));
    },

    /**
     * Clear employee data (on logout)
     */
    clearCustomerProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      // localStorage.removeItem("employee");
    },

    /**
     * Optional helpers for future
     */
    setCustomerLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setCustomerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCustomerProfile,
  clearCustomerProfile,
  setCustomerLoading,
  setCustomerError,
} = customerSlice.actions;

export default customerSlice.reducer;
