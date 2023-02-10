require('dotenv').config();
import { createConnection } from 'mysql2';

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true
};
const db = createConnection(options);

db.connect();

export default db;