var mongoose = require('mongoose');
var SerialSchema = require('../schemas/SerialSchema');
var Serial = mongoose.model('serial', SerialSchema);
Serial.lastSerial = null;
Serial.hourlySerial = null;
Serial.hourlyIndex = 0;
Serial.hourlyCount = 400;
module.exports = Serial;
