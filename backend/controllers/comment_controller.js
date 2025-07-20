import Comment from "../models/comment.js";
import User from "../models/user.js";

async function createComment(req, res) {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            postId: req.body.postId,
            userId: req.user.id,
            userName: req.user.name
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        res.status(500).json({ message: "Erro ao criar comentário" });
    }
}

async function getComments(req, res) {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId },
            include: [{ model: User, attributes: ['id', 'name'] }]
        });
        res.json(comments);
    } catch (error) {
        console.error("Erro ao obter comentários:", error);
        res.status(500).json({ message: "Erro ao obter comentários" });
    }
}

async function editComment(req, res) {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (comment) {
            comment.content = req.body.content;
            await comment.save();
            res.json(comment);
        } else {
            res.status(404).send("Comentário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao editar comentário:", error);
        res.status(500).json({ message: "Erro ao editar comentário" });
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (comment) {
            await comment.destroy();
            res.status(204).send();
        } else {
            res.status(404).send("Comentário não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        res.status(500).json({ message: "Erro ao deletar comentário" });
    }
}

export { createComment, getComments, editComment, deleteComment };