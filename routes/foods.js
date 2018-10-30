var express = require('express');
var router = express.Router();
var Food = require('../models/Food');


router.get('/', function (req, res, next) {
	Food.find(null, (err, docs) => {
		if (err) {
			next({
				status: 500,
				message:'server or db error'
			});
		} else {
			res.json(docs);
		}
	});
});

module.exports = router;
