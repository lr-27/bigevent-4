$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章类别列表渲染到页面上
    getArtCate()
    function getArtCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                // layer.msg(res.message)
                var htmlStr = template('tlp-cate', res)
                $('tbody').html(htmlStr)

            }
        })
    }
    // 添加文章类别
    var index = null;
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            title: "添加文章分类",
            area: ['500px', '250px'],
            content: $('#tlp-add').html()
        });

    })
    // 这个按钮时动态生成的所以要绑定到body上然后委托
    $('body').on('submit', '#formAddCate', function (e) {
        // return false;
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                layer.close(index)
                getArtCate()

            }
        })

    })
    var indexEdit = null;
    // 点击编辑的按钮可以修改
    $('tbody').on('click', '#form-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: "添加文章分类",
            area: ['500px', '250px'],
            content: $('#tlp-edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取当前数据失败')
                // console.log(res);
                form.val('formEdit', res.data)

            }
        })

    })

    $('body').on('submit', '#formEdit', function (e) {
        // return false;
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                layer.close(indexEdit)
                getArtCate()

            }
        })

    })
    // 点击删除按钮时候删除当前数据
    $('tbody').on('click', '#form-dele', function () {

        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            type: 'get',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg('删除当前数据失败')
                layer.confirm('是否删除当前?', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    layer.close(index);
                    getArtCate()
                });


            }
        })

    })

})