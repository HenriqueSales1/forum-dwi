import Post from "../../models/post.js";

async function createPost(req, res) {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content
        });
        res.redirect('/posts');
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).send("Ocorreu um erro ao criar a postagem.");
    }
}

async function getPosts(req, res) {
    try {
        const posts = await Post.findAll({ raw: true, order: [['createdAt', 'DESC']] });
        res.render('posts/posts', { posts: posts });
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(500).send("Ocorreu um erro ao buscar as postagens.");
    }
}

async function editPost(req, res) {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).send("Postagem não encontrada.");
        }
        res.render('posts/edit', { post: post.toJSON() });
    } catch (error) {
        console.error("Erro ao carregar edição:", error);
        res.status(500).send("Ocorreu um erro ao carregar a página de edição.");
    }
}

async function savePost(req, res) {
    try {
        await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: { id: req.body.id }
            }
        );
        res.redirect('/posts');
    } catch (error) {
        console.error("Erro ao salvar post:", error);
        res.status(500).send("Ocorreu um erro ao salvar a postagem.");
    }
}

async function deletePost(req, res) {
    try {
        await Post.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/posts');
    } catch (error) {
        console.error("Erro ao deletar post:", error);
        res.status(500).send("Ocorreu um erro ao deletar a postagem.");
    }
}

export { createPost, getPosts, editPost, savePost, deletePost }