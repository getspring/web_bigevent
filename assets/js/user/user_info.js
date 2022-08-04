$(function () {
    var form = layui.form
    var layer = layui.layer

    // 表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须为1-6个字符'
            }
        }
    })

    // 获取用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 利用layui的方法 把获取到的数据渲染到表单中
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        // 阻止提交按钮的默认行为(清空表单)
        e.preventDefault()
        initUserInfo()
    })

    // 发起更新表单数据的Ajax请求
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')

                // 调用父页面的函数发起Ajax请求, 重新渲染头像和名称
                // 在子页面中调父页面的函数
                window.parent.getUserInfo()
            }
        })
    })
})