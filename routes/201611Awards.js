var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/isSignIn', function(req, res, next) {
    var _p = path.join(__dirname,'../data/201611Awards/isSignIn.json')
    fs.readFile(_p,'utf-8',function(err,data){
        if(err){
            throw err;
        }
        res.send(data);
    })
});

module.exports = router;

