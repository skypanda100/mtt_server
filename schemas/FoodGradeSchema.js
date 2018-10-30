var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var foodGradeSchema = new Schema({
	user: String,
	dateTime: String,
	grade: Number,
	comment: String,
	imagePath: String
});
module.exports = foodGradeSchema;
