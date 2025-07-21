import {createComment, getComments, editComment, deleteComment } from "../../controllers/comment_controller.js";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";

const commentRouter = Router();

commentRouter.post("/create", authMiddleware, createComment);
commentRouter.get("/list/:postId", getComments);
commentRouter.put("/edit/:id", authMiddleware, editComment);
commentRouter.delete("/delete/:id", authMiddleware, deleteComment);

export default commentRouter;