// 由于每次发起ajax请求都要手动拼接请求根目录和具体的请求地址
// 即麻烦又难以维护

// 每次利用$.ajax $.get $.post发起请求前,都会先调用ajaxPrefilter这个函数
// 拿到我们调用ajax的配置对象

// 所以利用此可以实现请求地址的拼接操作
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})

