// const { singularize } = require('sequelize/types/utils');

// const auto = new SequelizeAuto('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
//   directory: false, // prevents the program from writing to disk
//   port: 'port',
//   additional: {
//     timestamps: false,
//   },
//   caseModel: 'c',
//   caseFile: 'c',
//   singularize: true,
// });

const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto('FitMe', 'root', '1234', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
  password: '1234',
  user: 'root',
});
auto.run((err) => {
  if (err) throw err;
});
