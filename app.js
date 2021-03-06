var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');


//Aca encuentra el recurso 
var api = require('./routes/api');
var api_proyect = require('./routes/api_proyect');
var api_meta = require('./routes/api_meta');
var api_equipo = require('./routes/api_equipo');
var api_equipo_alt = require('./routes/api_equipo_alternative');
var api_fase = require('./routes/api_fase');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Aca crea la ruta que es el medio para acceder al recurso http
app.use('/', routes);
app.use('/api/v1', api);
app.use('/users', users);
app.use('/auth', auth);
app.use('/api/',api_proyect);
app.use('/api/',api_meta);
app.use('/api/',api_equipo_alt);
app.use('/api/',api_equipo);
app.use('/api/',api_fase);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
