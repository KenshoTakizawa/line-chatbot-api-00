const path = require('path');

module.exports = {
    'migrations-path': path.resolve('src', 'migrations'),
    'models-path': path.resolve('src', 'models'),
    'seeders-path': path.resolve('src', 'seeders'),
    'config': path.resolve('src', 'config', 'config.js')
};