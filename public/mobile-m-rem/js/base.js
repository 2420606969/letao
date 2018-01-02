//底部高亮
    var windowWidth = document.documentElement.clientWidth;
    console.log(windowWidth);
    var htmlfontSize = windowWidth / 10;
    document.querySelector('html').style.fontSize = htmlfontSize + 'px';
    window.addEventListener('resize', function() {
        var windowWidth = document.documentElement.clientWidth;
        console.log(windowWidth);
        var htmlfontSize = windowWidth / 10;
        document.querySelector('html').style.fontSize = htmlfontSize + 'px';
    });