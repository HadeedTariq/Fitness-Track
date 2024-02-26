import { Router } from "express";
import asyncHandler from "express-async-handler";
import { generate as otpGenerator } from "otp-generator";
import { Otp } from "./otp.model";
import { User } from "./user.model";
import { existedUser } from "./user.middleware";
import { calculateBmi } from "../../utils/bmiCalculator";

const router = Router();

router.post(
  "/sendOtp",
  existedUser,
  asyncHandler(async (req, res, next) => {
    const { username, email, password, age, height, gender, weight } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !age ||
      !height ||
      !gender ||
      !weight
    ) {
      next({ message: "Please fill all the fields", status: 404 });
    }
    const otp = otpGenerator(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    await Otp.create({
      email,
      otp,
    });
    res
      .status(201)
      .json({ message: "Please check your email and verify your otp" });
  })
);

router.post(
  "/register",
  existedUser,
  asyncHandler(async (req, res, next) => {
    const { username, email, password, age, height, gender, weight, otp } =
      req.body;
    if (
      !username ||
      !email ||
      !password ||
      !age ||
      !height ||
      !gender ||
      !weight ||
      !otp
    ) {
      next({ message: "Please fill all the fields", status: 404 });
    }

    const realOtp = await Otp.findOne({
      email,
      otp,
    });
    if (realOtp) {
      const bmi = calculateBmi(weight, height);

      await User.create({
        username,
        email,
        password,
        age,
        height,
        gender,
        weight,
        bmi,
      });
      res.status(201).json({ message: "User created successfully" });
    } else {
      next({ message: "Incorrect Otp", status: 404 });
    }
  })
);

export { router as userRouter };
