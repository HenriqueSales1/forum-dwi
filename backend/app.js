import express from 'express';
import { syncer } from './database/mysql.js';
import multer from 'multer';

// Rotas

import postRouter from './routers/api/post_router.js';
import userRouter from './routers/api/user_router.js';
import commentRouter from './routers/api/comment_router.js';


if (!await syncer()) {
  console.error("Erro ao sincronizar o banco de dados.");
  process.exit();
}

const app = express();

app.use(express.json());


// const upload = multer({ dest: 'uploads/' });
app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/posts/comments', commentRouter);

app.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});