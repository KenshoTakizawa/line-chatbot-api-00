import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('line-bot-database', 'user', 'pass', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
