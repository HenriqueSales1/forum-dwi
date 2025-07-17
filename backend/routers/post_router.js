import { createPost, getPosts, editPost, deletePost } from "../controllers/post_controller.js";
import { Router } from "express";

const postRouter = Router();
postRouter.post("/create", createPost);
postRouter.get("/list", getPosts);
postRouter.put("/edit", editPost);
postRouter.delete("/delete", deletePost);

export default postRouter;