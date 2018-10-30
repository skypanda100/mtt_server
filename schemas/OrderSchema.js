var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var orderSchema = new Schema({
	date: String,
	foods: [
		{
			name: String,
			weight: Number,
			amount: Number
		}
	]
});
module.exports = orderSchema;
