import { Schema, model } from "mongoose";

const commentsSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    subComments: {
      type: [
        {
          content: String,
          user: {
            ref: "User",
            type: Schema.Types.ObjectId,
            required: true,
          },
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

export const Comment = model("Comments", commentsSchema);
