### 总结

1. 了解电商全端项目的背景和项目架构开发模式
2. 能搭建好项目的开发环境
3. 主页的页面布局和样式
4. 主页的轮播图插件使用
5. 主页区域滚动插件的使用
6. 分类页面的布局和样式
7. 分类页面的区域滚动
8. 分类页面的左侧分类数据动态渲染
9. 分类左侧点击渲染对应的右侧分类商品

### 1. 项目准备

#### 1.1 项目介绍

网站是中国主要的运动鞋、皮鞋网络零售网站，聚焦在垂直的鞋及其相关商品领域深耕。
凭借雄厚的资金实力和在电子商务业界的诚信积累，与Nike、Adidas、Converse、NewBalance等国际大牌深度合作。
保证了产品与专卖店同步更新，让您不出家门能最快速度买到当季新款名牌鞋。

#### 1.2 功能介绍

| 平台 | 模块 | 功能 |
|:------:|:-----:|:-----:|
|移动端web端|首页|静态展示页面模块|
|移动端web端|分类|一级分类、二级分类|
|移动端web端|商品|搜索中心、商品列表、商品详情|
|移动端web端|购物车|购物车管理|
|移动端web端|用户|登录、注册、账户管理|
|移动端web端|收货地址|展示、添加、编辑、删除|
|-|-|-|
|pc端后台管理|登录|管理员登录|
|pc端后台管理|用户管理|用户权限管理|
|pc端后台管理|分类管理|一级分类、二级分类管理|
|pc端后台管理|商品管理|商品录入、删除、修改、展示|

#### 1.3 项目架构
| 系统分层 | 使用技术 |
|------:|:----|
|数据层：|MYSQL|
|服务层：|NodeJs(express)|
|前端展示：|mobile web application,pc management system|


#### 1.4 开发模式
- 前后分离：  
 
 + 一种是前端先写一个静态页面，写好后，让后端去套模板。
 静态页面可以本地开发，也无需考虑业务逻辑只需要实现页面即可。
 不足是还需要后端套模板，这些前端代码后端需要浏览一遍，以免出错。

 + 另一种协作模式是，前端直接去写模板。
 这样做的问题在于，前端编写过程中很依赖与后端环境，需要依赖后台提供的接口。
 这种模式可认为是**前后分离模式**，也是**接口化开发**。
 ![前后分离](images/)
 
 + 不管哪一种开发模式都需要对服务层**session**有所了解。

- 了解session
 + 在计算机中，尤其是在网络应用中，称为**会话控制**。
 Session 对象存储特定用户会话所需的属性及配置信息。
 这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，
 而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，
 如果该用户还没有会话，则 Web 服务器将自动创建一个 Session 对象。
 当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。

#### 1.5 环境搭建

> 一般在进行前后分离开发需要配置好本地开发环境，  
> 也就是说需要在本地搭建后台开发环境，node，java，php，等后台编程语言，提供接口支持。

1. 项目后台编程语言是nodejs所有必须安装nodejs软件
2. 项目github主页 [https://github.com/zhousg/letao](https://github.com/zhousg/letao)
3. 可使用git拉取源代码
```text
    git仓库地址 https://github.com/zhousg/letao.git  
    克隆项目：$ git clone https://github.com/zhousg/letao.git  
    进入目录：$ cd letao/
    拉取项目：$ git pull origin master
```
4. 下载源码需要依赖的外部文件，其实就是包。
```text
    npm i  或者  npm install
```
5. 创建数据库直接在数据库中执行建库脚本 **letao初始化.sql**
6. 修改数据库连接
```javascript
    //修改models文件夹里面的db.js中的数据库链接信息
    const pool  = mysql.createPool({
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'letao'
    });
    //a)  host 数据库的ip地址
    //b)  user 数据库的用户名
    //c)  password 数据库密码
    //d)  database 数据库的库名
```
7. 启动项目
```text
    //进入项目目录
    npm start 
```

### 项目依赖

#### 1. Mui介绍

- bootstrap 也是一个ui框架  响应式的ui框架  兼容不同终端 可以适配pc端 也可以适配  移动端
- Mui 是一个ui框架 针对移动端开发的ui框架    只能适配移动端（流式布局）
- 学习官网 http://dev.dcloud.net.cn/mui/
- 官方文档 http://dev.dcloud.net.cn/mui/ui/
- 组件展示 http://dcloud.io/hellomui/
 
**特点**

- 最接近原生APP体验的高性能前端框架
- 轻量
追求性能体验，是我们开始启动MUI项目的首要目标，轻量必然是重要特征；
MUI不依赖任何第三方JS库，压缩后的JS和CSS文件仅有100+K和60+K
     
#### 2. zepto库

1. 用来实现移动端DOM的操作
2. 已经$.ajax 请求后台API数据接口

#### 3. 字体图标 Font Awesome

1. 字体图标库的官网 http://www.fontawesome.com.cn/faicons/

1. 用来实现移动端字体图标

### 4. artTemplate 模板引擎

1. 用来实现数据页面渲染
2. artTemplate 中文文档 https://aui.github.io/art-template/zh-cn/docs/

#### 5. less.js 插件 编译less文件

1. 实现less的编译
2. 中文文档 http://lesscss.cn/

### 2. 主页搭建

1. 添加首页站点图标 在head标签里面加上站点图标的引入

```
<link type="image/x-icon" rel="shortcut icon" href="images/favicon.ico">
```

2. 添加移动端的视口

```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

### 上午复习


1. 准备工作 
    1. 安装node js （服务器需要nodejs启动）  移动web第三天教学资料 》nodejs安装  一路next安装
    2. 安装mysql数据库 phpstudy里面自带数据 
    3. 安装数据库管理工具 电商项目day2 教学资料 》 x32 x64  一路next安装
2. 开启服务器
    1. 开启mysql  启动phpstudy
    2. 管理工具里面连接mysql数据
    3. 数据库管理工具里面初始化数据库  电商项目day02 > 教学资料 》letao_init.sql 把它拖到管理工具里面打开 选中所有代码执行一次
    4. 使用nodejs服务器链接mysql数据库  》 找到letao-master项目文件夹 》 models > db.js 修改数据库连接的用户和密码 改密码为root   password : 'root',
    5. 打开letar-master文件夹所在的黑窗  空白处shift+鼠标右键 或者顶部输入cmd回车
    6. 启动nodejs的服务器 npm start  如果遇到一些问题及时提出
        Port 3000 is already in use  表示3000端口已经被使用(开了多个黑窗)
        npm 不是内部或外部命令 （没有安装nodeJs）  
        注意黑窗打开了不能关闭
    7. 去浏览器访问前端移动web页面和后台管理系统页面
        1. 前端移动web地址 http://localhost:3000/mobile/index.html
        2. 后台管理系统地址 http://localhost:3000/manage/login.html
        3. 前端的用户名itcast 密码 111111
        4. 后台管理系统root 密码123456
3. 搭建我的乐淘
    1. 进入letao-master > public 创建一个m文件夹
    2. 把项目依赖包放到m文件夹里面 
        1. lib 》 教学资料 》 lib文件拷到m文件里面
        2. 把letao-master > pulic > images文件夹拷贝到m里面
    3. 创建我的乐淘需要的文件夹和文件
      1. less文件夹
      2. js文件夹
      3. index.html
    4. 要启动乐淘数据库服务器
        回到letao-master文件夹 打开黑窗（关掉其他黑窗）
        输入npm start  注意黑窗打开了不能关闭
    5. 访问我的乐淘 
        1. 前端移动web地址 http://localhost:3000/m/index.html
        
#### 2.1 主页引包



```
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <!-- 1. 引入mui的css文件  -->
    <link rel="stylesheet" href="lib/mui/css/mui.css">
    <!-- 2. 引入字体图标的css文件 -->
    <link rel="stylesheet" href="lib/fontAwesome/css/font-awesome.css">
    <!-- 3. 引入主页的less文件 -->
    <link rel="stylesheet/less" href="less/index.less">
    <!-- 4. 引入less的编译器文件 -->
    <script src="lib/less/less.js"></script>
</head>

<body>
    <!-- 5. 引入mui的JS文件 -->
    <script src="lib/mui/js/mui.js"></script>
    <!-- 6. 引入模板引擎的JS文件 -->
    <script src="lib/artTemplate/template.js"></script>
    <!-- 7. 引入zepto的Js文件 -->
    <script src="lib/zepto/zepto.js"></script>
    <!-- 8. 引入主页的JS文件 -->
    <script src="js/index.js"></script>
    <script src="js/rem.js"></script>
</body>

</html>

```

#### 2.2 主页基本结构

```
  <!-- 头部区域 -->
    <header id="header">
    </header>
    <!-- 主体内容 -->
    <main id="main">
        <!-- 轮播图区域 -->
        <section id="slide">
        </section>
        <!-- 导航区域 -->
        <nav id="nav">
        </nav>
        <!-- 品牌专区 -->
        <section id="brand-aria">
        </section>
        <!-- 运动专区 -->
        <section id="sport-aria">
        </section>
        <!-- 女士专区 -->
        <section id="women-aria">
        </section>
        <!-- 男士专区 -->
        <section id="man-aria">
        </section>
    </main>
    <!-- 底部区域 -->
    <footer id="footer">
    </footer>

```


#### 2.3 首页头部结构

```html

<!-- 头部区域 -->
<header id="header">
    <h4>乐淘云购</h4>
    <a href="" class="fa-search"></a>
</header>
```

#### 2.4 首页底部结构

```
  <!-- 底部区域 -->
    <footer id="footer">
        <div class="mui-row">
            <a href="index.html" class="mui-col-xs-3 fa-home active">
                <span>首页</span>
            </a>
            <a href="category.html" class="mui-col-xs-3 fa-bars">
                <span>分类</span>
            </a>
            <a href="cart.html" class="mui-col-xs-3 fa-shopping-cart">
                <span>购物车</span>
            </a>
            <a href="my.html" class="mui-col-xs-3 fa-user">
                <span>会员中心</span>
            </a>
        </div>
    </footer>
```

#### 2.5 首页轮播图插件的使用

1. 页面结构

```html
<!-- 轮播图区域 -->
<section id="slide">
    <div class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
            <!--第四个内容区-->
            <div class="mui-slider-item mui-slider-item-duplicate">
                <!-- 具体内容 -->
                <a href="#">
                    <img src="images/banner4.png" alt="">
                </a>
            </div>
            <!--第一个内容区容器-->
            <div class="mui-slider-item mui-active">
                <!-- 具体内容 -->
                <a href="#">
                    <img src="images/banner1.png" alt="">
                </a>
            </div>
            <!--第二个内容区-->
            <div class="mui-slider-item">
                <!-- 具体内容 -->
                <a href="#">
                    <img src="images/banner2.png" alt="">
                </a>
            </div>
            <!--第三个内容区-->
            <div class="mui-slider-item">
                <!-- 具体内容 -->
                <a href="#">
                    <img src="images/banner3.png" alt="">
                </a>
            </div>
            <!--第四个内容区-->
            <div class="mui-slider-item">
                <!-- 具体内容 -->
                <a href="#">
                    <img src="images/banner4.png" alt="">
                </a>
            </div>
            <!--第一个内容区容器-->
            <div class="mui-slider-item mui-slider-item-duplicate">
                <!-- 具体内容 -->
                <a href="#">
                    <img src="images/banner1.png" alt="">
                </a>
            </div>
        </div>
        <div class="mui-slider-indicator">
            <div class="mui-indicator mui-active"></div>
            <div class="mui-indicator"></div>
            <div class="mui-indicator"></div>
            <div class="mui-indicator"></div>
        </div>
    </div>
</section>
```
2. JS初始化 

```js
 //获取轮播图容器
  var slider = mui(".mui-slider");
  // 初始化轮播图
  slider.slider({
      interval: 1000 //自动轮播图的时间
  });
```

3. 注意点
  1. 要添加无缝轮播图需要在 轮播图的图片容器里面 添加一个类名mui-slider-loop     
      
      ```
        <div class="mui-slider-group mui-slider-loop">
      ```
  2. 需要在轮播图的第一张放最后一张
      ```
      <!--第四个内容区-->
      <div class="mui-slider-item mui-slider-item-duplicate">
          <!-- 具体内容 -->
          <a href="#">
              <img src="images/banner4.png" alt="">
          </a>
      </div>
      ```
  3. 需要在轮播图的最后一张放第一张图
      ```
      <!--第一个内容区容器-->
      <div class="mui-slider-item mui-slider-item-duplicate">
          <!-- 具体内容 -->
          <a href="#">
              <img src="images/banner1.png" alt="">
          </a>
      </div>
      ```

#### 2.6 导航区域结构

1. MUI的栅格系统的使用

```

<!-- 品牌专区 -->
<section id="brand-aria">
    <a href="#" class="brand-title">
        <img src="images/title0.png" alt="">
    </a>
    <div class="mui-row brand-body">
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand1.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand2.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand3.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand4.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand5.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand6.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand7.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand8.png" alt=""></a>
        </div>
    </div>
</section>
```


#### 2.7 商品专区的结构

```

<!-- 品牌专区 -->
<section id="brand-aria">
    <a href="#" class="brand-title">
        <img src="images/title0.png" alt="">
    </a>
    <div class="mui-row brand-body">
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand1.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand2.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand3.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand4.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand5.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand6.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand7.png" alt=""></a>
        </div>
        <div class="mui-col-xs-3">
            <a href="#"><img src="images/brand8.png" alt=""></a>
        </div>
    </div>
</section>      
```


#### 2.8 首页区域滚动插件使用

1. 给首页的主体内容容器加上一个滚动的父容器类名

```
  <main id="main" class="mui-scroll-wrapper">
```

2. 给主体容器里面添加一个子容器把所有内容装在一个容器里面

```
  <div class="mui-scroll">
```

3. 调用JS初始化区域滚动插件

```
// 初始化mui的滚动插件
mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});
```

### 3. 分类页面搭建

#### 3.1 分类页面引包

```

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>分类页面</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <!-- 1.引入Mui的CSS文件 -->
    <link rel="stylesheet" href="lib/mui/css/mui.css">
    <!-- 2. 引入字体图标的css文件 -->
    <link rel="stylesheet" href="lib/fontAwesome/css/font-awesome.css">
    <!-- 3. 引入分类页的less文件 -->
    <link rel="stylesheet/less" href="less/category.less">
    <!-- 4. 引入less.js编译器文件 -->
    <script src="lib/less/less.js"></script>
</head>

<body>

    <!-- 5. 引入mui的JS文件 -->
    <script src="lib/mui/js/mui.js"></script>
    <!-- 6. 引入模板引擎JS文件 -->
    <script src="lib/artTemplate/template.js"></script>
    <!-- 7. 引入zepto定制版 -->
    <script src="lib/zepto/zepto.min.js"></script>
    <!-- 8. 引入分类的JS文件 -->
    <script src="js/category.js"></script>
</body>

</html>
```

#### 3.2 分类页面的主体结构


```
<!-- 头部区域 -->
    <header id="header">
        <a href="#" class="fa-arrow-left"></a>
        <form action="#">
            <input type="search" placeholder="请输入要搜索的商品">
        </form>
        <a href="#" class="fa-search"></a>
    </header>
    <main id="category">
        <div class="category-left">
        </div>
        <div class="category-right">
        </div>
    </main>
    <!-- 底部区域 -->
    <footer id="footer">
        <div class="mui-row">
            <a href="index.html" class="mui-col-xs-3 fa-home active">
                <span>首页</span>
            </a>
            <a href="category.html" class="mui-col-xs-3 fa-bars">
                <span>分类</span>
            </a>
            <a href="cart.html" class="mui-col-xs-3 fa-shopping-cart">
                <span>购物车</span>
            </a>
            <a href="my.html" class="mui-col-xs-3 fa-user">
                <span>会员中心</span>
            </a>
        </div>
    </footer>
```

#### 3.3 分类左侧的结构

```
<ul>
    <li class="active"><a href="#">运动馆</a></li>
    <li><a href="#">女士馆</a></li>
    <li><a href="#">男士馆</a></li>
    <li><a href="#">帆布馆</a></li>
    <li><a href="#">户外馆</a></li>
</ul>
```


#### 3.4 分类右侧的结构

```
  <ul class="category-detail mui-row mui-scroll">
      <li class="mui-col-xs-4">
          <a href="#">
              <img src="images/brand1.png" alt="">
              <p>耐克</p>
          </a>
      </li>
      <li class="mui-col-xs-4">
          <a href="#">
              <img src="images/brand2.png" alt="">
              <p>阿迪</p>
          </a>
      </li>
      <li class="mui-col-xs-4">
          <a href="#">
              <img src="images/brand3.png" alt="">
              <p>新百伦</p>
          </a>
      </li>
      <li class="mui-col-xs-4">
          <a href="#">
              <img src="images/brand4.png" alt="">
              <p>哥伦比亚</p>
          </a>
      </li>
      <li class="mui-col-xs-4">
          <a href="#">
              <img src="images/brand5.png" alt="">
              <p>匡威</p>
          </a>
      </li>
  </ul>
```

#### 3.5 分类右侧的滚动区域插件使用

1. 给category-right里面加一个滚动区域的父容器

```
    <div class="mui-scroll-wrapper">
```

2. 给滚动区域的父容器里面添加一个子容器把所有内容装在一个容器里面

```
   <ul class="category-detail mui-row mui-scroll">
```

3. 调用JS初始化区域滚动插件

```
// 初始化mui的滚动插件
mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});
```

#### 3.6 分类左侧的动态数据渲染

1. 请求左侧分类菜单的接口 查看数据
   http://localhost:3000/category/queryTopCategory
2. 使用zepto的$.ajax请求接口的数据

```
  $.ajax({
        url: '/category/queryTopCategory',
        success: function(data) {
        }
    })
```

3. 创建左侧分类菜单的模板

```
 <!-- 定义左侧分类的模板 -->
  <script id="categoryLeftTmp" type="text/html">
      {{each rows as value i}}
      <li data-id="{{value.id}}"><a href="#">{{value.categoryName}}</a></li>
      {{/each}}
  </script>
```


4. 调用模板引擎的方法渲染模板 同时给第一个li添加active类名

```
  $.ajax({
        url: '/category/queryTopCategory',
        success: function(data) {
            var html = template('categoryLeftTmp', data);
            $('.category-left ul').html(html);
            $('.category-left ul li').eq(0).addClass('active');
        }
    })
```

5. 分类左侧的点击样式切换

```
// 左侧分类的点击
  $('.category-left ul').on('click', function(e) {
      $('.category-left ul li').removeClass('active');
      var li = $(e.target.parentNode);
      li.addClass('active');
  });
```

6. 获取当前点击的li的id 通过分类id获取分类的商品列表

    1. 在模板引擎里面绑定左侧分类的时候绑定分类id到data-id属性上

    ```
     <li><a href="#" data-id="{{value.id}}">{{value.categoryName}}</a></li>
    ```

    2. 在JS里面获取当前点击的分类的id 通过分类id获取分类的商品列表
    ```
    // 点击显示右侧的对应的分类商品 把点击的li的分类id传入
    getCategoryRightData(li.data('id'))
    ```

7. 根据分类id获取分类的商品列表
    
    1. 调用分类商品的接口
      http://localhost:3000/category/querySecondCategory?id=1
    2. 使用zepto的$.ajax请求接口根据分类的id获取数据
      ```
      //获取右侧分类的数据 需要传入分类id
      function getCategoryRightData(id) {
          $.ajax({
              url: '/category/querySecondCategory',
              data: { id: id },
              success: function(data) {
                  var html = template('categoryRightTmp', data);
                  if (html) {
                      $('.category-detail').html(html);
                  } else {
                     $('.category-detail').html('<li>没有数据</li>');
                  }
              }
          })
      }

      ```


###  下午总结

1. 引包

    1. 引入mui的css文件
    2. 引入字体图标的css
    3. 引入自己的less文件
    4. 引入less的编译器文件
    5. 引入zepto
    6. 引入mui的JS文件
    7. 引入模板引擎的JS文件
    8. 引入自己的JS文件
2. 写首页的结构
    <header></header>
    <main></main>
    <footer></footer>
3. 制作公共的头部和底部结构和样式
    头部是固定定位在顶部 position:fixed; width:100%
    底部固定在底部 left:0px; bottom:0px position:fixed; width:100%
4. 头部里面使用字体图标
    1. 进入字体图标的网站 http://www.fontawesome.com.cn/faicons/
    2. 搜索需要的图标（只能输入英文）
    3. 把图标的类名复制到标签上
5. 内容区域制作
    1. 轮播图制作
        1. 拷贝轮播图基本结构
        2. 实现自动轮播  使用JS初始化轮播图传入自动轮播的时间
              //获得slider插件对象 调用slider初始化轮播图的方法
            mui('.mui-slider').slider({
                // 1. 开启自动轮播图 毫秒数
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        3. 实现轮播图的无缝轮播
            1. 给轮播图的图片容器添加一个 mui-slider-loop类名
            2. 把第一张图放到最后一张 把最后一张图放到第一张
            3. 同时多加的前后两张图都需要添加 mui-slider-item-duplicate （前后类名都是一样）
6. 导航区域的制作
    1. 要使用mui的栅格系统  .mui-col-xs-4
    2. 设置里面图片宽度高度
7. 广告区域的制作
    1. 使用mui栅格系统 分为左边和右边 左边.mui-col-xs-8 右边.ui-col-xs-4
    2. 左侧广告里面 还分为2列 .mui-col-xs-6
    3. 样式设置图片宽度100%
8. 专区的制作
    1. 使用mui的栅格系统 .mui-col-xs-6
    2. 里面有一根商品容器 容器里面有商品图片 商品文字 商品价格 商品购买按钮
    3. 给商品盒子加一个盒阴影 box-shadow:0px 0px 5px #ccc;
    4. 商品的名字只显示2行 固定为2行的高度 加overflow:hidden;
    5. 按钮使用mui的按钮
9. 区域滚动插件的使用
    1. 给main父容器加一个区域滚动父容器的类名 mui-scroll-wrapper
    2. 在main里面放一个子容器（把所有内容包起来）添加类名 mui-scroll-wrapper
    3. 调用JS初始化区域滚动
      // 初始化mui的区域滚动 传入父容器的选择器
      mui('.mui-scroll-wrapper').scroll({
          scrollY: true, //是否竖向滚动
          scrollX: false, //是否横向滚动
          startX: 0, //初始化时滚动至x
          startY: 0, //初始化时滚动至y
          indicators: false, //是否显示滚动条
          deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
          bounce: true //是否启用回弹
      });
