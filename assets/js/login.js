$(function () {
    // 用登录注册的链接来控制登录|注册款的显示与隐藏
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.login-reg').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.login-reg').hide()
    })

    // 再使用layui模块前，必须先导入模块
    // 注：layui这个对象再导入layui这个库就会自动创建
    var form = layui.form // 导入表单模块
    var layer = layui.layer // 导入弹出层模块

    // 利用form模块定义表单校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repwd: function (value) {
            var pwd = $('.login-reg [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发起用户注册的ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                // 注册成功后，跳转到登录表单（通过模拟点击实现）
                $('#link_login').click()
            }

        })
    })

    // 监听注册表单提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发起登录的ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(), // 直接获取到登录表单中的数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 登录成功后，将服务器返回的 token 密钥存储再 localStorage 便于后面请求有权限的接口
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })
})



