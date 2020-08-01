// 拦截过滤ajax请求 配置对应的请求参数
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    options.headers = {
        Authorization: localStorage.getItem('token')
    }
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message !== '身份认证失败') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})
