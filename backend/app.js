import express from "express";
import { syncer } from "./database/syncer.js";
import { seedAdminUser, seedPerms } from "./database/seeder.js";
import cors from "cors";

import postRouter from "./routers/api/post_router.js";
import userRouter from "./routers/api/user_router.js";
import commentRouter from "./routers/api/comment_router.js";
import permsRouter from "./routers/api/perms_router.js";

(async () => {
  if (!(await syncer())) {
    console.error("Erro ao sincronizar o banco de dados.");
    process.exit();
  }

  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: "GET,PUT,POST,DELETE",
    })
  );

  // console.log(process.env.FRONTEND_URL);

  app.use(express.json());
  await seedPerms();
  await seedAdminUser();

  app.use("/api/posts", postRouter);
  app.use("/api/users", userRouter);
  app.use("/api/perms", permsRouter);
  app.use("/api/comments", commentRouter);

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
})();
