$(function () {
    var form = layui.form
    var layer = layui.layer
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#chooseCover').on('click', function () {
        $('#file').click()
    })

    // 获取id
    // console.log(location);
    var Id = location.search.split('?')[1]
    // console.log(Id);
    // 标题
    $.ajax({
        type: 'get',
        url: '/my/article/' + Id,
        success: function (res) {
            $('[name=Id]').val(res.data.Id)
            $('[name=title]').val(res.data.title)

            // console.log(res);
            // 渲染分类列表
            initArtCate(res.data.cate_id)
            // 内容
            setTimeout(function () {
                tinyMCE.activeEditor.setContent(res.data.content)
            }, 1000)
        }
    })
    // 类别

    // 封面


    // 渲染select初始化文章分类
    function initArtCate(cate_id) {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                // 在渲染的时候将值传递过来 添加到文章分类的对象中 遍历的时候将分类渲染出来
                res.cate_id = cate_id
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr2 = template('tlp-select', res)
                $('[name="cate_id"]').html(htmlStr2)
                form.render()
            }
        })
    }
    // 渲染上传图片
    $('#file').on('change', function () {
        var file = this.files[0]
        if (file.length === 0) return layer.msg('请上传文件')
        // console.log(files);
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 修改状态
    var state = '已发布'
    $('#save2').on('click', function () {
        state = '草稿'
    })
    $('#form-add').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            // 将 Canvas 画布上的内容，转化为文件对象
            .toBlob(function (blob) {
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                console.log(...fd);
                // ajax一定要放到回调函数里面
                // 因为生成文件是耗时操作，异步，所以必须保证发送ajax的时候图片已经生成，所以必须写到回调函数中
                formAdd(fd)
            })
    })

    function formAdd(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,

            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.document.getElementById('tiaozhuan').click()


            }
        })
    }







})