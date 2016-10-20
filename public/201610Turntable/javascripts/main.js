$(function () {
    var times = 0; //是否有抽奖机会
    var slowT = null;
    var quickT = null;
    var award = -1;
    //中奖后的边框闪烁效果
    setInterval(function () {
        $('.toggle0').fadeToggle(50, function () {
            $('.toggle1').fadeToggle(50);
        });
    }, 100);

    //立即抽奖点我


    //抽奖按钮hover
    $('.pointer').mouseover(function () {
        $('.pointer img').attr('src', 'images/pointerhover.png');
        $('.clickme').removeClass('jump').hide();
    }).mouseout(function () {
        $('.pointer img').attr('src', 'images/pointer.png');
        $('.clickme').addClass('jump').show();
    })


    //用户名
    $('#uname').focus(function (evt) {
        if ($(this).val() == '乐赢账号') {
            $(this).val('');
        }
    }).blur(function (evt) {
        if ($(this).val() == '') {
            $(this).val('乐赢账号');
        }
    });

    //提交用户名
    $('#btn-login').bind('click', function (evt) {
        if ($('#uname').val() == '乐赢账号') {
            return;
        } else {
            $.ajax({
                url: '/201610Turntable/userExist',
                type: 'post',
                data: {
                    uname: $('#uname').val()
                },
                dataType: 'json',
                success: function (data) {
                    $('.login').hide();
                    if (!data.isSuccess) { //用户名不存在
                        $('.unmatch').show();
                    } else {
                        var result = parseInt(data.num);
                        if (isNaN(result)) { //转换不了数字
                            alert('数据非法');
                            history.go(-1);
                        } else {
                            times = result;
                            if (result == 0) {    //表示已经用完
                                $('.useup').show();
                            } else {
                                $('.match').show();
                                $('.count').text(result);
                            }
                        }
                    }
                },
                beforeSend: function () {
                    $('#btn-login').hide();
                },
                complete: function () {
                    $('#btn-login').show();
                },
                fail: function (evt) {
                    console.log(evt);
                    alert('请求出错');
                }
            })
        }
    });
    //没有用户返回上一页
    $('.btn-unmatch').bind('click', function (evt) {
        location.href = 'http://www.funwin88.com/';
    });

    //抽奖次数已用完
    $('.btn-useup').bind('click', function (evt) {
        $('.prop').hide();
        $('.curtion').hide();
    });

    //有抽奖次数
    $('.btn-match').bind('click', function (evt) {
        $('.prop').hide();
        $('.curtion').hide();
    });
    //中奖后的确定按钮
    $('.btn-aimed').bind('click', function (evt) {
        $.ajax({
            url: '/201610Turntable/award',
            type: 'post',
            data: {
                uname: $('#uname').val(),
                award: award
            },
            dataType: 'json',
            success: function (data) {
                if (data.isSuccess) { //表示更新数据库成功
                    $('.reward').hide();
                    $('.curtion').hide();
                    clearInterval(slowT);
                    $('.lights').stop(true, true);
                    $('.lights').show();
                    $('.light1').hide();
                    showT = setInterval(slowShake, 400);
                } else {
                    alert('中奖失败:' + data.msg);
                }
            },
            beforeSend: function () {
                $('.btn-aimed').hide();
            },
            complete: function () {
                $('.btn-aimed').show();
            },
            fail: function (evt) {
                alert('请求出错');
                return false;
            }
        })

    })

    function slowShake() {
        $('.light1').fadeToggle(400);
        $('.light2').fadeToggle(400);
    }

    function quickShake() {
        $('.lights').fadeToggle(90);
    }

    slowT = setInterval(slowShake, 400);

    //动画状态
    var bRotate = false;

    //执行效果
    var rotateFn = function (awards, angles, txt) {
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function () {
                clearInterval(quickT);
                slowT = setInterval(slowShake, 400);
                $('.curtion').show();
                if (awards == 1) {
                    $('.reward h2').hide();
                    $('.reward p').hide();
                    $('.reward h1').text(txt).css('top', '150px');
                } else {
                    $('.reward h2').show().text(txt);
                    $('.reward p').show();
                    $('.reward h1').text('恭喜您中奖！获得').css('top', '100px');
                    ;
                }
                $('.reward').show();
                bRotate = !bRotate;
            }
        })
    };

    $('.pointer').click(function () {
        if (bRotate) return; //正在转
        $.ajax({
            url: '/201610Turntable/canplay',
            type: 'post',
            data: {
                uname: $('#uname').val()
            },
            dataType: 'json',
            success: function (data) {
                award = -1;
                if (!data.isSuccess) { //没有抽奖资格(没有在抽奖用户列表中)
                    $('.curtion').show();
                    $('.unmatch').show();
                    return false;
                } else {
                    if (data.num == 0) { //表示机会已经用完了
                        $('.curtion').show();
                        $('.useup').show();
                        return false;
                    } else { //开始抽奖
                        clearInterval(slowT);
                        $('.lights').css('display', 'none');
                        quickT = setInterval(quickShake, 90);
                        var angle = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
                        award = data.award;
                        switch (data.award) {
                            case 0:
                                rotateFn(0, angle[0], 'iPhone 7 Plus (128G)');
                                break;
                            case 1:
                                rotateFn(1, angle[1], '您没有抽中！谢谢参与');
                                break;
                            case 2:
                                rotateFn(2, angle[2], '28元红包');
                                break;
                            case 3:
                                rotateFn(3, angle[3], '88元红包');
                                break;
                            case 4:
                                rotateFn(4, angle[4], '188元红包');
                                break;
                            case 5:
                                rotateFn(5, angle[5], '888元红包');
                                break;
                            case 6:
                                rotateFn(6, angle[6], '乐赢币1枚');
                                break;
                            case 7:
                                rotateFn(7, angle[7], '乐赢币3枚');
                                break;
                            case 8:
                                rotateFn(8, angle[8], '奢华酒店一夜');
                                break;
                            case 9:
                                rotateFn(9, angle[9], 'iPhone蓝牙耳机');
                                break;
                            default:
                                alert('参数出错啦');
                        }
                    }
                }
            },
            fail: function (evt) {
                alert('请求失败');
                console.log(evt);
            }
        })
    });
});