import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { Diet } from "./diet.model";
const router = Router();

router.use(authChecker);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const userDiet = await Diet.findOne({ user: req.body.user._id });
    res.status(200).json(userDiet);
  })
);

router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const { totalMeals, mealProperties } = req.body;
    if (!totalMeals || !mealProperties) {
      return next({ message: "Please fill all the fields", status: 404 });
    }
    const createdDiet = await Diet.create({
      totalMeals,
      mealProperties,
      user: req.body?.user._id,
    });
    res.status(201).json({ message: "Your diet created successfully" });
  })
);

router.put(
  "/update",
  asyncHandler(async (req, res, next) => {
    const { totalMeals, mealProperties } = req.body;
    if (!totalMeals || !mealProperties) {
      return next({ message: "Please fill all the fields", status: 404 });
    }
    const updateDiet = await Diet.findOneAndReplace(
      { user: req.body?.user._id },
      {
        totalMeals,
        mealProperties,
        user: req.body?.user._id,
      }
    );
    res.status(201).json({ message: "Your diet updated successfully" });
  })
);

export { router as dietRouter };
