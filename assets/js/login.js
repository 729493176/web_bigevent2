$(function() {


    $('#linkToReg').on('click', function() {
        $('.login').hide()
        $('.reg').show()
    })

    $('#linkToLogin').on('click', function() {
        $('.reg').hide()
        $('.login').show()
    })

    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })

    // 注册账号 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }

        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功')
                $('#linkToLogin').click()
            }
        })
    })

    //登录
    $('#form-login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token);
                layer.msg('登陆成功');
                location.href = 'index.html'
            }
        })
    })

})