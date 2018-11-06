var express = require('express');
var router = express.Router();
var util = require('../libs/util');
var FoodGrade = require('../models/FoodGrade');
var multer  = require('multer')
var config = require('../config/config');

const storage = multer.diskStorage({
    destination (req, res, cb) {
        cb(null, config.nginxPath + config.storagePath);
    },
    filename (req, file, cb) {
        var dateTime = util.formatDate(new Date(), 'yyyyMMddhhmmss');
        cb(null, dateTime + '-' + file.originalname);
    }
});
const upload = multer({storage}).any();

router.put('/', upload, function (req, res, next) {
    var data = req.body;
    let files = req.files;
    let others = [];
    for (let i = 0;i < files.length;i++) {
        let filename = files[i].filename;
        let suffix = filename.substr(filename.lastIndexOf('-') + 1);
        if (suffix === '0') {
            data.imagePath = config.storagePath + filename;
        } else {
            others.push({
                imagePath: config.storagePath + filename
            });
        }
    }
    data.others = others;
    var foodGrade = new FoodGrade(
        data
    );
    console.log(data);

    foodGrade.save((err) => {
        if (err) {
            next({
                status: 500,
                message: 'server or db error'
            });
        } else {
            res.json({status: 200, message: 'save status: success'});
        }
    });
});


router.get('/', function (req, res, next) {
    FoodGrade.find(null, null, {sort: req.query.sort}, (err, docs) => {
        if (err) {
            next({
                status: 500,
                message: 'server or db error'
            });
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;
