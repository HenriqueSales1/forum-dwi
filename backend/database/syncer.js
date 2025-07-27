import sequelize from "./mysql.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import Perms from "../models/perms.js"; 

async function syncer() {
  try {
    Perms.hasMany(User, { foreignKey: "permsId" });
    User.belongsTo(Perms, { foreignKey: "permsId" });

    User.hasMany(Post, { foreignKey: "userId" });
    Post.belongsTo(User, { foreignKey: "userId" });

    User.hasMany(Comment, { foreignKey: "userId" });
    Comment.belongsTo(User, { foreignKey: "userId" });

    Post.hasMany(Comment, { foreignKey: "postId" });
    Comment.belongsTo(Post, { foreignKey: "postId" });

    await sequelize.sync({ alter: true });
    console.log(
      "Banco de dados sincronizado com sucesso, incluindo todas as associações."
    );
    return true;
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
    return false;
  }
}

export { syncer };
