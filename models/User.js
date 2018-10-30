var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var User = mongoose.model('user', UserSchema);
module.exports = User;
