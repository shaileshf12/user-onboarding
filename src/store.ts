import { configureStore } from "@reduxjs/toolkit/react";
import authReducer from "./redux/authSlice";
import onboardingReducer from "./redux/onboardingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
