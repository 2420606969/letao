$(function(){
    var id=getQueryString('id');
    //获取商品详情
    getProductDetail(id);
    //页面拖动
    refreshPage(id);
    //选择尺码
    selectSize();
    //选择数量
    selectNum();
    //点击加入购物车
    joinCart(id);

})
//接收传过来的id
//获取url中的参数并且解决中文乱码问题
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}
//获取商品详情函数
function getProductDetail (id,callback){
    $.ajax({
        url:'/product/queryProductDetail',
        data:{id:id},
        success:function(data){
        // console.log(data);
        //尺码部分
        var size=[];
        var start=data.size.split('-')[0];
        var end=data.size.split('-')[1];
        for(i=start;i<=end;i++){
            // console.log(i);
            //解析出来第一个是字符串,要转换为数字
            size.push(parseInt(i));
        }
        data.size=size;
        //  console.log(data);
        var html=template('productDetailTem',data);
        $('.product-detail').html(html);
    //轮播图部分
        var first=$('.mui-slider-group').children().first().clone().addClass('mui-slider-item-duplicate');
        var last=$('.mui-slider-group').children().last().clone().addClass('mui-slider-item-duplicate');
        $('.mui-slider-group').append(first);
        $('.mui-slider-group').prepend(last);
        //小圆点部分
        $('.mui-slider-indicator .mui-indicator:eq(0)').addClass('mui-active');
     //初始化轮播图插件
        mui('.mui-slider').slider({
            interval: 1000
        });
        callback&&callback(id);

        }
    })
}
//初始化下拉刷新插件
function refreshPage(id) {
    mui.init({
        pullRefresh: {
            container: '#pullrefresh', 
            down: { 
                contentdown: '下拉刷新效果',
                contentover: '拉动的时候的效果',
                contentrefresh: '松开手的时候正在加载数据的显示文',
                callback: function() {
                        setTimeout(function() {
                            getProductDetail(id, function() {
                                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                            });
                        }, 1000);
                    }
            }
        }
    });
}
 //选择尺码函数
 function selectSize (){
    $('.product-detail').on('tap','.product-size span',function(){
        $('.product-detail .product-size span').removeClass('active');
        $(this).addClass('active');
    })
 }
 //选择数量函数
 function selectNum (){
    $('.product-detail').on('tap','.num .reduce',function(){
        var count=$('.product-detail .num .count').html();
        count--;
        if(count<=0){
            count=0;
        }
        $('.product-detail .num .count').html(count);
    })
    $('.product-detail').on('tap','.product-count .num .add',function(){
        var count=$('.product-detail .num .count').html();
        count++;
        var res=$('.product-count span.cv').html();
        if(count>=res){
            count=res;
        }
        $('.product-detail .num .count').html(count);
    })
 }
  //点击加入购物车
  function joinCart (id){
    $('#footor .btn-cart').on('tap',function(){
        var productSize=$('.product-detail .product-size span.active').html();
        var productNum=$('.product-detail .product-count .num .count').html();
        if(!productSize){
            mui.toast('请添加尺码');
            return;
        };
        if(productNum<=0){
            mui.toast('清添加购买数量');
            return;
        }
        //调用加入购物车api
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
               'productId':id,
               'num':productNum,
               'size':productSize,
            },
            success:function(data){
                // console.log(data);
                if(data.error){
                    window.location.href='login.html';
                }
                if(data.success){
                    mui.confirm('加入购物车成功','温馨提示',['确定','不去'],function(e){
                        if(e.index==0) {
                            window.location.href='cart.html';
                        }else {
                            mui.toast('还差2分钟恢复原价');
                        }
                    })
                }
            }
        })
    })
 }