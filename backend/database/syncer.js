import sequelize from "./mysql.js";
import Perms from "../models/perms.js";
import Post from "../models/post";
import Comment from "../models/comment.js";
import Media from "../models/media.js";
import User from "../models/user.js";

async function syncer() {
    try {
        // Sincroniza os modelos com o banco de dados
        User.hasMany(Post, { foreignKey: 'userId' });
        User.hasMany(Comment, { foreignKey: 'userId' });
        Post.hasMany(Comment, { foreignKey: 'postId' });
        Post.hasMany(Media, { foreignKey: 'postId' });

        await sequelize.sync({ force: false });
        console.log("Banco de dados sincronizado com sucesso.");
    } catch (error) {
        console.error("Erro ao sincronizar o banco de dados:", error);
        return false;
    }
    return true;
}

export default syncer;