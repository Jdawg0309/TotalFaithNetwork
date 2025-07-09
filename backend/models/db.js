const Database = require('better-sqlite3');
const db = new Database('tfn.db');
module.exports = db;

