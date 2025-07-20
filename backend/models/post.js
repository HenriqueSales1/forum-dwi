import { DataTypes } from "sequelize";
import User from "./user.js";
import sequelize from "../database/mysql.js";

const Post = sequelize.define("Post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Assuming you have a Users model
            key: 'id'
        }
    }
});

export default Post;