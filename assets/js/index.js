$(function() {
    // 获取用户信息
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }
            renderAvatar(res.data)
        }
    });
    // 实现退出功能

    $('#exit').on('click', function() {

        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            layer.close(index);
            location.href = 'login.html'
        });
    })
})

// 渲染头像方法
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;' + name);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}