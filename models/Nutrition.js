var mongoose = require('mongoose');
var NutritionSchema = require('../schemas/NutritionSchema');
var Nutrition = mongoose.model('nutrition', NutritionSchema);
module.exports = Nutrition;
