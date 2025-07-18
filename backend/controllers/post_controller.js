import Post from "../models/post.js";

async function createPost(req, res){
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content
    });
    res.json(post);
}

async function getPosts(req, res){
    const posts = await Post.findAll();
    res.json(posts);
}

async function editPost(req, res){
    const post = await Post.findByPk(req.params.id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.json(post);
    } else {
        res.status(404).send("Postagem não encontrada.");
    }
}

async function deletePost(req, res){
    const post = await Post.findByPk(req.params.id);
    if (post) {
        await post.destroy();
        res.status(204).send();
    } else {
        res.status(404).send("Postagem não encontrada.");
    }
}

export { createPost, getPosts, editPost, deletePost };