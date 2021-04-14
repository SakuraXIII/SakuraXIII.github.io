---
title: NodeJs抓取网页信息
date: 2019-10-10 18:00:00
tags: [nodejs, spider]
category: [笔记, 瞎搞]
---

## 前言

最近对NodeJs突然感兴趣。抱着复习一下之前学习的一点内容，靠着面向百度编程的能力，尝试着发送AJAX请求自己写的Json数据，没想到还真弄出来了。然后就想到了爬虫，一直不太明白究竟是怎么爬取数据的，然后这次就打算用NodeJs来试着写一下。

<!-- more -->

先是在网上冲浪看了一些大佬们写的相关的小案例，了解了一下基本的原理。个人的理解是：`通过使用NodeJs创建服务器，访问目标网站，目标服务器将网页数据发送回来，从而将获取到的数据进行处理`。在某位大佬的[博客](https://www.cnblogs.com/rlann/p/7102587.html)中拷贝了一份案例后，开始了解其中实现数据爬取的逻辑方法。

## 起步

以该案例获取图片为例：

- 引入相关包

- ```javascript
  let http=require('http') //http模块
  let fs=require('fs') //文件模块
  let cheerio=require('cheerio') //服务器端的jQuery
  let request=require('request') //用于发送请求等操作
  ```
```

- 通过对目标网站进行GET请求，获取网站响应的数据

- ```javascript
http.get(url,function(res){
//网页数据较大，多次传输 res.on('data',callback)
//对获取到的数据进行拼接，得到完整数据 html+=chunk
})
```

- 对获取的html字符串进行操作，获取图片的url地址等信息

- ```javascript
  //数据全部接收完成后，自动触发res.on('end',callback)
  //在回调中进行其他操作
  res.on('end',function(){
  var $=cheerio.load(html) //解析html
  //通过jQuery操作DOM元素，获取图片地址等信息
  })
  ```
```

- 对图片来源的服务器进行请求，获取图片资源

- ```javascript
//使用request请求图片地址，获取资源
request.head(img_url,function(err,res,body){
if(err){
console.log(err)
}
})
```

- 将获取到的图片资源保存至本地目录

- ```javascript
  request(img_url).pipe(fs.createWriteStream('./images'+img_name+'.jpg'))
  ```
```


```