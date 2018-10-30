var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var config = require('./config/config');
var util = require('./libs/util');
var testdbRouter = require('./routes/testdb');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodsRouter = require('./routes/foods');
var nutritionsRouter = require('./routes/nutritions');
var ordersRouter = require('./routes/orders');
var foodGradesRouter = require('./routes/foodGrades');
var serialsRouter = require('./routes/serials');
var sleepQualitiesRouter = require('./routes/sleepQualities');

var mongoose = require('./config/mongoose.js');
var db = mongoose();

var app = express();

// 跨域设置（必须放在各个router之前）
app.all("*", function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Credentials", true);// Allow Cookie
	res.header("Access-Control-Allow-Headers", "mtt-token, X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    next();
});

// 拦截所有请求（必须放在各个router之前）
app.all('/*', function (req, res, next) {
	if (req.method.indexOf('OPTIONS') < 0) {
        if (req.url.indexOf('/users/token') < 0 && req.url.indexOf('/serials') < 0) {
            let token = req.headers['mtt-token'];
            if (!util.isNull(token)) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (!err){
                        // console.log(decoded.user);  //如果过了期限，则有错误。
	                    next();
                    } else {
                        next({
                            status: 500,
                            message: 'no access'
                        });
                    }
                });
            } else {
                next({
                    status: 500,
                    message: 'no access'
                });
            }
        } else {
        	next();
        }
	} else {
        next();
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use('/testdb', testdbRouter);
app.use('/', indexRouter);
app.use('/foods', foodsRouter);
app.use('/users', usersRouter);
app.use('/nutritions', nutritionsRouter);
app.use('/orders', ordersRouter);
app.use('/foodGrades', foodGradesRouter);
app.use('/serials', serialsRouter);
app.use('/sleepQualities', sleepQualitiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next({
		status: 404,
		message: 'there is no such path'
	});
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status);
	res.send(err);
});

module.exports = app;
