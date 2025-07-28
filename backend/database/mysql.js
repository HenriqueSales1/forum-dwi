import { Sequelize } from "sequelize";

// const sequelize = new Sequelize({
//   host: "localhost",
//   port: 3306, 
//   dialect: "mysql",
//   database: "forum", 
//   username: "root", 
//   password: "root", 
// });

const sequelize = new Sequelize ('postgresql://forum_dwi_user:5LsIEY6gcmPHGwIeYyt0Ga9lzRlLVS7t@dpg-d23c9eu3jp1c739p46jg-a/forum_dwi_db')

export default sequelize;
