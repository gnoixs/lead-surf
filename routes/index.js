var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/201611activity/TheSecondWeek',function(req,res,next){
    res.render('201611activity/TheSecondWeek',{'Text':'hello'});
});