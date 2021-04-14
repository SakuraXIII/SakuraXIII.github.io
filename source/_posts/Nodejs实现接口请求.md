---
title: Nodejs实现接口的请求
date: 2019-10-18 17:57:00
tags: [nodejs]
category: [笔记, 瞎搞]
---

## 前言

自成功实现用Nodejs实现小爬虫后，对Nodejs异常感兴趣，其他的都搁置一边了，正巧又碰到在看的一个前端网课的案例接口不能用了，于是乎决定自己实现那个接口。

<!-- more -->

![](/images/post/Nodejs实现接口/8.jpg)

## 开始

### 关于思路

建好文件夹，初始化后，仍然是先在网上查阅一些相关的博客，了解一下实现接口的思路。看了几个博主的简单案例之后，个人对实现的方法的理解是：通过监视指定接口地址的状态，监测到了接口的请求消息，将消息进行处理，再发送对应的响应给目标浏览器，从而实现数据的请求。

### 关于实现

*由于对数据库的使用不太熟悉，再加上只是一个简单的小练习，所以使用JSON文件存储数据，也没有使用express框架，打算熟悉一下原生的语法*

1. 在入口文件中引入相关的`http , fs , url`模块，创建一个服务：

```javascript
let http = require('http');
let fs = require('fs');
let Url = require('url');
http.createServer((req,res)=>{
  // 逻辑实现
})
  .listen(5500,()=>{
  console.log('connect...')
})
```

2. 服务开启后开始监视对服务的请求了，使用`url`模块获取请求的对象的相关信息：

```javascript
var url = Url.parse(req.url, true) 
//解析URL地址，true参数可将数据解析成对象，方便处理
```

3. 能够接收到请求目标的地址，就可以用来判断请求的是哪个功能的接口地址：
```javascript
if (url.pathname === '/getAllInfo' && req.method == 'GET') {
     // some code
}
```
4. 为了程序的可维护性和模块化，可以另创建一个模块用来处理业务逻辑，在入口文件中引入模块。5. 不要忘记CORS跨域问题，创建服务后开头声明好请求头：
```javascript
//设置允许跨域的域名，*代表允许任意域名跨域
res.setHeader("Access-Control-Allow-Origin", "*");
//允许的header类型
res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//跨域允许的请求方式
res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
```
### 关于问题

- 关于文件数据的获取

获取文件数据响应给浏览器时，在业务逻辑模块的router文件中读取到json文件的数据，一开始想用return返回到入口文件，用另一个变量接收，然后打印在控制台，结果发现为`undefine`，经过各种尝试均无用。

后来突然想起来了这个问题就是用回调函数来解决的。后来根据个人猜想加上网上查证得知，读取文件的`readFile()`方法是`异步非阻塞的`，所以入口文件无法接收到数据。可以使用`readFileSync()`方法，这是`同步阻塞的`。

- POST请求- 数据的获取本案例的POST请求实现的功能是将浏览器请求时附带的数据存储到文件中，由于POST请求无法通过URL附带参数获取，所以需要用`res.on('data'，callback)`获取：
```javascript
var str = '';req.on('data', (chunk) => {//当有数据时触发'data'时间str += chunk;})req.on('end', () => {//当数据接收完成，没有数据时，触发'end'事件//在这里实现功能});
```

- 405
在进行功能测试时，发现提交数据后控制台就报错405，连接被重置，在网上也没有找到解决办法，最后试了一下在最后加上`res.end('finish')`，居然就好了。猜测应该是因为TCP连接的机制导致的，浏览器在请求地址时，服务器接收到数据了，却没有给出答复，浏览器误以为没有连接成功，就重置了。

所以每次进行请求时，服务器都要给出响应信息。

- 编码
在检查添加进文件中的数据时，发现中文全部乱码了，以为是没有指定UTF-8编码，加上也没用，在浏览器控制台里检查请求头信息，发现POST发送的数据是以Form Data形式，被编码`(encodeURIComponent)`成了URI，对此不甚了解，在去查了一下，得知需要将URI解码，所以在代码中要把接收的数据解码`str = decodeURIComponent(str)`。
## 总结

最后这个简单的API就完成了，不外乎就是增删查改，顺便放在了服务器上跑着玩。虽然第一次写这个，还没感觉到什么难度，但是也同样遇到了这么多的问题，也是收获不少，重点是要学会面向百度编程（滑稽），以及多看文档，勤加练习，遇到更多的问题，才能有更多的经验。