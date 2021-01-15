$(function() {

    // 渲染头像的方法
    getUserInfo()

    // 实现退出功能
    $('#exit').on('click', function() {

        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            layer.close(index);
            location.href = 'login.html'
        });
    })
})

// 获取用户信息 
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }
            // 调用渲染用户头像的方法
            renderAvatar(res.data)
        }
    });
}
// 渲染头像方法
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}