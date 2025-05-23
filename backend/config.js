require('dotenv').config();

const config = {
  port: 5000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 3306, // default MariaDB/MySQL port
  dbUser: process.env.DB_USER || 'dwes',
  dbPassword: process.env.DB_PASSWORD || 'acb123.',
  dbName: process.env.DB_NAME || 'b2examlab',
  API_KEY_JWT: process.env.API_KEY_JWT,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};
module.exports = config;
