import express from "express";
import { syncer } from "./database/syncer.js";
import { seedPerms } from "./database/seeder.js";
import cors from "cors";

// Rotas

import postRouter from "./routers/api/post_router.js";
import userRouter from "./routers/api/user_router.js";
import commentRouter from "./routers/api/comment_router.js";
import permsRouter from "./routers/api/perms_router.js";
// import mediaRouter from './routers/api/media_router.js';

if (!(await syncer())) {
  console.error("Erro ao sincronizar o banco de dados.");
  process.exit();
}

const app = express();

app.use(
  cors({
    allowOrigin: "*",

    methods: "GET,PUT,POST,DELETE",
  })
);

app.use(express.json());
await seedPerms();

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/posts/comments", commentRouter);
app.use("/api/perms", permsRouter);
// app.use('/api/posts/media', mediaRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
