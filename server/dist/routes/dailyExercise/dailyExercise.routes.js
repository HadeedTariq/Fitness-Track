"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyExerciseRouter = void 0;
const express_1 = require("express");
const authChecker_1 = require("../../middlewares/authChecker");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dailyExercise_model_1 = require("./dailyExercise.model");
const router = (0, express_1.Router)();
exports.dailyExerciseRouter = router;
router.use(authChecker_1.authChecker);
router.get("/progress", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { _id } = req.body.user;
    const progressData = await dailyExercise_model_1.Progress.findOne({
        userId: _id,
    });
    res.status(200).json(progressData);
}));
router.post("/complete-today", (0, express_async_handler_1.default)(async (req, res, next) => { }));
router.use(authChecker_1.authChecker);
//# sourceMappingURL=dailyExercise.routes.js.map