const { request, response } = require('express');
const express = require('express');

const app = express();

app.get('/home',(request,response)=> {
    //响应一个页面
    response.sendFile(__dirname + '/index.html');
});

app.get('/data',(request,response)=> {
     //防止出现跨域
    //  response.setHeader('Access-Control-Allow-Origin','*');
    response.send('用户数据');
});

app.listen(9000,()=>{
    console.log("9000服务已经启动……");
})

//注意！此时打开的页面是127.0.0.1:9000/home中进行查看