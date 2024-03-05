import { Schema, model } from "mongoose";

const dietSchema = new Schema(
  {
    totalMeals: {
      type: Number,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    mealProperties: {
      type: [{ mealName: String, mealTime: String, calories: Number }],
      required: true,
    },
  },
  { timestamps: true }
);

export const Diet = model("Diet", dietSchema);
