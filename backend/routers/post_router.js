import { createPost, getPosts, editPost, deletePost } from "../controllers/post_controller.js";
import { Router } from "express";
import authMiddleware from "../middleware/auth.js";

const postRouter = Router();
postRouter.get("/", getPosts);
postRouter.post("/create", authMiddleware, createPost);
postRouter.put("/edit/:id", authMiddleware, editPost);
postRouter.delete("/delete/:id", authMiddleware, deletePost);

export default postRouter;