const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const friendsRouter = require('./routes/friends');
const conversationsRouter = require('./routes/conversations');
const conversationRouter = require('./routes/conversation');
const sendMessageRouter = require('./routes/sendMessage');
const addFileRouter = require('./routes/addFile');
const getFileRouter = require('./routes/getFile');
const findUsersRouter = require('./routes/findUsers');
const tokenRouter = require('./routes/token');
const friendRequestRouter = require("./routes/friendRequest");
const authorisationFilter = require("./filters/AuthorisationFilter");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/conversation", express.static(path.join(__dirname, 'public')));


app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/token', tokenRouter);
app.use('/api/getFile', getFileRouter);

app.use('/api/*', authorisationFilter.requireAuthentication);

app.use('/api/profile', profileRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/sendMessage', sendMessageRouter);
app.use('/api/addFile', addFileRouter);
app.use('/api/findUsers', findUsersRouter);
app.use('/api/friendRequest', friendRequestRouter);
app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/register', indexRouter);
app.use('/friends', indexRouter);
app.use('/user/*', indexRouter);
app.use('/conversations', indexRouter);
app.use('/conversation/*', indexRouter);

module.exports = app;
