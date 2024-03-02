import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { DailyExercise } from "./dailyExercise.model";
const router = Router();

router.use(authChecker);

router.post(
  "/done",
  asyncHandler(async (req, res, next) => {
    const { exerciseTime, userId, exerciseName } = req.body;

    if (!exerciseTime || !userId || !exerciseName) {
      return next({ message: "Please fill all the fields", status: 404 });
    }

    const userTodayExercise = await DailyExercise.create({
      exerciseTime,
      user: userId,
      exerciseName,
    });
    if (userTodayExercise) {
      res.status(201).json({ message: "You exercise today successfully" });
    }
  })
);

router.get(
  "/today",
  asyncHandler(async (req, res, next) => {
    const exercise = await DailyExercise.findOne({
      user: req.body.user._id,
    }).sort({ createdAt: -1 });

    if (exercise) {
      res.status(200).json(exercise);
      return;
    } else {
      next({});
    }
  })
);

export { router as dailyExerciseRouter };
