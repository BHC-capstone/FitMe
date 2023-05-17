const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("FitMe", "root", "1234", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
  password: "1234",
  user: "root",
});
auto.run((err) => {
  if (err) throw err;
});
