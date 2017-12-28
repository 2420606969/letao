$(function(){
    //初始化mui块的滑动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹    
    });
    //获得左侧分类菜单数据
    getCategoryLeftData();
    //左侧点击
    leftClick();
    //右侧数据渲染,一开始,没有点击的时候,先调用首页
    getCategoryRightData(1);
})
//获得左侧分类菜单数据函数
function getCategoryLeftData(){
    $.ajax ({
        url:'/category/queryTopCategory',
        success: function(data){
            // console.log(data);
            var html=template('categoryLeft',data);
            // console.log(html);
            $('.left ul').html(html);
            $('.left ul li:eq(0)').addClass('active');
        }
    })
}
//左侧点击函数
function leftClick(){
    $('.left ul').on('click','li a',function(){
        var id=$(this).data('id');
        // console.log(id);
        getCategoryRightData(id);
        //选中部分高亮,其他都清除
        $('.left ul li').removeClass('active');
        $(this).parent().addClass('active');
    })
}
//右侧数据渲染函数
function getCategoryRightData(id){
    $.ajax ({
        url:'/category/querySecondCategory',
        data:{id:id},
        success:function(data){
            console.log(data);
            var html=template('categoryRight',data);
            // console.log(html);
            if(data.rows.length){
                $('.right .mui-scroll').html(html);
            }else {
                $('.right .mui-scroll').html('<p>没有当前数据</p>');
            }
        }
    })
}