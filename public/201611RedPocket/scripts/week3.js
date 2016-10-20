//适配屏幕
if (window.innerHeight < 811) {
    $('.rotate').css('top', '-22px');
    $('.nov_curtion .nov-center').css('top', '-56px');
}

//拆红包鼠标动作
$(' .nov_curtion .lock .btn').mouseover(function () {
    $('.nov_curtion .lock .hand').hide();
}).mouseout(function () {
    $('.nov_curtion .lock .hand').show();
});
//拆红包后
$(' .nov_curtion .lock .btn').click(function () {
    $.ajax({
        url: '/201611RedPocket/openPocket',
        type: 'get',
        success: function (data) {
            console.log(data);
            if (!!data.state && data.state == 1) {            //表示获取红包成功
                $('.nov_curtion .lock').hide();
                $('.nov_curtion .rotate').show();
                $('.nov_curtion .nov-center').css('background', 'url(images/week3/rp-open-1.png) no-repeat center bottom');
                if (data.type == 0) {
                    console.log($('.first .cong strong'));//.text('2.00')
                    $('.nov_curtion .used').show();
                    $('.used .cong strong').html(data.money);
                } else {
                    $('.nov_curtion .first').show();
                    $('.first .cong strong').html(data.money);
                }
            } else {
                alert('获取红包失败：' + data.msg);            //如果获取失败请返回msg
            }
        },
        fail:function(evt){
            alert(evt);
        }
    });
});

//关闭
$('.close').click(function () {
    $('.nov_curtion').hide();
})

//第一次使用红包
$('.first .btn').click(function () {
    $(this).hide();
    $('.first .choose').show();
})

//使用红包后
$('.used .btn.right').click(function () {
    $(this).hide();
    $('.used .choose').show();
})
//查看详情
$('.used .btn.left').click(function () {
    location.href = 'http://www.example.com/?location=showDetail';
});

//选择平台
$('.choose').bind('click',function(evt){
    switch($(this).attr('_href')){
        case 'll':
            location.href = 'http://www.example.com/?location=lelissc';
            break;
        case 'jl':
            location.href = 'http://www.example.com/?location=jiliffc';
            //location.href = '/';
            break;
        case 'sl':
            location.href = 'http://www.example.com/?location=shunlimmc';
            break;
    }
})
