import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types";

type AuthState = {
  isLoggedIn: boolean;
  user?: User;
};

const persisted = localStorage.getItem("auth");
const initialState: AuthState = persisted ? JSON.parse(persisted) : { isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log("Auth Slice Login Action Payload:", action.payload);
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
