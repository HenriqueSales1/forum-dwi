import { createPerm, getPerms, editPerm, deletePerm } from "../../controllers/perms_controller.js";
import { Router } from "express";

const permsRouter = Router();
permsRouter.post("/", createPerm);
permsRouter.get("/", getPerms);
permsRouter.put("/:id", editPerm);
permsRouter.delete("/:id", deletePerm);

export default permsRouter;
