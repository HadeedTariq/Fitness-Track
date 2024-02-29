import { Schema, model } from "mongoose";

const exerciseSchema = new Schema(
  {
    exercises: {
      type: Number,
      required: true,
    },
    setProperties: {
      type: [
        {
          totalReps: Number,
          setName: String,
          eachSetReps: Number,
          totalSets: Number,
        },
      ],
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
    exerciseDay: {
      type: String,
      required: true,
      unique: true,
    },
    exerciseType: {
      enum: ["lower", "upper"],
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Exercises = model("Exercise", exerciseSchema);
