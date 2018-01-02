$(function(){
    //获取用户信息函数
    getUserMessage();
   //退出登录函数
   logout();
})
//获取用户信息函数
function getUserMessage(){
    $.ajax({
        url:'/user/queryUserMessage',
        success: function(data){
            console.log(data);
            if(data.error){
                window.location.href='./login.html';
            }else {
                $('ul .first .userName').html(data.username);
                $('ul .first .userTel span').html(data.mobile);
            }
        }
    })
}
//退出登录函数
function logout(){
    $('#main button').on('click',function(){
        window.location.href='./login.html';
    })
}