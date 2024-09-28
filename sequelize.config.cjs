module.exports = {
    development: {
        username: 'user',
        password: 'pass',
        database: 'line-bot-database',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'ai-line-bot-database',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            connectTimeout: 60000
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        },
        logging: console.log
    }
};
