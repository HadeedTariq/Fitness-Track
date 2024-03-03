import { Schema, model } from "mongoose";
// ! how can I check that the user exercises today or not?
// TODO: We can check that the user exercise today or not by getting the last element added if last element created date is equal to today date that means that the user exercises today but if not that means user not exercises today

const dailyExerciseSchema = new Schema(
  {
    exerciseTimeInMinutes: {
      type: Number,
      required: true,
    },
    exerciseTimeInSeconds: {
      type: Number,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    exerciseName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const DailyExercise = model("DailyExercise", dailyExerciseSchema);
