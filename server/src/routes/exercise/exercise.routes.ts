import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import {
  createExercise,
  getExerciseByDay,
  updateExercise,
} from "./exercise.controller";

const router = Router();

router.use(authChecker);

router.post("/create", authChecker, createExercise);
router.put("/update", authChecker, updateExercise);
router.get("/:day", authChecker, getExerciseByDay);

export { router as exerciseRouter };
