var page=1;
//获取上一页搜索到的值
var search=getQueryString('key');
// console.log(search);
$(function() {
    //将上一页获取到的值赋值给input输入框
    $('.secrchForm input').val(search);
    //初始化下拉刷新插件
    mui.init({
        pullRefresh: {
            container: '#pullrefresh', 
            down: { 
                contentdown: "正在下拉刷新", 
                callback: function() {
                   setTimeout(function(){
                    getProductList({
                        proName:search,
                        brandId: 1, 
                        price: 1,
                        num: 1,
                        page: 1, 
                        pageSize: 2,
                    },function(data){
                        var html=template('productListTem',data);
                        $('.productBody .mui-row').html(html);
                        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    });
                   },1000)
                    } 
            },
            up: {
                contentrefresh: "加载中...", 
                contentnomore: '加载完成........',
                callback: function() {
                    setTimeout(function(){
                        page++;
                        getProductList({
                            proName:search,
                            brandId: 1, 
                            price: 1,
                            num: 1,
                            page: page, 
                            pageSize: 2,
                        },function(data){
                            var html=template('productListTem',data);
                            $('.productBody .mui-row').append(html);
                            if(data.data.length<=0){
                                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                            }
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        });
                    },1000)
                }
            }
        }
    });
    // var options={
    //     proName:'鞋',
    //     brandId: 1, 
    //     price: 1,
    //     num: 1,
    //     page: 1, 
    //     pageSize: 6,
    // }
 // 根据搜索页(上一页)传递过来的值渲染页面
    getProductList({
        proName:search,
        brandId: 1, 
        price: 1,
        num: 1,
        page: 1, 
        pageSize: 2,
    },function(data){
        var html=template('productListTem',data);
        $('.productBody .mui-row').append(html);
    });
 //根据本页搜索内容查询数据
  selectProduct();  
 // 根据分类排序
  sortProduct();
  //点击立即购买跳转页面
  linkDetail();
});

   //商品列表函数
   function getProductList (options,callback){
    $.ajax({
     url:'/product/queryProduct',
     data:options,
     success:function(data){
        //  console.log(data);
         if(callback){
            callback(data);
         }
        //  callback&&callback();
     }
    })  
}
//获取url中的参数并且解决中文乱码问题
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}
//根据本页搜索内容查询数据函数
function selectProduct (){
    $('.secrchForm button').on('click',function(){
        var search2=$('.secrchForm input').val().trim();
        if(!search2){
            alert('请输入要搜索的商品');
            return;
        }
        getProductList({
            proName:search2,
            brandId: 1, 
            price: 1,
            num: 1,
            page: 1, 
            pageSize: 2,
        },function(data){
            if(data.data.length<=0){
                $('.productBody .mui-row').html('<p>没有此商品</p>');
                return;
            }
            var html=template('productListTem',data);
            $('.productBody .mui-row').html(html);
        });
    })
}
// 根据分类排序
function sortProduct(){
    $('.productHead .mui-row >div').on('tap',function(){
      $('.productHead .mui-row >div').removeClass('active');
      $(this).addClass('active');
      var sort=$(this).data('sort');
      if(sort==1){
         sort=2;
         $(this).data('sort',2);
         $(this).find('i').removeClass().addClass('fa fa-angle-up');
      }else {
        sort=1;
        $(this).data('sort',1);
        $(this).find('i').removeClass().addClass('fa fa-angle-down');
      }
      var sortType=$(this).data('type');
      if(sortType=='price'){
        getProductList({
            proName: search, //商品名称
            price: sort, //价格排序 1是升序  2是降序
            page: 1, //页码数  第几页商品类别
            pageSize: 6, //页容量 每页的商品条数
        }, function(data) {
            var html=template('productListTem',data);
            $('.productBody .mui-row').html(html);
        });
      }else if(sortType == 'number') {
        getProductList({
            proName: search, //商品名称
            num: sort,//数量排序 1是升序 2降序
            page: 1, //页码数  第几页商品类别
            pageSize: 6, //页容量 每页的商品条数
        }, function(data) {
            var html=template('productListTem',data);
            $('.productBody .mui-row').html(html);
        });
      }
    })
}
//点击立即购买跳转页面
function linkDetail(){
    $('body').on('tap','.product',function(){
        window.location.href='detail.html?id='+$(this).data('id');
    })
}
