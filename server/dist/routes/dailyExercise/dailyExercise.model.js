"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const progressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
progressSchema.methods.calculateStatus = function () {
    this.progress.forEach((weekProgress) => {
        const completionRate = (weekProgress.completedExercises / weekProgress.totalExercises) * 100;
        if (completionRate === 100) {
            weekProgress.status = "green";
        }
        else if (completionRate >= 50) {
            weekProgress.status = "yellow";
        }
        else {
            weekProgress.status = "red";
        }
    });
};
exports.Progress = mongoose_1.default.model("Progress", progressSchema);
//# sourceMappingURL=dailyExercise.model.js.map