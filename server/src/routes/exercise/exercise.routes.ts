import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { Exercises } from "./exercise.model";

const router = Router();

router.use(authChecker);

router.post(
  "/create",
  authChecker,
  asyncHandler(async (req, res, next) => {
    const {
      exercises,
      exerciseName,
      exerciseDay,
      exerciseType,
      user,
      properties,
    } = req.body;

    if (
      !exercises ||
      !exerciseName ||
      !exerciseDay ||
      !exerciseType ||
      !user ||
      !properties
    ) {
      return next({ message: "Please fill all the fields", status: 404 });
    }

    const createExercise = await Exercises.create({
      exercises,
      exerciseName,
      exerciseDay,
      exerciseType,
      user,
      setProperties: properties,
    });

    if (createExercise) {
      res.status(201).json({ message: "Exercise created successfully" });
    }
  })
);

export { router as exerciseRouter };
