const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');

const passport = require('passport');
const strategy = require('./strategy');
const logger = require('morgan');
const path = require('path');
const config = require('./config');

const app = express();
const index = require('./routes/index');

const mongoose = require('mongoose');
const connection = mongoose.connection;

mongoose.connect(config.mongoURI, {useNewUrlParser: true});

connection.once('open', () => console.log('Database connection successful!'));
connection.on('error', (err) => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: [config.cookieSecret],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false
}));

app.use(logger('dev'));

// Auth
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });
passport.use(strategy);

// Routing
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = req.app.get('env') === 'development' ? err.message : null;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;