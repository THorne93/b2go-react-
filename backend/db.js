const mysql = require('mysql2');

// Create connection pool (better for handling multiple requests)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'dwes',
  password: 'abc123.',
  database: 'b2go',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise(); // use promise-based API
