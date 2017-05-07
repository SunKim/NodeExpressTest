/**
 * Global 변수 선언
 */
const ENC_KEY = "sjmarine97@gmail.com";

/**
 * Load Modules
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

/**
 * Router Setup
 */
var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var session = require('./routes/session');
var header = require('./routes/header');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/**
 * Middleware Setup
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(ENC_KEY));
app.use(express.static(path.join(__dirname, 'public')));

//cookie를 이용한 session 사용
app.use(cookieSession({
	name: 'session',
	keys: [ ENC_KEY ],
	
	// Cookie Options
	maxAge: 2 * 60 * 60 * 1000	// 2 hours
}));


app.use('/', index);
app.use('/users', users);
app.use('/upload', upload);
app.use('/session', session);
app.use('/header', header);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//왜 커밋을 하고 push를 했는데 안되는겨

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
