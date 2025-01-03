"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares = __importStar(require("./middlewares"));
const dbConnection_1 = require("./connection/dbConnection");
const user_routes_1 = require("./routes/user/user.routes");
const dailyExercise_routes_1 = require("./routes/dailyExercise/dailyExercise.routes");
const exercise_routes_1 = require("./routes/exercise/exercise.routes");
const post_routes_1 = require("./routes/posts/post.routes");
const plan_routes_1 = require("./routes/plan/plan.routes");
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
(0, dbConnection_1.connectToDb)(process.env.MONGO_URI);
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONT_END_ORIGIN,
        "https://fitness-track-frontend.vercel.app",
    ],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to fitness track backend",
    });
});
app.use("/user", user_routes_1.userRouter);
app.use("/dailyExercise", dailyExercise_routes_1.dailyExerciseRouter);
app.use("/exercise", exercise_routes_1.exerciseRouter);
app.use("/post", post_routes_1.postRouter);
app.use("/plan", plan_routes_1.planRouter);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map