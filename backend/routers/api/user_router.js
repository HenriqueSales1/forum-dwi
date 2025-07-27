import { createUser, login, getUserProfile, getAllUsers } from "../../controllers/user_controller.js";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.js";
import adminMiddleware from "../../middleware/admin.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/", authMiddleware, adminMiddleware, getAllUsers);

export default userRouter;
