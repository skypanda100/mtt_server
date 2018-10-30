var mongoose = require('mongoose');
var FoodGradeSchema = require('../schemas/FoodGradeSchema');
var FoodGrade = mongoose.model('foodGrade', FoodGradeSchema);
module.exports = FoodGrade;
