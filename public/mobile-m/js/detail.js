$(function(){
    var id=getQueryString('id');
    //获取商品详情
    getProductDetail(id);
    //页面拖动
    refreshPage(id);
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