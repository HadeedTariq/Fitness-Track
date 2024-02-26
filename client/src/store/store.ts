import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../pages/auth/reducers/authReducer";

export type TStore = {
  authReducer: AuthState;
};
export const store = configureStore({
  reducer: {
    authReducer,
  },
});
