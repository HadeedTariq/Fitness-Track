import { createSlice } from "@reduxjs/toolkit";

import { RegisterValidator } from "../validators/user.validator";

export type AuthState = {
  user: RegisterValidator | null;
};
const initialState: AuthState = {
  user: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: RegisterValidator | null }) => {
      state.user = payload;
    },
  },
});

export default authReducer.reducer;

export const { setUser } = authReducer.actions;
