$(function() {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if ($('[name=oldPwd]').val() === value) {
                return '新密码不能与旧密码相同'
            }
        },
        repwd: function(value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码不同'
            }
        }
    })

    // 监听表单提交
    $('#form-pwd').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('密码修改失败')
                }
                layer.msg('密码修改成功');
                $('.layui-form')[0].reset()
            }
        })
    })

})