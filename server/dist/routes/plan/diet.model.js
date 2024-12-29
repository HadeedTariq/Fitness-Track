"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietPlan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MealSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    description: { type: String, required: true },
});
const HydrationSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    dailyGoal: { type: Number, required: true },
    tips: { type: [String], required: true },
});
const DietPlanSchema = new mongoose_1.default.Schema({
    planName: { type: String, required: true },
    description: { type: String, required: true },
    dailyCalories: { type: Number, required: true },
    meals: { type: [MealSchema], required: true },
    hydration: { type: HydrationSchema, required: true },
    motivationalAdvice: { type: [String], required: true },
});
const DietPlanUserSchema = new mongoose_1.default.Schema({
    dietPlan: { type: DietPlanSchema, required: true },
    user: {
        ref: "User",
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
});
exports.DietPlan = mongoose_1.default.model("DietPlan", DietPlanUserSchema);
//# sourceMappingURL=diet.model.js.map