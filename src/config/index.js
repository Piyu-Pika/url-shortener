const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  baseUrl: process.env.BASE_URL,
  logLevel: process.env.LOG_LEVEL || 'info'
};
