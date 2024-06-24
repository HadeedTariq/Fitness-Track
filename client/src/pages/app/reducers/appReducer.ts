import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/general";
import { Properties } from "../validators/exerciseValidator";
import { DietMealValidator } from "../validators/diet.validator";
import { UserProfile } from "../types/appTypes";

export type Theme = "dark" | "light" | "system";

export type AppState = {
  theme: Theme;
  storageKey: string;
  user: User | null;
  dropdown: boolean;
  exerciseProperties: Properties;
  dietProperties: DietMealValidator;
  completedExercises: string[];
  myPosts: UserProfile["myPosts"];
  myOverAllProgress: UserProfile["overAOlProgress"];
};

const completedExercises = JSON.parse(
  localStorage.getItem("completedExercises") as string
);

const initialState: AppState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
  storageKey: "vite-ui-theme",
  user: null,
  dropdown: false,
  exerciseProperties: [],
  completedExercises: completedExercises || [],
  dietProperties: [],
  myPosts: [],
  myOverAllProgress: [],
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
    setProperties: (state, { payload }: { payload: Properties[0] }) => {
      const isPropertyAlreadyExist = state.exerciseProperties.find(
        (property) =>
          property._id === payload._id || property.setName === payload.setName
      );
      if (isPropertyAlreadyExist) {
        const filterProperties = state.exerciseProperties.filter(
          (property) => property._id !== isPropertyAlreadyExist._id
        );
        state.exerciseProperties = [...filterProperties, payload];
        return;
      }
      state.exerciseProperties.push(payload);
    },
    setExercisePropertiesEmpty: (state) => {
      state.exerciseProperties = [];
    },
    setCompletedExercises: (state, { payload }: { payload: string }) => {
      state.completedExercises.push(payload);
      localStorage.setItem(
        "completedExercises",
        JSON.stringify(state.completedExercises)
      );
    },
    setDietProperties: (
      state,
      { payload }: { payload: DietMealValidator[0] & { _id: string } }
    ) => {
      const isPropertyAlreadyExist = state.dietProperties.find(
        (property) =>
          property._id === payload._id || property.mealName === payload.mealName
      );
      if (isPropertyAlreadyExist) {
        const filterProperties = state.dietProperties.filter(
          (property) => property._id !== isPropertyAlreadyExist._id
        );
        state.dietProperties = [...filterProperties, payload];
        return;
      }
      state.dietProperties.push(payload);
    },
    setDietPropertiesEmpty: (state) => {
      state.dietProperties = [];
    },
    setMyPosts: (state, { payload }: { payload: UserProfile["myPosts"] }) => {
      state.myPosts = payload;
    },
    setMyOverAllProgress: (
      state,
      { payload }: { payload: UserProfile["overAOlProgress"] }
    ) => {
      state.myOverAllProgress = payload;
    },
    setTheme: (state, { payload }: { payload: Theme }) => {
      localStorage.setItem(state.storageKey, payload);
      state.theme = payload;
    },
  },
});

export default appReducer.reducer;

export const {
  setUser,
  setDropDown,
  setProperties,
  setExercisePropertiesEmpty,
  setCompletedExercises,
  setDietProperties,
  setDietPropertiesEmpty,
  setMyPosts,
  setMyOverAllProgress,
  setTheme,
} = appReducer.actions;
