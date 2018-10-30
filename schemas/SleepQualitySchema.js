var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var sleepQualitySchema = new Schema({
	user: String,
    date: String,
    sleepStart: String,
    sleepEnd: String,
    sumSleep: Number,
    deepSleeps: [
	    {
	    	start: String,
		    end: String,
		    diff: Number
	    }
    ],
    sumDeepSleep: Number,
    awakes: [
        {
            start: String,
            end: String,
            diff: Number
        }
    ],
    sumAwake: Number,
});
module.exports = sleepQualitySchema;
