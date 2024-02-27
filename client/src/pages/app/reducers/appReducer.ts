import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/general";

export type AppState = {
  user: User | null;
};

const initialState: AppState = {
  user: null,
};

const appReducer = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User }) => {
      state.user = payload;
    },
  },
});

export default appReducer.reducer;

export const { setUser } = appReducer.actions;
