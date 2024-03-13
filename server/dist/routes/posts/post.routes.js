"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const authChecker_1 = require("../../middlewares/authChecker");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_model_1 = require("./post.model");
const router = (0, express_1.Router)();
exports.postRouter = router;
router.use(authChecker_1.authChecker);
router.post("/create", (0, express_async_handler_1.default)(async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return next({ message: "Please fill all the fields", status: 404 });
    }
    const createPost = await post_model_1.Post.create({
        title,
        description,
        user: req.body?.user._id,
    });
    if (createPost) {
        res.status(201).json({ message: "Post created successfully" });
    }
    else {
        next({});
    }
}));
//# sourceMappingURL=post.routes.js.map