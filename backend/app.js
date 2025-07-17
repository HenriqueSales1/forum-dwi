import express from 'express';
import { syncer } from './database/mysql.js';

// Rotas

import postRouter from './routers/post_router.js';


if (!await syncer()) {
    console.error("Erro ao sincronizar o banco de dados.");
    process.exit();
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/posts', postRouter);

app.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});