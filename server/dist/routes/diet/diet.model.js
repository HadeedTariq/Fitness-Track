"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diet = void 0;
const mongoose_1 = require("mongoose");
const dietSchema = new mongoose_1.Schema({
    totalMeals: {
        type: Number,
        required: true,
    },
    user: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    mealProperties: {
        type: [{ mealName: String, mealTime: String, calories: Number }],
        required: true,
    },
}, { timestamps: true });
exports.Diet = (0, mongoose_1.model)("Diet", dietSchema);
//# sourceMappingURL=diet.model.js.map