var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var serialSchema = new Schema({
    dateTime: String,
    co2: Number,
    china_aqi: Number,
    america_aqi: Number,
    hcho: Number,
	temp: Number,
    humidity: Number,
    unknown1: Number,
    unknown2: Number,
    unknown3: Number,
    pm2_5: Number,
	unknown4: Number,
    unknown5: Number,
    matter0_3: Number,
    matter0_5: Number,
    matter1_0: Number,
    matter2_5: Number,
    matter5_0: Number,
    matter10_0: Number
});
module.exports = serialSchema;
