$(function () {
    getInfo()

})
var layer = layui.layer;
// 定义在全局是因为后面子元素需要使用
function getInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            // layer.msg(res.message)
            renderInfo(res.data)
        }
    })

}

// 渲染用户信息
function renderInfo(user) {
    var uname = user.nickname || user.username
    // if (uname == null) return layer.msg('获取用户信息失败')
    // 渲染名字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    // 如果有图片的话将名字隐藏 没有图片的话显示名字
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').show().attr('src', user.user_pic)

    } else {
        $('.text-avatar').show().html(uname[0].toUpperCase())
        $('.layui-nav-img').hide()
    }



}

// 实现退出功能
$('#btnLogOut').on('click', function () {
    layer.confirm('是否要退出登录', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 删除token 并且跳转到首页
        localStorage.removeItem('token')
        location.href = '/login.html'

        layer.close(index);
    });


})






