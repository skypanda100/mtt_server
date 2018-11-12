var mongoose = require('mongoose');
var DailySchema = require('../schemas/DailySchema');
var Daily = mongoose.model('daily', DailySchema);
module.exports = Daily;
