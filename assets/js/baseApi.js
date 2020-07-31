// 用来拼接ajax的请求路径
// $.ajaxPrefilter用来拦截和过滤ajax请求 配置每次请求需要的参数
$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})