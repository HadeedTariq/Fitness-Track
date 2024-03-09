import { Router } from "express";
import { authChecker } from "../../middlewares/authChecker";
import asyncHandler from "express-async-handler";
import { Post } from "./post.model";

const router = Router();

router.use(authChecker);

router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;

    if (!title || !description) {
      return next({ message: "Please fill all the fields", status: 404 });
    }

    const createPost = await Post.create({
      title,
      description,
      user: req.body?.user._id,
    });

    if (createPost) {
      res.status(201).json({ message: "Post created successfully" });
    } else {
      next({});
    }
  })
);

export { router as postRouter };
