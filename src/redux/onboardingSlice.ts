import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Profile, Payment, OnboardingState } from "../types";

const persisted = localStorage.getItem("onboarding");
const initialState: OnboardingState = persisted
  ? JSON.parse(persisted)
  : {
      currentStep: 1,
      completed: false,
      profile: { name: "", age: undefined, email: "", picture: {} },
      songs: [],
      payment: { cardNumber: "", expiry: "", cvv: "" },
    };

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    setSongs(state, action: PayloadAction<string[]>) {
      state.songs = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    setPayment(state, action: PayloadAction<Payment>) {
      state.payment = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    goToStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    complete(state) {
      state.completed = true;
      state.currentStep = 4;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    reset(state) {
      state.currentStep = 1;
      state.completed = false;
      state.profile = { name: "", age: undefined, email: "", picture: {} };
      state.songs = [];
      state.payment = { cardNumber: "", expiry: "", cvv: "" };
      localStorage.removeItem("onboarding");
    },
  },
});

export const { setProfile, setSongs, setPayment, goToStep, complete, reset } = onboardingSlice.actions;
export default onboardingSlice.reducer;
