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
router.post("/done", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { exerciseTimeInSeconds, exerciseTimeInMinutes, exerciseName } = req.body;
    console.log(req.body);
    if (!exerciseTimeInSeconds || !exerciseTimeInMinutes || !exerciseName) {
        return next({ message: "Please fill all the fields", status: 404 });
    }
    const userTodayExercise = await dailyExercise_model_1.DailyExercise.create({
        exerciseTimeInSeconds,
        exerciseTimeInMinutes,
        user: req.body.user._id,
        exerciseName,
    });
    if (userTodayExercise) {
        res.status(201).json({ message: "You exercise today successfully" });
    }
}));
router.get("/today", (0, express_async_handler_1.default)(async (req, res, next) => {
    const exercise = await dailyExercise_model_1.DailyExercise.findOne({
        user: req.body.user._id,
    })
        .sort({ createdAt: -1 })
        .select("-exerciseTimeInMinutes -exerciseTimeInSeconds");
    res.status(200).json(exercise);
}));
//# sourceMappingURL=dailyExercise.routes.js.map