
$(function () {
    var layer = layui.layer
    var form = layui.form
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比 1代表是正方形区域 长方形4/3
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnUpperLoad').on('click', function () {

        $('#file').click()

    })

    // 当input发生改变的时候
    $('#file').on('change', function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 将裁剪完成的图片重新渲染用户头像
    // 将图片转换为64位的数据传递
    $('#btnConfirm').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getInfo()
                console.log(res);
            }
        })
    })


})
