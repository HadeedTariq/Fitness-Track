import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../pages/auth/reducers/authReducer";
import appReducer, { AppState } from "../pages/app/reducers/appReducer";

export type TStore = {
  authReducer: AuthState;
  appReducer: AppState;
};
export const store = configureStore({
  reducer: {
    authReducer,
    appReducer,
  },
});
