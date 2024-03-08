"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercises = void 0;
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    exercises: {
        type: Number,
        required: true,
    },
    setProperties: {
        type: [
            {
                totalReps: Number,
                setName: String,
                eachSetReps: Number,
                totalSets: Number,
            },
        ],
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
    exerciseDay: {
        type: String,
        required: true,
        unique: true,
    },
    exerciseType: {
        enum: ["lower", "upper"],
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Exercises = (0, mongoose_1.model)("Exercise", exerciseSchema);
//# sourceMappingURL=exercise.model.js.map