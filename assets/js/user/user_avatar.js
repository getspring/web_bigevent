$(function () {

    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 当点击按钮时,模拟点击了文件域
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 为file文件域添加file事件
    $('#file').on('change', function (e) {
        // 获取用户选择的所以图片
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请先选中头像')
        }

        // 获取用户的第一张图片
        var file = e.target.files[0]
        // 将用户的图片转为url赋值给src
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    $('#btnUpload').on('click', function () {
        // 获取头像的base64地址
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 发起上传头像的ajax请求
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改头像失败')
                }
                layer.msg('修改头像成功')
                window.parent.getUserInfo()
            }
        })
    })
})

