"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentsSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    subComments: {
        type: [
            {
                content: String,
                user: {
                    ref: "User",
                    type: mongoose_1.Schema.Types.ObjectId,
                    required: true,
                },
            },
        ],
        required: false,
    },
}, { timestamps: true });
exports.Comment = (0, mongoose_1.model)("Comments", commentsSchema);
//# sourceMappingURL=comments.model.js.map