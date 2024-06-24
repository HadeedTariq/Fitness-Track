import asyncHandler from "express-async-handler";
import { generate as otpGenerator } from "otp-generator";
import { Otp } from "./otp.model";
import { User } from "./user.model";
import { calculateBmi } from "../../utils/bmiCalculator";
import { generateAccessAndRefereshTokens } from "../../utils/refeshAccessTokenGeneratore";
import mongoose from "mongoose";

const sendOtp = asyncHandler(async (req, res, next) => {
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
});

const registerUser = asyncHandler(async (req, res, next) => {
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
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({ message: "Please fill all the fields", status: 404 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next({ message: "User not found", status: 404 });
  }
  const isCorrectPassword = await user.isPasswordCorrect(password);

  if (!isCorrectPassword) {
    return next({ message: "Incorrect Password", status: 404 });
  }

  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    })
    .cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    })
    .json({ message: "User logged in successfully" });
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.body.user;
  const userInfo = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  res.status(200).json({ userInfo, message: "User info fetched successfully" });
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const _id = req.body.user?._id;

  const userProfile = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(_id) },
    },
    // ! lookup for user posts
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "user",
        as: "myPosts",
        pipeline: [
          {
            $project: {
              title: 1,
              description: 1,
              comments: 1,
              _id: 1,
            },
          },
        ],
      },
    },
    // ! lookup for weekly progress
    {
      $lookup: {
        from: "dailyexercises",
        localField: "_id",
        foreignField: "user",
        as: "overAllProgress",
        pipeline: [
          {
            $project: {
              exerciseTimeInMinutes: 1,
              exerciseTimeInSeconds: 1,
              exerciseName: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        password: 0,
        refreshToken: 0,
        _id: 0,
      },
    },
  ]);
  if (userProfile) {
    res.status(200).json(userProfile[0]);
  } else {
    next({ message: "User not found", status: 404 });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res
    .clearCookie("refreshToken", {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    })
    .clearCookie("accessToken", {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "User logged out successfully" });
});

export {
  registerUser,
  sendOtp,
  loginUser,
  logoutUser,
  getUser,
  getUserProfile,
};