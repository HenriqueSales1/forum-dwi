import { createPost, deletePost, editPost, savePost, getPosts } from '../../controllers/web/post_web_controller.js';
import { Router } from 'express';

const postWebRouter = Router();

postWebRouter.get('/', getPosts);
postWebRouter.post('/', createPost);
postWebRouter.get('/edit/:id', editPost);
postWebRouter.post('/save', savePost);
postWebRouter.get('/delete/:id', deletePost);

export default postWebRouter;