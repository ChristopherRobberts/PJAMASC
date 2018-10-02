var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dataBaseConnection = require('./Integration/DatabaseConnection.js');
let Controller = require('./Controller/Controller.js');
const util = require('util');
let encrypt = require('./encryption/encryption');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Form validation and sanitization
/*
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
*/

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

dataBaseConnection.connection;

/*
* Tests for the database calls.
* */

//WORKS(soon)
/*
Controller.addItem("AB0000024", "tv3000", 7, "best tv eu", "abc", 50, function(status) {
    console.log(status);
});*/

//FUNKAR
/*
Controller.getUserInfo("JYSK", "123456", function(status) {
    console.log(status);
});
*/


//FUNKAR
/*
Controller.deleteItems("AB0000024", 7, function(status) {
    console.log(status);
});
*/

//FUNKAR
/*
Controller.getItems(7, function(status) {
    console.log(status);
});
*/

//FUNKAR
/*
Controller.updateItemDescription("AB000001", 5, "bajskorv", function(status) {
    console.log(status);
});
*/

//FUNKAR
/*
Controller.updateItemQuantity("AB000001", 5, 10, 1, function(status) {
   console.log(status);
});
*/
module.exports = app;
