import { DataTypes } from 'sequelize';
import sequelize from '../database/mysql.js';

const Media = sequelize.define('Media', {
    media_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
        
    url:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Media;