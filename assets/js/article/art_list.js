$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage

    var p = {
        pagenum: 1,	//是	int	页码值
        pagesize: 2,	//是	int	每页显示多少条数据
        cate_id: '',	//否	string	文章分类的 Id
        state: '',	//否	string	文章的状态，可选值有：已发布、草稿
    }
    getArtList()
    // 渲染文章列表
    function getArtList() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tlp-list', res)
                $('tbody').html(htmlStr)
                // var htmlStr2 = template('tlp-select', res)
                // $('[name="cate_id"]').html(htmlStr2)
                // form.render()
                renderPage(res.total)

            }
        })

    }
    initArtCate()
    // 渲染select初始化文章分类
    function initArtCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr2 = template('tlp-select', res)
                $('[name="cate_id"]').html(htmlStr2)
                form.render()
            }
        })
    }
    // 筛选
    $('#artFilter').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('.cate_id').val()
        var state = $('.state').val()
        p.cate_id = cate_id
        p.state = state
        // p{ cate_id, state }=cate_id, state
        getArtList()

    })
    // 分页功能
    function renderPage(total) {
        laypage.render({
            elem: 'page',
            count: total,
            limit: p.pagesize,
            curr: p.pagenum,
            // 点击跳转页面
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                p.pagenum = obj.curr
                //首次不执行
                if (!first) {
                    getArtList()
                    //do something
                }
            }
        })

    }
    // 删除操作
    $('tbody').on('click', '.form-dele', function () {
        var Id = $(this).attr('data-id')
        // console.log(Id);
        $.ajax({
            type: 'get',
            url: '/my/article/delete/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('.form-dele').length == 1 && p.pagenum > 1 && p.pagenum--
                getArtList()
            }
        })


    })




})