$(function() {
    var form = layui.form

    // 先渲染表单数据
    initUserInfo()

    // 监听表单提交事件
    $('#form-info').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                }
                layer.msg('修改用户信息成功')
                    // 修改之后 渲染修改后的信息
                initUserInfo()
            }
        })
    })








    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // 把获取到的数据渲染到表单中
                form.val('formUserInfo', res.data)
            }
        })
    }
})