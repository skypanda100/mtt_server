var express = require('express');
var router = express.Router();
var util = require('../libs/util');
var Daily = require('../models/Daily');
var multer  = require('multer')
var config = require('../config/config');
var sharp = require('sharp');

async function compress(imagePath){
    var info = await sharp(imagePath)
        .resize(500)
        .toFile(imagePath + '.thumbnail');
    console.log(info);
}

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
    let data = req.body;
    let files = req.files;
    let others = [];
    let images = [];
    let tags = [];
    let id = null;

    if (!util.isNull(data.id)) {
        id = data.id;
    }

    if (!util.isNull(data.images)) {
        images = JSON.parse(data.images);
    }

    for (let i = 0;i < images.length;i++) {
        let filename = images[i];
        others.push({
            imagePath: filename
        });
    }

    if (!util.isNull(data.tags)) {
        let tmpTags = JSON.parse(data.tags);
        for (let tag of tmpTags) {
            tags.push(tag);
        }
    }
    data.tags = tags;

    for (let i = 0;i < files.length;i++) {
        let filename = files[i].filename;
        let suffix = filename.substr(filename.lastIndexOf('-') + 1);
        let imagePath = config.storagePath + filename;
        compress(imagePath);
        if (suffix === '0') {
            data.imagePath = imagePath;
        } else {
            others.push({
                imagePath: imagePath
            });
        }
    }
    data.others = others;
    let daily = new Daily(
        data
    );

    if (id !== '') {
        Daily.remove({_id: id}, function (err, resp) {
            if (err) {
                next({
                    status: 500,
                    message: 'server or db error'
                });
            } else {
                if (!util.isNull(data.imagePath) && data.imagePath !== '') {
                    daily.save((err) => {
                        if (err) {
                            next({
                                status: 500,
                                message: 'server or db error'
                            });
                        } else {
                            res.json({status: 200, message: 'save status: success'});
                        }
                    });
                } else {
                    res.json({status: 200, message: 'delete status: success'});
                }
            }
        })
    } else {
        daily.save((err) => {
            if (err) {
                next({
                    status: 500,
                    message: 'server or db error'
                });
            } else {
                res.json({status: 200, message: 'save status: success'});
            }
        });
    }
});


router.get('/', function (req, res, next) {
    let filter = null;
    let option = {sort: req.query.sort};
    if (!util.isNull(req.query.filter) && req.query.filter !== '') {
        filter = {type: req.query.filter};
    }
    if (!util.isNull(req.query.limit) && req.query.limit !== '') {
        option.limit = parseInt(req.query.limit);
    }
    console.log(option);
    Daily.find(filter, null, option, (err, docs) => {
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

router.get('/last', function (req, res, next) {
    Daily.find(null, null, {sort: req.query.sort}, (err, docs) => {
        if (err) {
            next({
                status: 500,
                message: 'server or db error'
            });
        } else {
            let results = [];
            let lastDate = '';
            for (let i = 0;i < docs.length;i++) {
                let doc = docs[i];
                let date = doc.dateTime.substr(0, 10);

                if (i === 0) {
                    lastDate = date;
                    results.push(doc);
                } else {
                    if (lastDate === date) {
                        results.push(doc);
                    } else {
                        break;
                    }
                }
            }
            res.json(results);
        }
    });
});

module.exports = router;
