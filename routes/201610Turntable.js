var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

//检查用户名是否在抽奖列表中
router.post('/userExist', function (req, res, next) {
    //接收参数
    var _name = req.body.uname;
    //读取文件
    fs.readFile(path.join(__dirname, '../data/201610Turntable/usersList.json'), 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        //转换成json对象
        var arr = JSON.parse(data);
        //过滤是否存在这个用户
        arr = arr.filter(function (item) {
            return item.name == _name;
        });
        //返回的数据格式
        var result = {
            "isSuccess": false,
            "num": 0,
            "msg": ''
        };
        //用户不在抽奖列表中
        if (arr.length == 0) {
            result.msg = "用户名不存在！";
            //用户在抽奖列表中
        } else {
            result.isSuccess = true;
            //抽奖次数已经用完
            if (arr[0].amount == 0) {
                result.msg = "抽奖次数已用完!";
                //抽奖次数还没有用完
            } else {
                result.num = arr[0].amount;
                result.msg = "恭喜，请抽奖!";
            }
        }
        res.send(result);
    });
});

//是否能够玩
router.post('/canplay', function (req, res, next) {
    var _name = req.body.uname;
    var _fp = path.join(__dirname, '../data/201610Turntable/usersList.json');
    fs.readFile(_fp, 'utf-8', function (err, data) {
        var arr = JSON.parse(data);
        var _arr = arr.filter(function (item) {
            return item.name == _name;
        });
        //返回的数据格式
        var result = {
            "isSuccess": false,
            "num": 0,
            "award": -1,
            "msg": ""
        };
        //用户名不再抽奖列表中
        if (_arr.lenght == 0) {
            result.msg = "用户名不存在!";
            res.send(result);
            //用户名在抽奖列表中
        } else {
            //机会用完
            result.isSuccess = true;
            if (_arr[0].amount == 0) {
                result.msg = "抽奖机会已经用完!";
                res.send(result);
                //正常抽奖
            } else {
                result.num = _arr[0].amount;
                result.award = Math.floor(Math.random() * 10);
                if (result.msg == 1) {
                    result.msg = "未中奖，继续努力哦";
                } else {
                    result.msg = "恭喜获得" + result.award + "等奖";
                }
                arr = arr.map(function (item) {
                    if (item.name == _name) {
                        item.amount--;
                        item.awards.push(result.award);
                    }
                    return item;
                })
                fs.writeFile(_fp, JSON.stringify(arr), function (err) {
                    if (err) {
                        throw err;
                    }
                    res.send(result);
                })
            }
        }
    });

});
//比对数据
router.post('/award', function (req, res, next) {
    var _name = req.body.uname;
    var _award = req.body.award;
    var result = {
        "isSuccess": false,
        "msg": ""
    }
    var _fp = path.join(__dirname, '../data/201610Turntable/usersList.json');
    fs.readFile(_fp, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }
        var arr = JSON.parse(data);
        var _arr = arr.filter(function (item) {
            return item.name == _name;
        })
        if (_arr.length == 0) {
            result.msg = "没有此用户";
        } else {
            if (_arr[0].awards[_arr[0].awards.length - 1].toString() != _award) {
                result.msg = "中奖不匹配";
            } else {
                result.isSuccess = true;
                result.msg = "恭喜中奖!";
            }
        }
        res.send(result);
    })
});

module.exports = router;