import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for employee profile
 */
const employeeData = JSON.parse(localStorage.getItem("employee"));
const initialState = {
  profile: employeeData,        // Full employee object
  loading: false,       // Useful if you add async later
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    /**
     * Set employee profile (after login or refresh)
     * payload should be full employee object
     */
    setEmployeeProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
     localStorage.setItem("employee", JSON.stringify(action.payload));
    },

    /**
     * Clear employee data (on logout)
     */
    clearEmployeeProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      // localStorage.removeItem("employee");
    },

    /**
     * Optional helpers for future
     */
    setEmployeeLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setEmployeeError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setEmployeeProfile,
  clearEmployeeProfile,
  setEmployeeLoading,
  setEmployeeError,
} = employeeSlice.actions;

export default employeeSlice.reducer;
