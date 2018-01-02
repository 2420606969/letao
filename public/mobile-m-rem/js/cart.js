$(function(){
  
    //获取购物车信息
    getCartProduct();
    //购物车删除
    deleteCartProduct();
    //返回商品详情页
    goBackDeil();
    //选择商品计算总金额
    selectProduct();
    //购物车编辑
    editCartProduct();
    //选择尺码
    selectSize();
    //选择数量
    selectNum();
})

//获取购物车信息函数
function getCartProduct(){
    $.ajax({
        url:'/cart/queryCart',
        success: function(data){
            console.log(data);
            if(data.error){
                window.location.href = 'login.html';
            }else{
                var html=template('cartProductTemp',{rows:data});
                $('#main ul').html(html);
                productCount(data);
            }
        }
    })
}
//计算总金额函数
function productCount(data){
    var sum=0;
    for(i=0;i<data.length;i++){
        sum+=(data[i].price*data[i].num);
        $('.order-text span').html(parseInt(sum));
    }
}
 //购物车删除函数
function deleteCartProduct(){
    $('body').on('click','.btn-delete',function(){
        //获取购物车要删除的订单信息
        var cartId=$(this).data('id');
         $.ajax({
        url:'/cart/deleteCart',
        data:{'id':cartId},
        success: function(data){
            // console.log(data);
            mui.toast('删除成功');
            getCartProduct();
        }
    })
    })
}
//返回商品详情页
function goBackDeil(){
      $('#header a').on('click',function(){
        window.location.href='detail.html?id=1';
    })
}
//选择商品
function selectProduct (){
    $('body').on('click','input',function(){
        var num=$(this).parent().parent().find('.product-num').children().html();
        var price=$(this).parent().parent().find('.product-price').data('price');
        var count=parseInt(num)*parseInt(price);
        var sum=$('.order-text span').html();
        sum=parseInt(sum);
        var checked=$(this).attr('checked');
       if(checked=='true'){
        $(this).attr('checked','false');
        sum-=parseInt(count);
       }else{
        $(this).attr('checked','true');
        sum+=parseInt(count);
       }
       $('.order-text span').html(parseInt(sum));
    })
}
//购物车编辑函数
function editCartProduct() {
    $('body').on('click','.btn-edit',function(){
        var nowsize=$(this).data('nowsize');
        var num=$(this).data('num');
        var prosize=$(this).data('prosize');
        var id=$(this).data('id');
        var size=[];
        var start=prosize.split('-')[0];
        var end=prosize.split('-')[1];
        for(i=start;i<=end;i++){
           size.push(i);
        }
        //将内容包装成模板引擎需要的对象格式
        var product={
            'nowsize':nowsize,
            'num':num,
            'size':size,
            'id':id,         
        }
        var html=template('editProduct',product).replace(/(\r)?\n/g, "");
        var li = $(this).parent().parent()[0];
       mui.confirm(html,'编辑商品',['确定','取消'],function(e){
        if(e.index==0){
            var size=$('.product-size1 span').html();
            var num=$('.product-count1 .num span').html();
            $.ajax({
                url:'/cart/updateCart',
                type:'post',
                data:{'id':id,'size':size,'num':num},
                success:function(data){
                    // console.log(data);
                    mui.swipeoutClose(li);
                    getCartProduct();
                }
            })
        }else{
            console.log('取消');
        }

       })
    })
};

 //选择尺码函数
 function selectSize (){
    $('body').on('tap','.product-size1 span',function(){
        $('.product-size1 span').removeClass('active');
        $(this).addClass('active');
    })
 }
 //选择数量函数
 function selectNum (){
    $('body').on('tap','.product-count1 .reduce',function(){
        var count=$('.product-count1 .num .count').html();
        count--;
        if(count<=0){
            count=0;
        }
        $('.product-count1 .num .count').html(count);
    })
    $('body').on('tap','.product-count1 .num .add',function(){
        var count=$('.product-count1 .num .count').html();
        count++;
        var res=$('.product-count1 span.cv').html();
        if(count>=res){
            count=res;
        }
        $('.product-count1 .num .count').html(count);
    })
 }