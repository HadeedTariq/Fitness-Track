import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: mongoose.Schema.Types.Mixed, required: true },
  rest: { type: Number, required: true },
  description: { type: String, required: true },
  day: { type: String, required: true },
});

const CardioSchema = new mongoose.Schema({
  description: { type: String, required: true },
  type: { type: [String], required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
});

const NutritionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  tips: { type: [String], required: true },
});

const FitnessPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  description: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  exercises: { type: [ExerciseSchema], required: true },
  cardio: { type: CardioSchema, required: true },
  nutrition: { type: NutritionSchema, required: true },
  motivationalAdvice: { type: [String], required: true },
});

const ExercisePlanSchema = new mongoose.Schema({
  fitnessPlan: { type: FitnessPlanSchema, required: true },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const ExercisePlan = mongoose.model("ExercisePlan", ExercisePlanSchema);
