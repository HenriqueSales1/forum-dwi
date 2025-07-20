import express from 'express';
// import { create } from 'express-handlebars';
import { syncer } from './database/mysql.js';
import multer from 'multer';

// Rotas

import postRouter from './routers/post_router.js';
import userRouter from './routers/user_router.js';
// import postWebRouter from './routers/web/post_web_router.js';


if (!await syncer()) {
  console.error("Erro ao sincronizar o banco de dados.");
  process.exit();
}

const app = express();

app.use(express.json());


// const upload = multer({ dest: 'uploads/' });
app.use(express.json());

// app.get('/posts', (req, res) => {
//   res.render('posts/posts');
// });

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});