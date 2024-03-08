"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dietRouter = void 0;
const express_1 = require("express");
const authChecker_1 = require("../../middlewares/authChecker");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const diet_model_1 = require("./diet.model");
const router = (0, express_1.Router)();
exports.dietRouter = router;
router.use(authChecker_1.authChecker);
router.get("/", (0, express_async_handler_1.default)(async (req, res, next) => {
    const userDiet = await diet_model_1.Diet.findOne({ user: req.body.user._id });
    res.status(200).json(userDiet);
}));
router.post("/create", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { totalMeals, mealProperties } = req.body;
    if (!totalMeals || !mealProperties) {
        return next({ message: "Please fill all the fields", status: 404 });
    }
    const createdDiet = await diet_model_1.Diet.create({
        totalMeals,
        mealProperties,
        user: req.body?.user._id,
    });
    res.status(201).json({ message: "Your diet created successfully" });
}));
router.put("/update", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { totalMeals, mealProperties } = req.body;
    if (!totalMeals || !mealProperties) {
        return next({ message: "Please fill all the fields", status: 404 });
    }
    const updateDiet = await diet_model_1.Diet.findOneAndReplace({ user: req.body?.user._id }, {
        totalMeals,
        mealProperties,
        user: req.body?.user._id,
    });
    res.status(201).json({ message: "Your diet updated successfully" });
}));
//# sourceMappingURL=diet.routes.js.map