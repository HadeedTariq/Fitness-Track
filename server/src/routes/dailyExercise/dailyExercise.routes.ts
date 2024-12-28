import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { Progress } from "./dailyExercise.model";

const router = Router();

router.use(authChecker);

router.get(
  "/progress",
  asyncHandler(async (req, res, next) => {
    const { _id } = req.body.user;
    const progressData = await Progress.findOne({
      userId: _id,
    });
    res.status(200).json(progressData);
  })
);
router.post(
  "/complete-today",
  asyncHandler(async (req, res, next) => {})
);

router.use(authChecker);

export { router as dailyExerciseRouter };
