import { createSlice } from "@reduxjs/toolkit";
import { Exercise, FitnessPlan, User } from "../../../types/general";

export type AppState = {
  user: User | null;
  dropdown: boolean;
  todayExercises: Exercise | null;
  exerciseSchedule: FitnessPlan | null;
};

const initialState: AppState = {
  user: null,
  dropdown: false,
  exerciseSchedule: null,
  todayExercises: null,
};

const appReducer = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User | null }) => {
      state.user = payload;
    },
    setDropDown: (state) => {
      state.dropdown = !state.dropdown;
    },
    setExerciseSchedule: (state, { payload }: { payload: FitnessPlan }) => {
      state.exerciseSchedule = payload;
    },
    setTodayExercise: (state) => {},
  },
});

export default appReducer.reducer;

export const { setUser, setDropDown, setTodayExercise, setExerciseSchedule } =
  appReducer.actions;
