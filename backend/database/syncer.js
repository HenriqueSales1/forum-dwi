import sequelize from "./mysql.js";
import Perms from "../models/perms.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";

async function syncer() {
  try {
    User.hasMany(Post, { foreignKey: "userId" });
    Post.belongsTo(User, { foreignKey: "userId" });
    
    User.hasMany(Comment, { foreignKey: "userId" });
    Post.hasMany(Comment, { foreignKey: "postId" });

    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado com sucesso.");
    return true;
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
    return false;
  }
}

export { syncer };
