module.exports = {
  "development": {
    "username": "user",
    "password": "pass",
    "database": "line-bot-database",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "force": true
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}