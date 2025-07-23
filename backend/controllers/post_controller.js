import Post from "../models/post.js";
import User from "../models/user.js";

const createPost = async (req, res) => {
  try {
    const { content, title, userId } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Título e conteúdo são obrigatórios." });
    }

    const post = await Post.create({
      title: title,
      content: content,
      userId: userId
    });

    const responsePost = {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userId: post.userId
      // user: await user.findByPk(userId){
      //   name: req.user.name,
      //   username: req.user.username,
      // },
    };

    res.status(201).json(responsePost);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao criar o post." });
  }
};

async function getPosts(req, res) {
  const posts = await Post.findAll({include: User});
  const newPosts = posts.map((v)=> {
    v = v.toJSON();
    v.username = v.User.name;
    v.User = null;
    return v;
  });
  res.json(newPosts);
}

async function editPost(req, res) {
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

async function deletePost(req, res) {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    await post.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Postagem não encontrada.");
  }
}

export { createPost, getPosts, editPost, deletePost };
