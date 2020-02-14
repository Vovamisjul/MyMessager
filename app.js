var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var conversationsRouter = require('./routes/conversations');
var conversationRouter = require('./routes/conversation');
var sendMessageRouter = require('./routes/sendMessage');
var tokenRouter = require('./routes/token');
const authorisationFilter = require("./filters/AuthorisationFilter");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/conversation", express.static(path.join(__dirname, 'public')));


app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/token', tokenRouter);
app.use('/api/*', authorisationFilter.requireAuthentication);

app.use('/api/profile', profileRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/sendMessage', sendMessageRouter);
app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/register', indexRouter);
app.use('/conversations', indexRouter);
app.use('/conversation/*', indexRouter);

module.exports = app;
