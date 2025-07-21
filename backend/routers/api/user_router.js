import {promptUser, createUser, promptLogin, login, logout} from "../../controllers/user_controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get('/register', promptUser);
userRouter.post('/register', createUser);
userRouter.get('/login', promptLogin);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

export default userRouter;