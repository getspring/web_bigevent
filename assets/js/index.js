$(function () {
    getUserInfo()

    var layer = layui.layer
    // 退出登录功能实现
    $('#btnLogout').on('click', function () {
        layer.confirm('确认是否退出?', { icon: 3, title: '提示' }, function (index) {
            // to 点击退出后清空 token 并跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })



})

// 发起请求用户信息的ajax 
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户信息(头像和名称)
            renderAvatar(res.data)
        },
        // jQuery发ajax complate都会被调取用
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 渲染名称
    // 规则:如果用户有昵称则显示昵称,否则显示用户名
    let name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)
    // 渲染头像
    // 规则:如果有图片头像则显示图片头像,否则显示文字头像
    if (user.user_pic !== null) {
        // 显示图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 显示文字头像
        $('.layui-nav-img').hide()
        // 取出名字的第一个字母
        let alpha = name[0].toUpperCase()
        $('.text-avatar').html(alpha).show()
    }
}