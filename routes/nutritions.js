var express = require('express');
var router = express.Router();
var Nutrition = require('../models/Nutrition');

router.get('/', function (req, res, next) {
	Nutrition.find(null, null, {sort: {"no": 1}}, (err, docs) => {
		if (err) {
			next({
				status: 500,
				message: 'server or db error'
			});
		} else {
			res.json(docs);
		}
	});
});

module.exports = router;
