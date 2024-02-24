import { Schema, model } from "mongoose";

const goalsSchema = new Schema(
  {
    goalType: {
      enum: ["weekly", "daily", "monthly"],
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
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

export const Goals = model("Goal", goalsSchema);
