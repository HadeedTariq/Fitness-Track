"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRouter = void 0;
const express_1 = require("express");
const authChecker_1 = require("../../middlewares/authChecker");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const exercise_model_1 = require("./exercise.model");
const router = (0, express_1.Router)();
exports.exerciseRouter = router;
router.use(authChecker_1.authChecker);
router.post("/create", authChecker_1.authChecker, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { exercises, exerciseName, exerciseDay, exerciseType, user, properties, } = req.body;
    if (!exercises ||
        !exerciseName ||
        !exerciseDay ||
        !exerciseType ||
        !user ||
        !properties) {
        return next({ message: "Please fill all the fields", status: 404 });
    }
    const createExercise = await exercise_model_1.Exercises.create({
        exercises,
        exerciseName,
        exerciseDay,
        exerciseType,
        user: user._id,
        setProperties: properties,
    });
    if (createExercise) {
        res.status(201).json({ message: "Exercise created successfully" });
    }
}));
router.put("/update", authChecker_1.authChecker, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { exercises, exerciseName, exerciseDay, exerciseType, user, properties, } = req.body;
    if (!exercises ||
        !exerciseName ||
        !exerciseDay ||
        !exerciseType ||
        !user ||
        !properties) {
        return next({ message: "Please fill all the fields", status: 404 });
    }
    const updateExercise = await exercise_model_1.Exercises.findOneAndReplace({ $and: [{ user: req.body.user._id }, { exerciseDay }] }, {
        exercises,
        exerciseName,
        exerciseDay,
        exerciseType,
        user: user._id,
        setProperties: properties,
    });
    if (updateExercise) {
        res.status(201).json({ message: "Exercise updated successfully" });
    }
}));
router.get("/:day", authChecker_1.authChecker, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { day } = req.params;
    if (!day) {
        return next({ message: "Day is required", status: 404 });
    }
    const exercise = await exercise_model_1.Exercises.findOne({
        $and: [{ user: req.body.user._id }, { exerciseDay: day }],
    });
    console.log(exercise);
    res.status(200).json(exercise);
}));
//# sourceMappingURL=exercise.routes.js.map