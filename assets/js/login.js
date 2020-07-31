$(function () {
    // 切换登录和注册页面
    $('.link_reg').on('click', function () {
        // console.log(123);
        $('#login_form').hide()
        $('#reg_form').show()

    })
    $('.link_login').on('click', function () {
        $('#login_form').show()
        $('#reg_form').hide()
    })
    // console.log($('#repwd').val())
    // 设置密码验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('#repwd').val();
            if (pwd !== value) {
                return '两次输入不一致'
            }
        }
    })

    // ajax发送请求注册成功后将信息提交到后台并且跳转到登录页面
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('#reg_form')[0].reset()
                $('.link_login').click()
                // location.href = '/index.html'
            }
        })

    })

    // 发送ajax请求请求成功后跳转页面

    $('#login_form').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })
})