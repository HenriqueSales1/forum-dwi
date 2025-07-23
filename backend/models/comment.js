import { DataTypes } from 'sequelize';
import sequelize from '../database/mysql.js';

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    postId: DataTypes.INTEGER
});

export default Comment;