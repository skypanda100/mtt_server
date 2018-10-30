var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
var jwt = require('jsonwebtoken');
var SHA256 = require("crypto-js/sha256");
var Base64 = require('crypto-js/enc-base64');
var config = require('../config/config');

function generateToken(user){
    let created = Math.floor(Date.now() / 1000);

    let token = jwt.sign({
        user: user
    }, config.secret, {
        expiresIn: created + 3600 * 24 * 7 //到期时间
    });

    return token;
}

router.post('/token', function (req, res, next) {
    let data = req.body;
    let {username, password} = data;
    // console.log(Base64.stringify(SHA256('gaoge100')));
    User.findOne({
        username: username,
        password: password
    }, (err, doc) => {
        if (err) {
            next({
                status: 500,
                message:'server or db error'
            });
        } else {
            if (doc) {
                res.json({
                    alias: doc.alias,
                    avatar: doc.avatar,
                    token: generateToken(doc.username)
                });
            } else {
                next({
                    status: 500,
                    message:'username or password error'
                });
            }
        }
    })
});

/* GET users listing. */
router.get('/all', function (req, res, next) {
	User.find(null, null, (err, docs) => {
		if (err) {
			next({
				status: 500,
				message:'server or db error'
			});
		} else {
		    let results = [];
		    docs.map(doc => {
                results.push({
                    username: doc.username,
                    avatar: doc.avatar/* + '?timestamp=' + new Date().getTime()*/,
                    alias: doc.alias
                })
            });
			res.json(results);
		}
	})
});

module.exports = router;
