var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/profile', profileRouter);
app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/register', indexRouter);
app.use('/messages', indexRouter);

module.exports = app;
