import { createSlice } from "@reduxjs/toolkit";
import { Exercise, FitnessPlan, User } from "../../../types/general";
import { getDayName } from "@/utils/utils";

export type AppState = {
  user: User | null;
  dropdown: boolean;
  todayExercises: Exercise[];
  exerciseSchedule: FitnessPlan | null;
};

const initialState: AppState = {
  user: null,
  dropdown: false,
  exerciseSchedule: null,
  todayExercises: [],
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
    setTodayExercises(state) {
      const day = getDayName();
      const exercises = Array.isArray(state.exerciseSchedule?.exercises)
        ? state.exerciseSchedule.exercises.filter(
            (exercise) => exercise.day.toLowerCase() === day.toLowerCase()
          )
        : [];
      state.todayExercises = exercises;
    },
  },
});

export default appReducer.reducer;

export const { setUser, setDropDown, setTodayExercises, setExerciseSchedule } =
  appReducer.actions;
