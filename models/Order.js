var mongoose = require('mongoose');
var OrderSchema = require('../schemas/OrderSchema');
var Order = mongoose.model('order', OrderSchema);
module.exports = Order;
