var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var nutritionSchema = new Schema({
	no: Number,
	egName: String,
	chName: String,
	standardValue: Number
});
module.exports = nutritionSchema;
