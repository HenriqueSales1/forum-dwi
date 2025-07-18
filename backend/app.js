import express from 'express';
import { create } from 'express-handlebars';
import { syncer } from './database/mysql.js';
import multer from 'multer';

// Rotas

// import postRouter from './routers/post_router.js';
import postWebRouter from './routers/web/post_web_router.js';


if (!await syncer()) {
  console.error("Erro ao sincronizar o banco de dados.");
  process.exit();
}

const app = express();

const hbs = create ({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/partials/'
});

app.use(express.json());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');


const upload = multer({ dest: 'uploads/' });
app.use(express.json());

app.get('/posts', (req, res) => {
  res.render('posts/posts');
});

app.use('/posts', postWebRouter);

app.listen(80, () => {
  console.log('Server is running on http://localhost:80');
});