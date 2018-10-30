var mongoose = require('mongoose');
var SleepQualitySchema = require('../schemas/SleepQualitySchema');
var SleepQuality = mongoose.model('sleepQuality', SleepQualitySchema);
module.exports = SleepQuality;
