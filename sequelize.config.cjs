module.exports = {
    local: {
        username: 'user',
        password: 'pass',
        database: 'line-bot-database',
        host: '127.0.0.1',
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
    },
    production: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || '',
        host: 'localhost',
        port: 5432,
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
