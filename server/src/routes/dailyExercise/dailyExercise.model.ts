import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planDurationWeeks: {
      type: Number,
      required: true,
    },
    progress: [
      {
        week: {
          type: Number,
          required: true,
        },
        totalExercises: {
          type: Number,
          required: true,
        },
        completedExercises: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["green", "yellow", "red"],
          default: "red",
        },
      },
    ],
  },
  { timestamps: true }
);

progressSchema.methods.calculateStatus = function () {
  this.progress.forEach((weekProgress: any) => {
    const completionRate =
      (weekProgress.completedExercises / weekProgress.totalExercises) * 100;

    if (completionRate === 100) {
      weekProgress.status = "green";
    } else if (completionRate >= 50) {
      weekProgress.status = "yellow";
    } else {
      weekProgress.status = "red";
    }
  });
};

export const Progress = mongoose.model("Progress", progressSchema);
