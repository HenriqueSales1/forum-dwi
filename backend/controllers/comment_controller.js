import Comment from "../models/comment.js";
import Post from "../models/post.js";

async function createComment(req, res) {
    const comment = await Comment.create({
        content: req.body.content,
        postId: req.body.postId
    });
}

async function getComments(req, res) {
    const comments = await Comment.findAll({
        where: { postId: req.params.postId },
        include: [{ model: Post, as: 'post' }]
    });
    res.json(comments);
}

async function editComment(req, res) {
    const comment = await Comment.findOne({where: { id: req.params.id, postId: req.params.postId }});
    if (comment) {
        comment.content = req.body.content;
        await comment.save();
        res.json(comment);
    } else {
        res.status(404).send('Comentário não encontrado');
    }
}

async function deleteComment(req, res) {
    const comment = await Comment.findOne({where: { id: req.params.id, postId: req.params.postId }});
    if (comment) {
        await comment.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Comentário não encontrado');
    }
}