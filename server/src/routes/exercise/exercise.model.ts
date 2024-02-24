import { Schema, model } from "mongoose";

const exerciseSchema = new Schema(
  {
    sets: {
      type: Number,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    exerciseType: {
      enum: ["lower", "upper"],
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Exercises = model("Exercise", exerciseSchema);
