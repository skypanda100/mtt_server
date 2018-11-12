var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var dailySchema = new Schema({
	user: String,
	type: String,
	dateTime: String,
	grade: Number,
	comment: String,
    location: String,
	imagePath: String,
	others: [
		{
            imagePath: String
		}
	]
});
module.exports = dailySchema;
