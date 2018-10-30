var mongoose = require('mongoose');
var FoodSchema = require('../schemas/FoodSchema');
var Food = mongoose.model('food', FoodSchema);
module.exports = Food;
