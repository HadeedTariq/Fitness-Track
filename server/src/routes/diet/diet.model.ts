import { Schema, model } from "mongoose";

const dietSchema = new Schema(
  {
    quantity: {
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
    dietTime: {
      enum: ["day", "evening", "dinner"],
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

export const Diet = model("Diet", dietSchema);
