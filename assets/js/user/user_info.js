$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value < 6) {
                return '昵称长度必须在 1-6 个字符之间'
            }
        }
    })
    initUseInfo()

    function initUseInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res)
                // 调用form.val()快速为表单赋值
                // formUserInfo即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
                // 再次发起ajax 请求。对表格进行重新渲染
                // 服务器返回的数据就是最原始的用户数据
                // 相当于对用户已经修改的资料进行重置
            initUseInfo()
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 对表单进行序列化，可以快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    // window 表示iframe所在的窗口,要调用父页面中的元素
                    // 需要先找到父节点的盒子
                    // 这里的 getUserInfo() 不能重新加载
                window.parent.getUserInfo()
            }
        })
    })
})