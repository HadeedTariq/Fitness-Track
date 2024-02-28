import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as middlewares from "./middlewares";
import MessageResponse from "./interfaces/MessageResponse";
import { connectToDb } from "./connection/dbConnection";
import { userRouter } from "./routes/user/user.routes";
import { dailyExerciseRouter } from "./routes/dailyExercise/dailyExercise.routes";
import { exerciseRouter } from "./routes/exercise/exercise.routes";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

connectToDb(process.env.MONGO_URI!);
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: process.env.FRONT_END_ORIGIN!, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});
app.use("/user", userRouter);
app.use("/dailyExercise", dailyExerciseRouter);
app.use("/exercise", exerciseRouter);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
