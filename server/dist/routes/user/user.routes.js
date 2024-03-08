"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const otp_generator_1 = require("otp-generator");
const otp_model_1 = require("./otp.model");
const user_model_1 = require("./user.model");
const user_middleware_1 = require("./user.middleware");
const bmiCalculator_1 = require("../../utils/bmiCalculator");
const refeshAccessTokenGeneratore_1 = require("../../utils/refeshAccessTokenGeneratore");
const authChecker_1 = require("../../middlewares/authChecker");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/sendOtp", user_middleware_1.existedUser, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { username, email, password, age, height, gender, weight } = req.body;
    if (!username ||
        !email ||
        !password ||
        !age ||
        !height ||
        !gender ||
        !weight) {
        next({ message: "Please fill all the fields", status: 404 });
    }
    const otp = (0, otp_generator_1.generate)(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
    });
    await otp_model_1.Otp.create({
        email,
        otp,
    });
    res
        .status(201)
        .json({ message: "Please check your email and verify your otp" });
}));
router.post("/register", user_middleware_1.existedUser, (0, express_async_handler_1.default)(async (req, res, next) => {
    const { username, email, password, age, height, gender, weight, otp } = req.body;
    if (!username ||
        !email ||
        !password ||
        !age ||
        !height ||
        !gender ||
        !weight ||
        !otp) {
        next({ message: "Please fill all the fields", status: 404 });
    }
    const realOtp = await otp_model_1.Otp.findOne({
        email,
        otp,
    });
    if (realOtp) {
        const bmi = (0, bmiCalculator_1.calculateBmi)(weight, height);
        await user_model_1.User.create({
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
    }
    else {
        next({ message: "Incorrect Otp", status: 404 });
    }
}));
router.post("/login", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({ message: "Please fill all the fields", status: 404 });
    }
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        return next({ message: "User not found", status: 404 });
    }
    const isCorrectPassword = await user.isPasswordCorrect(password);
    if (!isCorrectPassword) {
        return next({ message: "Incorrect Password", status: 404 });
    }
    const { refreshToken, accessToken } = await (0, refeshAccessTokenGeneratore_1.generateAccessAndRefereshTokens)(user._id);
    res
        .status(200)
        .cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 15,
    })
        .cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 7,
    })
        .json({ message: "User logged in successfully" });
}));
router.get("/", authChecker_1.authChecker, (0, express_async_handler_1.default)(async (req, res) => {
    const user = req.body.user;
    const userInfo = await user_model_1.User.findById(user._id).select("-password -refreshToken");
    res
        .status(200)
        .json({ userInfo, message: "User info fetched successfully" });
}));
router.post("/logout", authChecker_1.authChecker, (0, express_async_handler_1.default)(async (req, res) => {
    res
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .status(200)
        .json({ message: "User logged out successfully" });
}));
//# sourceMappingURL=user.routes.js.map