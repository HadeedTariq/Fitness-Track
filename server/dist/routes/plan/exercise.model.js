"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisePlan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExerciseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    rest: { type: Number, required: true },
    description: { type: String, required: true },
    day: { type: String, required: true },
});
const CardioSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    type: { type: [String], required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
});
const NutritionSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    tips: { type: [String], required: true },
});
const FitnessPlanSchema = new mongoose_1.default.Schema({
    planName: { type: String, required: true },
    description: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    exercises: { type: [ExerciseSchema], required: true },
    cardio: { type: CardioSchema, required: true },
    nutrition: { type: NutritionSchema, required: true },
    motivationalAdvice: { type: [String], required: true },
});
const ExercisePlanSchema = new mongoose_1.default.Schema({
    fitnessPlan: { type: FitnessPlanSchema, required: true },
    user: {
        ref: "User",
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
});
exports.ExercisePlan = mongoose_1.default.model("ExercisePlan", ExercisePlanSchema);
//# sourceMappingURL=exercise.model.js.map