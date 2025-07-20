import { createPost, getPosts, editPost, deletePost } from "../controllers/post_controller.js";
import { Router } from "express";
// import authenticateUser from "../middlewares/authenticate_user.js";

const postRouter = Router();
postRouter.post("/create",  createPost);
postRouter.get("/list", getPosts);
postRouter.put("/edit/:id",  editPost);
postRouter.delete("/delete/:id",  deletePost);

export default postRouter;