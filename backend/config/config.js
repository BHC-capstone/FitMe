const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: '1234',
    database: 'FitMe',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: '1234',
    database: 'FitMe',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
