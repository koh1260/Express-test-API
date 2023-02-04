require('dotenv').config();
const mysql = require('mysql2');

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
const db = mysql.createConnection(options);

db.connect();

module.exports = db;