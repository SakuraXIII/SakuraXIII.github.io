---
title: exceljs操作Excel（三）
date: 2019-11-09 14:54:00
tags: [nodejs, excel]
category: 笔记
---

## 问题及处理

#### request请求

在最初的代码中，我的执行流程是在读取文件遍历每条信息时就写入对象`table`中，同时立即请求API，将获取的经纬度写入对象中，push进数组`arr`，最后打印数组。

<!--more-->

##### 编码问题

结果发现只要执行文件就会报错，显示请求路径包含为转义的字符，这是URL编码的问题，在浏览器地址栏中输入中文，浏览器会帮我们把中文编码为utf-8。所以这里我们要将每次生成的请求URL进行编码。这里有两种编码函数`encodeURI()`,`encodeURIComponent()`这两个方法有一点区别，这里引用[大佬博客](https://www.jianshu.com/p/67508d824af1)的解释：

> encodeURI()是Javascript中真正用来对URL编码的函数。

> encodeURIComponent()对URL的组成部分（如查询参数、路径等）进行个别编码，而不用于对整个URL进行编码。

> encodeURIComponent比encodeURI编码的范围更大，即 `@ # $ & = : / , ; ? +`，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码>如果只是编码字符串，不和URL有半毛钱关系，那么用escape。当然该方法已经不推荐使用，所以不用深究>> encodeURI用于编码整个URL

> encodeURIComponent用于编码url中的查询参数或路径等（若参数为url,还是相当于参数，用`encodeURIComponent()`）

为了方便，我就用`encodeURI()`编码，于是，这个小问题就解决了。

##### 异步请求

最主要的问题来了。。无论如何，最后输出的数组的每个对象的经纬度都是空的，测试后发现每次都是先输出数组，再输出请求API返回的数据，我才知道request方法是异步操作的，所以就用上了回调函数。

然而，数据还是没有，这个查了很久之后，才发现是数据类型的问题：返回的数据是字符类型，而我是通过`对象.属性`的方式获取的，使用`body=JSON.parse(body)`解析成对象即可。

##### arr.push()

在将对象`table`添加进数组后，打印在控制台，结果发现数组中所有的对象都是相同的。当时错误的代码大致如下：

```javascript
var table = {id: '',lat: '',lng: '',status: ''} //全局变量
//读取文件
workbook.xlsx.readFile(requFile)
  .then(function () {
  var worksheet = workbook.getWorksheet(1); //获取第一个
  worksheetworksheet.eachRow(function (row, rowNumber) {
    if (rowNumber > 773 && rowNumber < 1000) {
      table.id =  worksheet.getCell(`A${rowNumber}`).text.trim()
      table.addr = worksheet.getCell(`B${rowNumber}`).text.trim()
      arr.push(table)}
  });
}
```

一开始不知道原因，做了尝试后，只知道需要在循环内部给对象进行初始化，在全局范围只需要声明一个空的对象。

```javascript
var table = {}workbook.xlsx.readFile(requFile)
  .then(function () {
  var worksheet = workbook.getWorksheet(1); //获取第一个
  worksheetworksheet.eachRow(function (row, rowNumber) {
    table = {id: '',lat: '',lng: '',status: ''}
    if (rowNumber > 773 && rowNumber < 1000) {
      table.id = worksheet.getCell(`A${rowNumber}`).text.trim()
      table.addr = worksheet.getCell(`B${rowNumber}`).text.trim()
      arr.push(table)}
  });
}
```

后来猜想数组中的每个对象其实都是同一个对象，写了一个demo验证了这种猜想，但是不知道原理，只能先用着。后来目标实现后，专门去查了一下，原因是引用数据类型和基本数据类型在内存中的存储方式的不同。这需要专门来介绍。

## 总结

总之，这次为了解决繁琐重复的人工操作而实现的程序对我而言还是相当有挑战的，花了两天三夜的时间，一度怀疑自己的编程能力，想要放弃，但是一想到那上千条数据，不得不继续写下去。也确实意识到在js基础上的一些问题，越深入了解越觉得有意思。