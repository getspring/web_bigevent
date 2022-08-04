// 由于每次发起ajax请求都要手动拼接请求根目录和具体的请求地址
// 即麻烦又难以维护

// 在每个请求之前被发送ajax之前进行预处理, 设置自定义Ajax选项或修改现有选项

// 每次利用$.ajax $.get $.post发起请求前,都会先调用ajaxPrefilter(预过滤器)这个函数 设置自定义Ajax选项或修改现有选项。
// 拿到我们调用ajax的配置对象

// options 是请求的选项


$.ajaxPrefilter(function (options) {
    // 发起ajax请求时,统一配置请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 请求有权限的接口时,同意设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})

