import asyncHandler from "express-async-handler";
import { Exercises } from "./exercise.model";

const createExercise = asyncHandler(async (req, res, next) => {
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
    user: user._id,
    setProperties: properties,
  });

  if (createExercise) {
    res.status(201).json({ message: "Exercise created successfully" });
  }
});

const updateExercise = asyncHandler(async (req, res, next) => {
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

  const updateExercise = await Exercises.findOneAndReplace(
    { $and: [{ user: req.body.user._id }, { exerciseDay }] },
    {
      exercises,
      exerciseName,
      exerciseDay,
      exerciseType,
      user: user._id,
      setProperties: properties,
    }
  );

  if (updateExercise) {
    res.status(201).json({ message: "Exercise updated successfully" });
  } else {
    next({ status: 501, message: "Something went wrong" });
  }
});

const getExerciseByDay = asyncHandler(async (req, res, next) => {
  const { day } = req.params;
  if (!day) {
    return next({ message: "Day is required", status: 404 });
  }
  const exercise = await Exercises.findOne({
    $and: [{ user: req.body.user._id }, { exerciseDay: day }],
  });

  console.log(exercise);

  res.status(200).json(exercise);
});

export { createExercise, updateExercise, getExerciseByDay };
