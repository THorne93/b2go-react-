const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createConnection({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

connection.connect((err) => {
  if (err) {
    console.error('MariaDB connection error:', err);
  } else {
    console.log('MariaDB connected');
  }
});

module.exports = connection;
