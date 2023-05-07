var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const sessionStore = session.MemoryStore();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trainersRouter = require('./routes/trainers');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  session({
    secret: 'FitMe',
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: false,
    },
    store: sessionStore,
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

app.use('/users', usersRouter);
app.use('/trainers', trainersRouter);

module.exports = app;
