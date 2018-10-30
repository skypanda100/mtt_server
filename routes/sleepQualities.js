var express = require('express');
var router = express.Router();
var SleepQuality = require('../models/SleepQuality');
var util = require('../libs/util');

function getAllTimes (days) {
	let times = [];
	let nowDate = new Date();
	for (let i = 0;i < days;i++) {
		let date = new Date(nowDate.getTime() - i * 24 * 3600 * 1000);
		times.push(util.formatDate(date, 'yyyy-MM-dd'));
	}
	return times;
}

router.get('/undo', function (req, res, next) {
	if (!util.isNull(req.query.user)) {
		let user = req.query.user;
        let times = getAllTimes(30);
        SleepQuality.find({user: user, date: {"$gte": times[times.length - 1]}}, null, {sort: '-date'}, (err, docs) => {
            if (err) {
                next({
                    status: 500,
                    message: 'server or db error'
                });
            } else {
            	docs.map(doc => {
            		let index = times.indexOf(doc.date);
            		if (index > -1) {
            			times.splice(index, 1);
		            }
	            });
                res.json(times);
            }
        });
	} else {
        next({
            status: 500,
            message: 'argument error'
        });
    }
});


router.get('/last', function (req, res, next) {
    if (!util.isNull(req.query.user) && !util.isNull(req.query.days)) {
        let user = req.query.user;
        let days = req.query.days;
        let times = getAllTimes(days);
        SleepQuality.find({user: {$in: user}, date: {"$gte": times[times.length - 1]}}, null, {sort: '+date'}, (err, docs) => {
            if (err) {
                next({
                    status: 500,
                    message: 'server or db error'
                });
            } else {
                res.json(docs);
            }
        });
    } else {
        next({
            status: 500,
            message: 'argument error'
        });
    }
});

router.post('/', function (req, res, next) {
	if (!util.isNull(req.body)) {
		let data = req.body;
		SleepQuality.remove({user: data.user, date: data.date}, function (err, resp) {
			if (err) {
				next({
					status: 500,
					message: 'server or db error'
				});
			} else {
				var sq = new SleepQuality(
					data
				);
				sq.save((err) => {
					if (err) {
						next({
							status: 500,
							message: 'server or db error'
						});
					} else {
						res.json({status: 200, message: 'save status: success'});
					}
				});
			}
		});

	} else {
		next({
			status: 500,
			message: 'argument error'
		});
	}
});

module.exports = router;
