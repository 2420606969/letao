$(function(){
    addHistory();
    selectHistory();
    deleteHistory();
    clearAllHistory();
})
//添加历史记录函数
function addHistory(){
    $('.secrchForm button').on('click',function(){
        var search=$('.secrchForm input').val(); 
        if(!search) {
            alert('请输入你要搜索的商品');
            return;
        }
        var historyData=localStorage.getItem('historyData');
        if(historyData){
            historyData=JSON.parse(historyData);
        }else{
            historyData=[];
        }
        if(historyData.indexOf(search)==-1){
            historyData.push(search);
            localStorage.setItem('historyData',JSON.stringify(historyData));
        }
        selectHistory();
    })
}
//查询函数
function selectHistory (){
    var historyData=localStorage.getItem('historyData');
    if(historyData){
        historyData=JSON.parse(historyData);
    }else {
        historyData=[];
    }
    historyData=historyData.reverse();
    var html=template('sousuo',{'rows':historyData});
    $('.searchHistoryList ul').html(html);
}
//删除函数
function deleteHistory (){
    $('.searchHistoryList ul').on('click','.searchHistoryList ul li a i',function(){
        var value=$(this).parent().data('history');
        // console.log(value);
        var historyData=localStorage.getItem('historyData');
        if(historyData){
            historyData=JSON.parse(historyData);
        }else {
            historyData=[];
        }
        var historyIndex=historyData.indexOf(value+'');
        // console.log(historyIndex);
        historyData.splice(historyIndex,1);
        localStorage.setItem('historyData',JSON.stringify(historyData));
        selectHistory();
    })
}
//清空历史记录
function clearAllHistory(){
    $('.searchHistory span.icon_clear').on('click',function(){
       localStorage.setItem('historyData','');
       selectHistory();
       var search=$('.secrchForm input'); 
       search.val('');
    })
}