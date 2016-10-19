var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/openPocket', function (req, res, next) {

    var _fp = path.join(__dirname, '../data/201611RedPocket/openPocket.json');

    //初始化参数:  {"state":1,"type":1,"money":"0.00","msg":"success"}

    fs.readFile(_fp, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        var result = JSON.parse(data);
        if (result.state == 1) {
            result.msg = 'success';
            if (result.type == 1) {
                result.money = Math.floor(Math.random() * 9 + 1) + '.00';
                result.type = 0;
                fs.writeFile(_fp, JSON.stringify(result), function (err) {
                    if (err) {
                        throw err;
                    }
                    result.type = 1;
                    res.send(result);
                });
            } else if (result.type == 0) {
                res.send(result);
            }
        } else {
            result.money = '0.00';
            result.msg = '返回状态错误!错误字段state';
            res.send(result);
        }
    });
});

module.exports = router;
