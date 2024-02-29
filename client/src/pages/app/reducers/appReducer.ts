import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/general";
import { Properties } from "../validators/exerciseValidator";
import { v4 as uuid } from "uuid";

export type AppState = {
  user: User | null;
  dropdown: boolean;
  exerciseProperties: Properties;
};

const initialState: AppState = {
  user: null,
  dropdown: false,
  exerciseProperties: [],
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
  },
});

export default appReducer.reducer;

export const {
  setUser,
  setDropDown,
  setProperties,
  setExercisePropertiesEmpty,
} = appReducer.actions;
