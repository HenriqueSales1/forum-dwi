import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    database: "forum",
    username: "root",
    password: "root"
});

export async function syncer() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco estabelecida.");
        await sequelize.sync();
    } catch (error) {
        console.error("Erro ao conectar com o banco:", error);
        return false;
    }
    return true;
}

export default sequelize;