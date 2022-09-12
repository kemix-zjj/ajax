// 服务端代码的准备
//1、引入express
const { response, request } = require('express');
const express = require('express');

//2、创建应用对象
const app = express();

// 3、创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置响应
    response.send('HELLO AJAX GET');
});

app.post('/server',(request,response)=>{
    //设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');

    //设置响应体
    response.send('HELLO AJAX');
});


//同时，post也要改成all(get和post均可以满足)  --> 以满足POST页面中的自定义响应头格式
//all：可以接收任意类型的请求
app.all('/server', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')

    //响应头  --对应POST页面中的自定义响应头 name:atguigu
    //*:表示所有的头部类型均可以使用
    response.setHeader('Access-Control-Allow-Headers','*')

    // 设置响应
    response.send('HELLO AJAX POST');
});


app.all('/json-server', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    //响应头  --对应POST页面中的自定义响应头 name:atguigu
    //*:表示所有的头部类型均可以使用
    response.setHeader('Access-Control-Allow-Headers','*')
    
    
    //响应一个数据
    const data = {
        name:'atguigu'
    }
    //但是send只能接受字符串，不能接受对象，因此需要把对象转换成字符串形式
    let str = JSON.stringify(data);
    // 设置响应
    response.send(str);
});


//专门针对ie缓存问题
app.get('/ie', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    // 设置响应
    response.send('HELLO IE-2');
});

//延时响应
app.all('/delay', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    // response.setHeader('Access-Control-Allow-Headers','*')
    //加个定时器
    setTimeout(() => {
      // 设置响应
       response.send('延时响应-1');
    },3000);
 
});

//jQuery服务
app.all('/jquery-server', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers','*')

    // response.send('Hello jQuery AJAX');
    // 当数据类型为json时，为满足实现，后台数据需要以对象形式存储
    const data = {name:'尚硅谷'};
    response.send(JSON.stringify(data));
});

//axios服务
app.all('/axios-server', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers','*')

    // response.send('Hello jQuery AJAX');
    // 当数据类型为json时，为满足实现，后台数据需要以对象形式存储
    const data = {name:'尚硅谷'};
    response.send(JSON.stringify(data));
});

//fetch服务
app.all('/fetch-server', (request, response) => {
    //设置响应头 --- 设置允许跨域
    // 头的名字：Access-Control-Allow-Origin
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers','*')

    // response.send('Hello jQuery AJAX');
    // 当数据类型为json时，为满足实现，后台数据需要以对象形式存储
    const data = {name:'尚硅谷'};
    response.send(JSON.stringify(data));
});

//jsonp服务
// 实际上是script发送给后端，返回的是函数调用的内容，或者说是js代码
app.all('/jsonp-server',(request,response) => {
    // response.send('console.log("hello jsonp-server")');
    const data = {
        name:'尚硅谷atguigu'
    };
    //将数据转化成字符串
    let str = JSON.stringify(data);
    // end和send的区别，end不会加特殊响应头
    response.end(`handle(${str})`);

});

//用户名检测是否存在
app.all('/check',(request,response) => {
    const data = {
        exist:1,
        msg:'用户名已经存在'
    };
    //将数据转化成字符串
    let str = JSON.stringify(data);
    // end和send的区别，end不会加特殊响应头
    response.end(`handle(${str})`);

});

//jquery-jsnop服务
app.all('/jquery-jsonp',(request, response) => {
    // response.send('console.log("hello jsonp")');
    const data = {
        name:'尚硅谷',
        city: ['北京','上海','深圳']
    };
    //将数据转化为字符串
    let str = JSON.stringify(data);
    //接收 callback 参数
    let cb = request.query.callback;

    //返回结果
    response.end(`${cb}(${str})`);
});

//cors-server
 app.all('/cors-server', (request, response)=>{
     //设置响应头
     response.setHeader("Access-Control-Allow-Origin", "*");
     response.setHeader("Access-Control-Allow-Headers", '*');
     response.setHeader("Access-Control-Allow-Method", '*');
    //此时代表的是仅仅适用于http://127.0.0.1:5500网页
     // response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
     response.send('hello CORS');
 });
  


// 4、监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动，8000端口监听中……");
});