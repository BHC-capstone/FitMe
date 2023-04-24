var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');

var { users, trainers } = require('./models/index');

const { sequelize } = require('./models/index');

//for serssion
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'FitMe',
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: 'FitMe',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trainersRouter = require('./routes/trainers');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trainers', trainersRouter);
app.use(usersRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
