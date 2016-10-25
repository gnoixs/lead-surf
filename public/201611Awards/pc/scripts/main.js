$(function () {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/201611Awards/isSignIn',
        beforeSend: function (e) {

        },
        complete: function (e) {
            $('body').css('visibility', 'visible');
        }
    }).success(function (data) {
        if (!data['_signIn']) {       //没有报名
            $('#signIn ._range').text("请报名后查看");
            $('#signIn ._name').text(data._name);
            $('#signIn ._money').text("-");
        } else {
            $('.btn').css('background', "url(images/btn-done.png)");
            $('#signIn ._range').text(data._range);
            $('#signIn ._name').text(data._name);
            $('#signIn ._money').text(data._money);
            $('#list').html('');
            var list = data._list.sort(function (a, b) {
                return b._umoney - a._umoney;
            });
            var str = '';
            for (var i = 0; i < list.length; i++) {
                var _str = '<tr>' +
                    '<td>' + (i + 1) + '</td>';
                if (i < 10) {
                    _str += '<td class="yellow">' + list[i]._uname + '</td>' +
                        '<td class="yellow">' + moneyForamt(list[i]._umoney,3) + '</td>';
                } else {
                    _str += '<td class="white">' + list[i]._uname + '</td>' +
                        '<td class="white">' + moneyForamt(list[i]._umoney,3) + '</td>';
                }
                _str += '</tr>';
                str += _str;
            }
            $('#list').html(str);
        }
        $('.bot span').html(data._updateTime);
    }).fail(function (e) {
        alert('请求失败');
    });
    function moneyForamt(str, cutsize) {
        if (typeof str == "number") {
            str += "";
        }
        var str_array = str.split("");
        var size = str_array.length;
        if (size <= 3) {
            return str;
        }
        str_array = str_array.reverse();
        var temp_array = [];
        for (var i = 0; i < size; i++) {
            var s = str_array[i];
            temp_array.push(s);
            if ((i + 1) % cutsize == 0) {
                temp_array.push(",");
            }
        }
        var res = temp_array.reverse().join("");
        res = res.replace(/^,/, "");
        return res;
    }

})