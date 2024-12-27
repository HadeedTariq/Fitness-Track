import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { DailyExercise } from "./dailyExercise.model";
import { ExercisePlan } from "../plan/exercise.model";
const router = Router();

router.use(authChecker);

router.post(
  "/done",
  asyncHandler(async (req, res, next) => {
    const { exerciseTimeInSeconds, exerciseTimeInMinutes, exerciseName } =
      req.body;
    console.log(req.body);
    if (!exerciseTimeInSeconds || !exerciseTimeInMinutes || !exerciseName) {
      return next({ message: "Please fill all the fields", status: 404 });
    }

    const userTodayExercise = await DailyExercise.create({
      exerciseTimeInSeconds,
      exerciseTimeInMinutes,
      user: req.body.user._id,
      exerciseName,
    });
    if (userTodayExercise) {
      res.status(201).json({ message: "You exercise today successfully" });
    }
  })
);

export { router as dailyExerciseRouter };
