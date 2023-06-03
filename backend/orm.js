const dotenv = require('dotenv');

dotenv.config();

const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(
  'FitMe',
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: '3306',
    dialect: 'mysql',
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
  },
);
auto.run(err => {
  if (err) throw err;
});
