$(function(){
    $('#main .login').on('tap',function(){
        var userName=$('#main .userName').val();
        var userPass=$('#main .userPass').val();
           if(userName&&userPass){
            $.ajax({
                url:'/user/login',
                type:'post',
                data: {'username':userName,'password':userPass},
                success: function(data){
                    // console.log(data);
                    if(data.success){
                        // mui.toast('登录成功',{duration:100000, type:'div'});
                        mui.toast('登录成功');
                        // history.back();
                        history.go(-1);
                        // location.reload();
                    }else {
                        mui.toast(data.message);
                    }
                    
                }
            }) 
           }else {
            mui.toast('请重新输入账号密码');
           }
    })
})