import Post from "../models/post";
import Comment from "../models/comment.js";
import Media from "../models/media.js";
import sequelize from "./mysql.js";

async function syncer() {
    try {
        // Sincroniza os modelos com o banco de dados
        await sequelize.sync({ force: false });

        Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
        Media.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        Post.hasMany(Media, { foreignKey: 'postId', as: 'media' });

        await sequelize.sync({ force: false });
        console.log("Banco de dados sincronizado com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar o banco de dados:", error);
        return false;
    }
    return true;
}

export default syncer;