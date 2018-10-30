var express = require('express');
var router = express.Router();
var Order = require('../models/Order');
var util = require('../libs/util');

router.get('/', function (req, res, next) {
	var query = req.query;
	var date = util.formatDate(new Date(), 'yyyy-MM-dd');
	if (!util.isNull(query.date)) {
		date = query.date;
	}
	Order.findOne({date: date}, function (err, doc) {
		if (err) {
			next({
				status: 500,
				message: 'server or db error'
			});
		} else {
			res.json(doc);
		}
	});
});

router.put('/', function (req, res, next) {
	if (!util.isNull(req.body.data)) {
		let data = req.body.data;
		Order.remove({date : data.date}, function (err, resp) {
			if (err) {
				next({
					status: 500,
					message: 'server or db error'
				});
			} else {
				var o = new Order(
					data
				);
				o.save((err) => {
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
