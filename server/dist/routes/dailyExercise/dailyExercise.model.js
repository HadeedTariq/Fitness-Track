"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyExercise = void 0;
const mongoose_1 = require("mongoose");
// ! how can I check that the user exercises today or not?
// TODO: We can check that the user exercise today or not by getting the last element added if last element created date is equal to today date that means that the user exercises today but if not that means user not exercises today
const dailyExerciseSchema = new mongoose_1.Schema({
    exerciseTimeInMinutes: {
        type: Number,
        required: true,
    },
    exerciseTimeInSeconds: {
        type: Number,
        required: true,
    },
    user: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    exerciseName: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.DailyExercise = (0, mongoose_1.model)("DailyExercise", dailyExerciseSchema);
//# sourceMappingURL=dailyExercise.model.js.map