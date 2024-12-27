import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  description: { type: String, required: true },
});

const HydrationSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dailyGoal: { type: Number, required: true },
  tips: { type: [String], required: true },
});

const DietPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  description: { type: String, required: true },
  dailyCalories: { type: Number, required: true },
  meals: { type: [MealSchema], required: true },
  hydration: { type: HydrationSchema, required: true },
  motivationalAdvice: { type: [String], required: true },
});

const DietPlanUserSchema = new mongoose.Schema({
  dietPlan: { type: DietPlanSchema, required: true },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const DietPlan = mongoose.model("DietPlan", DietPlanUserSchema);
