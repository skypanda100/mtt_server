var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var foodSchema = new Schema({
	name: String,
	reLiang: Number,
	tanShui: Number,
	zhiFang: Number,
	danBaiZhi: Number,
	xianWeiSu: Number,
	weiShengSuA: Number,
	weiShengSuC: Number,
	weiShengSuE: Number,
	huLuoBoSu: Number,
	liuAnSu: Number,
	heHuangSu: Number,
	yanSuan: Number,
	danGuChun: Number,
	mei: Number,
	gai: Number,
	tie: Number,
	xin: Number,
	tong: Number,
	meng: Number,
	jia: Number,
	lin: Number,
	na: Number,
	xi: Number,
	NMN: Number
});
module.exports = foodSchema;
