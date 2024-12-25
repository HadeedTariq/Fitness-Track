import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { User } from "../user/user.model";
import { ExercisePlan } from "./plan.model";

const router = Router();

router.use(authChecker);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const exercisePlans = await ExercisePlan.findOne({
      user: req.body.user._id,
    });
    if (!exercisePlans) {
      res.status(200).json({});
      return;
    }
    res.status(200).json(exercisePlans.fitnessPlan);
    return;
  })
);
router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
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
    Based on a BMI of ${bmi} for a ${age}-year-old ${gender} with the goal of "${goal}" 
    (e.g., muscle gain, weight loss, or maintaining weight), 
    provide a tailored fitness plan with an initial set of exercises and motivational advice and provide data in JSON format.
    
    Generate a Mongoose schema that represents a detailed exercise and fitness plan. Include the following specifications:
    
    1. **Exercise Schema**:
       - Fields:
         - \`name\`: String, required.
         - \`sets\`: Number, required.
         - \`reps\`: Mixed (allowing ranges or specific values like AMRAP), required.
         - \`rest\`: Number (representing rest time in seconds), required.
         - \`description\`: String, required.
    
    2. **Cardio Schema**:
       - Fields:
         - \`description\`: String, required.
         - \`type\`: Array of strings (e.g., walking, cycling), required.
         - \`frequency\`: String (e.g., "2-3 times per week"), required.
         - \`duration\`: String (e.g., "30-45 minutes"), required.
    
    3. **Nutrition Schema**:
       - Fields:
         - \`description\`: String, required.
         - \`tips\`: Array of strings, required.
    
    4. **Fitness Plan Schema**:
       - Fields:
         - \`planName\`: String, required.
         - \`description\`: String, required.
         - \`frequency\`: String (e.g., "3-4 days per week"), required.
         - \`duration\`: String (e.g., "8-12 weeks"), required.
         - \`exercises\`: Array of Exercise objects, required.
         - \`cardio\`: A single Cardio object, required.
         - \`nutrition\`: A single Nutrition object, required.
         - \`motivationalAdvice\`: Array of strings, required.
    
    Ensure proper usage of Mongoose schema and model, including the use of sub-schemas for modular design. Use appropriate field types (e.g., \`String\`, \`Number\`, \`Array\`) and include validation such as \`required: true\` where necessary. I want just the result in json format and just the actual plan for this person and not return me my provided mongoose schema type definition
    `;

    const result = await model.generateContent(prompt);
    const fitnessPlan = result.response.text();

    const planData = JSON.parse(
      JSON.stringify(fitnessPlan.split("```")[1].split("json")[1].trim())
    );
    const actualPlanData = JSON.parse(planData);

    const fitnessPlanModel = await ExercisePlan.create({
      fitnessPlan: actualPlanData,
      user: _id,
    });

    res.json({ message: "Your plan is created successfully" });
  })
);

export { router as planRouter };
// Add Rag specific to Pakistan
// Customize it for pakistani psyique
