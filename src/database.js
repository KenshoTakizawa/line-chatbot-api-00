import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME || 'line-bot-database';
const dbUser = process.env.DB_USER || 'user';
const dbPass = process.env.DB_PASS || 'pass';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
});

export default sequelize;
