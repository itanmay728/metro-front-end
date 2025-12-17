import { createSlice } from "@reduxjs/toolkit";

/**
 * Load auth safely from localStorage
 */
const loadAuthFromStorage = () => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to load auth from storage", err);
    return null;
  }
};

const initialState = {
  user: loadAuthFromStorage(), // { email, token, roles[] } | null
  isAuthenticated: !!loadAuthFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * On successful login
     */
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem("auth", JSON.stringify(action.payload));
      localStorage.setItem("employee", JSON.stringify(action.payload));
      localStorage.setItem("customer", JSON.stringify(action.payload));

    },

    /**
     * On logout
     */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
