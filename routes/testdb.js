var express = require('express');
var router = express.Router();
var Food = require('../models/Food');
var Nutrition = require('../models/Nutrition');

router.get('/foods', function (req, res, next) {
	var foods = require('../public/data/foods.json');

	for (var food of foods) {
		var f = new Food(
			food
		);
		f.save((err) => {
			console.log('save status:', err ? 'failed' : 'success');
		});
	}
	res.json(null);
});

router.get('/nutritions', function (req, res, next) {
	var nutritions = require('../public/data/nutritions.json');

	for (var nutrition of nutritions) {
		var n = new Nutrition(
			nutrition
		);
		n.save((err) => {
			console.log('save status:', err ? 'failed' : 'success');
		});
	}
	res.json(null);
});

module.exports = router;
