$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) return '用户昵称不能大于6位'
        }
    })
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()

    })
    initUserInfo()
    // 初始化得到userinfo的值给表单赋值
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return '无法获取用户信息'
                form.val('userInfoForm', res.data)

            }
        })

    }
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // console.log($(this).serialize());
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 当提交更改成功之后重新请求userinfo再把数据库中的东西渲染进去
                window.parent.getInfo()
            }
        })
    })


})