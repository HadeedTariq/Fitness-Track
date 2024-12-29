import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { User } from "../user/user.model";
import { ExercisePlan } from "./exercise.model";
import { MongooseError } from "mongoose";
import { DietPlan } from "./diet.model";
import { Progress } from "../dailyExercise/dailyExercise.model";

const router = Router();

router.use(authChecker);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const exercisePlans = await ExercisePlan.findOne({
      user: req.body.user._id,
    });
    if (!exercisePlans) {
      res
        .status(200)
        .json({ message: "You have not created exercise plan yet" });
      return;
    }
    res.status(200).json(exercisePlans.fitnessPlan);
    return;
  })
);
router.get(
  "/diet",
  asyncHandler(async (req, res, next) => {
    const userDietPlan = await DietPlan.findOne({
      user: req.body.user._id,
    });
    if (!userDietPlan) {
      res.status(200).json({ message: "You have not created diet plan yet" });
      return;
    }
    res.status(200).json(userDietPlan.dietPlan);
    return;
  })
);
router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    try {
      const geminiApiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(geminiApiKey as string);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const { email, _id } = req.body.user;
      const { goal } = req.body;
      const isPlanExist = await ExercisePlan.findOne({
        user: _id,
      });
      if (isPlanExist) {
        res.json({ message: "Your plan is already created" });
        return;
      }
      if (!goal) {
        res.status(400).json({ message: "Please provide a goal" });
        return;
      }

      const user = await User.findOne({ email });

      const { weight, age, height, gender } = user as any;

      const weightInKg = parseFloat(weight.replace(/[^0-9.]/g, ""));
      const heightInFt = parseFloat(height.replace(/[^0-9.]/g, ""));
      if (isNaN(weightInKg) || isNaN(heightInFt)) {
        res.status(400).json({ message: "Invalid height or weight format." });
        return;
      }

      const heightInMeters = heightInFt * 0.3048;

      const bmi = (weightInKg / heightInMeters ** 2).toFixed(2);

      const prompt = `
      Based on a BMI of ${bmi} for a ${age}-year-old ${gender} with the goal of ${goal} (e.g., muscle gain, weight loss, or maintaining weight), provide a tailored fitness plan in JSON format with the following structure. Ensure there are no syntax errors, and adhere strictly to these data types:

        Fitness Plan (Root Object):

        planName (String): The name of the fitness plan.
        description (String): A detailed description of the fitness plan.
        frequency (String): E.g., "3-4 days per week".
        duration (String): E.g., "12 weeks".
        exercises (Array of Exercise objects): List of exercises included in the plan.
        cardio (Cardio Object): Details about cardio activities.
        nutrition (Nutrition Object): Nutrition-related guidelines.
        motivationalAdvice (Array of Strings): Motivational tips.
        Exercise Schema:

        name (String): Name of the exercise if there is not exercise today then make this rest day.
        sets (Number): Number of sets.
        reps (String or Object): Accepts:
        Specific values (e.g., "10").
        Ranges as objects ({ "min": 10, "max": 12 }).
        Special cases (e.g., "AMRAP").
        rest (Number): Rest time in seconds.
        description (String): Instructions or details about the exercise.
        day (String): Exercise day.
        Cardio Schema:

        description (String): Overview of cardio activities.
        type (Array of Strings): Types of cardio (e.g., walking, cycling).
        frequency (String): E.g., "2-3 times per week".
        duration (String): E.g., "30-45 minutes".
        Nutrition Schema:

        description (String): Overview of the nutrition plan.
        tips (Array of Strings): Practical tips and advice.
        Key Requirements:

        Provide only the fitness plan JSON data for this person.
        Ensure all data follows the exact field types and format described.
        Avoid including any Mongoose schema type definitions in the response.
        Ensure the JSON is well-formed with no syntax errors.I want exact reps not min max Please also provide data according to this schema
      `;

      const result = await model.generateContent(prompt);
      const fitnessPlan = result.response.text();

      const planData = JSON.parse(
        JSON.stringify(fitnessPlan.split("```")[1].split("json")[1].trim())
      );

      const actualPlanData = JSON.parse(planData);

      console.log(actualPlanData);

      const fitnessPlanModel = await ExercisePlan.create({
        fitnessPlan: actualPlanData,
        user: _id,
      });

      const exercisesLength = fitnessPlanModel.fitnessPlan.exercises.length;
      const progress = [];
      let duration: any = fitnessPlanModel.fitnessPlan.duration;
      duration = Number(duration.split(" ")[0]);

      for (let i = 1; i <= duration; i++) {
        progress.push({
          week: i,
          totalExercises: exercisesLength,
          completedExercises: 0,
          status: "red",
        });
      }

      await Progress.create({
        userId: _id,
        planDurationWeeks: duration,
        progress: progress,
      });

      res.json({ message: "Your plan is created successfully" });
    } catch (err) {
      if (err instanceof MongooseError) {
        console.log(err);
        res
          .status(404)
          .json({ message: "Something went wrong while storing to data" });
      }
      console.log(err);
      res
        .status(404)
        .json({ message: "Something went wrong while storing to data" });
    }
  })
);
router.post(
  "/create-diet",
  asyncHandler(async (req, res, next) => {
    try {
      const geminiApiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(geminiApiKey as string);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const { email, _id } = req.body.user;
      const { objective } = req.body;
      const isPlanExist = await DietPlan.findOne({
        user: _id,
      });
      if (isPlanExist) {
        res.json({ message: "Your diet plan is already created" });
        return;
      }
      if (!objective) {
        res.status(400).json({ message: "Please provide a objective" });
        return;
      }

      const user = await User.findOne({ email });

      const { weight, age, height, gender } = user as any;

      const weightInKg = parseFloat(weight.replace(/[^0-9.]/g, ""));
      const heightInFt = parseFloat(height.replace(/[^0-9.]/g, ""));
      if (isNaN(weightInKg) || isNaN(heightInFt)) {
        res.status(400).json({ message: "Invalid height or weight format." });
        return;
      }

      const heightInMeters = heightInFt * 0.3048;

      const bmi = (weightInKg / heightInMeters ** 2).toFixed(2);

      const prompt = `
     Based on a BMI of ${bmi} for a ${age}-year-old ${gender} with the objective of ${objective} (e.g., muscle gain, weight loss, or maintaining weight), provide a tailored diet plan in JSON format with the following structure. Ensure there are no syntax errors, and adhere strictly to these data types:
        Diet Plan Schema (Root Object):
        planName (String): The name of the diet plan.
        description (String): A detailed description of the diet plan.
        dailyCalories (Number): Total daily calorie intake.
        meals (Array of Meal objects): List of meals included in the plan.
        hydration (Hydration Object): Details about water intake.
        motivationalAdvice (Array of Strings): Motivational tips.
        Meal Schema:
        name (String): Name of the meal.
        calories (Number): Total calories in the meal.
        protein (Number): Grams of protein.
        carbs (Number): Grams of carbohydrates.
        fats (Number): Grams of fats.
        description (String): Details about the meal.
        Hydration Schema:
        description (String): Overview of the hydration plan.
        dailyGoal (Number): Daily water intake goal in liters.
        tips (Array of Strings): Practical tips and advice.
        Key Requirements:

        Provide only the diet plan JSON data for this person.
        Ensure all data follows the exact field types and format described.
        Avoid including any Mongoose schema type definitions in the response.
        Ensure the JSON is well-formed with no syntax errors
        Diet plan should be according to pakistani psyique.
      `;

      const result = await model.generateContent(prompt);
      const fitnessPlan = result.response.text();

      const planData = JSON.parse(
        JSON.stringify(fitnessPlan.split("```")[1].split("json")[1].trim())
      );

      const actualPlanData = JSON.parse(planData);

      const dietPlanModel = await DietPlan.create({
        dietPlan: actualPlanData,
        user: _id,
      });

      res.json({ message: "Your diet plan is created successfully" });
    } catch (err) {
      if (err instanceof MongooseError) {
        console.log(err);
        res
          .status(404)
          .json({ message: "Something went wrong while storing to data" });
      }
      console.log(err);
      res
        .status(404)
        .json({ message: "Something went wrong while storing to data" });
    }
  })
);

router.delete("/delete-plan", async (req, res) => {
  try {
    const { user } = req.body;
    const { planType } = req.query;

    if (!planType) {
      res.status(400).json({ message: "Plan Type is required." });
      return;
    }

    let deletedPlan;

    if (planType === "exercise") {
      deletedPlan = await ExercisePlan.findOneAndDelete({ user: user._id });
      Progress.findOneAndDelete({ userId: user._id });
    } else if (planType === "diet") {
      deletedPlan = await DietPlan.findOneAndDelete({ user: user._id });
    } else {
      res
        .status(400)
        .json({ message: "Invalid plan type. Use 'exercise' or 'diet'." });
      return;
    }

    if (!deletedPlan) {
      res.status(404).json({ message: "Plan not found for the given user." });
      return;
    }

    res.json({
      message: `${
        planType.charAt(0).toUpperCase() + planType.slice(1)
      } plan deleted successfully.`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the plan." });
  }
});
export { router as planRouter };
