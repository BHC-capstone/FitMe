var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const https = require('https');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trainersRouter = require('./routes/trainers');
var manageRouter = require('./routes/manage');
var requestRouter = require('./routes/request');
var calenderRouter = require('./routes/calender');
var trainer_calenderRouter = require('./routes/trainer_calender');
var feedbackRouter = require('./routes/feedback');
var payRouter = require('./routes/pay');
var adminRouter = require('./routes/administrator');

const PORT = process.env.PORT || 4000;

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(
  session({
    secret: '@FitMe',
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
  }),
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trainers', trainersRouter);
app.use('/manage', manageRouter);
app.use('/request', requestRouter);
app.use('/calender', calenderRouter);
app.use('/trainer_calender', trainer_calenderRouter);
app.use('/feedback', feedbackRouter);
app.use('/pay', payRouter);
app.use('/admin', adminRouter);

//frontend와 연동
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

module.exports = app;
