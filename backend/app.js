var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trainersRouter = require('./routes/trainers');
var manageRouter = require('./routes/manage');
var requestRouter = require('./routes/request');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    },
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trainers', trainersRouter);
app.use('/manage', manageRouter);
app.use('/request', requestRouter);

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '1234',
//     database : 'FitMe'
//   })

//   connection.connect();

//   connection.query('SELECT * from Users', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
//   });

//   connection.end();

module.exports = app;
