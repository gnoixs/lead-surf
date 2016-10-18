//拆红包鼠标动作
$(' .nov_curtion .lock .btn').mouseover(function () {
    $('.nov_curtion .lock .hand').hide();
}).mouseout(function () {
    $('.nov_curtion .lock .hand').show();
});
//拆红包后
$(' .nov_curtion .lock .btn').click(function () {
    /*$.ajax({
     url:'/getRedpocket',
     type:'get',
     success:function(data){
     if(data.state == 1){            //表示获取红包成功
     $('.nov_curtion .lock').hide();
     }else{
     alert('获取红包失败：'+data.msg);  //如果获取失败请返回msg
     }
     }
     })*/
    var t = 0;
    $('.nov_curtion .lock').hide();
    $('.nov_curtion .rotate').show();
    if (t == 0) {
        $('.nov_curtion .used').show();
        $('.nov_curtion .nov-center').css('background', 'url(/src/201611-RedEnvelopes/TheSecondWeek/images/used.png) no-repeat 51px 0');
    } else {
        $('.nov_curtion .first').show();
        $('.nov_curtion .nov-center').css('background', 'url(/src/201611-RedEnvelopes/TheSecondWeek/images/rp-open-1.png) no-repeat center center');
    }
});

//关闭
$('.close').click(function () {
    $('.nov_curtion').hide();
})

//第一次使用红包
$('.first .btn').click(function () {
    //location.href = '/';
    alert('location.href="第一次使用红包"');
})
//使用红包后
$('.used .btn.right').click(function () {
    //location.href = '/';
    alert('location.href="使用红包链接-非第一次使用"');
})
//查看详情
$('.used .btn.left').click(function () {
    //location.href = '/';
    alert('location.href="查看详情链接"');
})