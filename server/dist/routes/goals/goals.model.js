"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goals = void 0;
const mongoose_1 = require("mongoose");
const goalsSchema = new mongoose_1.Schema({
    goalType: {
        enum: ["weekly", "daily", "monthly"],
        type: String,
        required: true,
    },
    user: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Goals = (0, mongoose_1.model)("Goal", goalsSchema);
//# sourceMappingURL=goals.model.js.map