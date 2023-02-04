const mysql = require('mysql2');

const options = {
    host: '127.0.0.1',
    user: 'root',
    password: '1306',
    database: 'instagram'
};
const db = mysql.createConnection(options);

db.connect();

module.exports = db;