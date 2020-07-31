// 拦截过滤ajax请求 配置对应的请求参数
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})
