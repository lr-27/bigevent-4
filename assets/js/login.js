$(function () {
    $('#reg').on('click', function () {
        $('#login_form').hide()
        $('#reg_form').show()
    })
    $('#login').on('click', function () {
        $('#login_form').show()
        $('#reg_form').hide()
    })
    // 定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#jypwd').val()
            if (pwd !== value) return '两次输入密码不一致';
        }
    })
})

// 注册提交的时候发送ajax请求提交表单
$('#reg_form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/api/reguser',
        data: $(this).serialize(),
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功')
            $('#reg_form')[0].reset()
            $('#login').click()

        }
    })
})
//  用户登录的时候发送请求到index页面
$('#login_form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('登录成功')
            localStorage.setItem('token', res.token);
            location.href = '/index.html'
        }
    })
})