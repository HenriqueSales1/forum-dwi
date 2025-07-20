import { DataTypes } from 'sequelize';
import sequelize from '../database/mysql.js';
import User from './user.js';
import Post from './post.js';

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