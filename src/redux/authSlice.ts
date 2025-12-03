import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types";

const persisted = localStorage.getItem("auth");
const initialState: AuthState = persisted ? JSON.parse(persisted) : { isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
