import { Router } from "express";
import { existedUser } from "./user.middleware";
import { authChecker } from "../../middlewares/authChecker";
import {
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  sendOtp,
} from "./user.controller";

const router = Router();

router.post("/sendOtp", existedUser, sendOtp);

router.post("/register", existedUser, registerUser);

router.post("/login", loginUser);

router.use(authChecker);

router.get("/", getUser);

router.post("/logout", logoutUser);

router.get("/profile", getUserProfile);

export { router as userRouter };
