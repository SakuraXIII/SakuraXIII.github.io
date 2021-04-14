---
title: exceljs操作Excel（二）
date: 2019-11-09 00:06:00
tags: [nodejs, excel]
category: 笔记
---

## 脚本的实现

### 分析

### 读取目标文件

提取出每条数据的编号和地点，再向百度地图请求指定地点，获取到经纬度，然后写入另一个文件中。所以，需要获取的信息有：编号，地名；请求后要写入的信息有 ：编号，经度，纬度，模糊数据的标记值。

<!--more-->

### 逻辑

遍历读取文件，将关键数据作为一个对象`addr`，遍历每一条数据，添加进一个数组`address`中，遍历数组，调用百度地图API请求经纬度，将获取的信息再存储为一个对象`table`，并添加到另一个数组`arr`中，最后遍历数组，写入文件中。

## 开始

找到 exceljs 这个插件后，想先在各大博客平台看看相关的使用教程，快速上手，结果很不巧，相关的教程很少，大部分都是互相借鉴的。。。参考价值不大，只能去看仓库里的官方文档。

反正不管怎么样，先创建好项目再说，用npm下载好包，导入到项目，直接开始：

```javascript
//终端中初始化项目及下载第三方包
$ npm init -y$ npm i exceljs
//主文件：
const Excel = require('exceljs')const request = require('request')
//创建excel实例对象
var workbook = new Excel.Workbook();
```

定义相关的全局变量：

```javascript
var arr = []; //存储写入文件的信息
var address = []; //存储读取文件的信息
var table = {} //存储数据的对象
```

#### 读取文件：

`workbook.xlsx.readFile(readFile).then(function () { do something })`

```javascript
workbook.xlsx.readFile(readFile)
  .then(function () {
  var worksheet = workbook.getWorksheet(1);
  //获取工作簿中第一个工作表
  //遍历工作表每一行
  worksheet.eachRow(function (row, rowNumber) {
    if (rowNumber > 773 && rowNumber < 1000) {
      //获取当前行的对应列的值
      var id = worksheet.getCell(`A${rowNumber}`).text.trim()
      var place = worksheet.getCell(`B${rowNumber}`).text.trim()
      var addr = {id: id,place: place}
      address.push(addr)
    }
  });
})
```

#### 请求接口：

`request.get(href, function (err, res, body) { do something })`请求接口这一段函数是这个程序实现过程中相当大的一个坑，折腾了我两天时间。这篇文章是说不完了。数据都添加进数组`arr`后，就可以开始遍历写入文件中了。#### 写入文件：`workbook.xlsx.writeFile(wrFile).then(function () { do })`这里实际上是要先读取文件，将文件中的数据写入内存中，然后将要写入的数据添加进去，最后执行写入文件的方法。所以是要在读取文件的函数中写入数组遍历，最后执行写入文件函数

```javascript
workbook.xlsx.readFile(wrFile)
  .then(function () {
  var worksheet = workbook.getWorksheet(1);
  arr.forEach(function (value, index) {
    //addRow 按连续数组添加一行（分配给A，B和C列）
    worksheet.addRow(
      [value.id, value.lat, value.lng, value.status]
    );
  })
  workbook.xlsx.writeFile(wrFile)
    .then(function () {
    console.log('ok');
  })
})
```

---

到这里，程序的大致结构就完成了，但是仍然还有需要注意的几个地方，关系到回调函数的使用以及arr.push方法和对象之间的关系。需要另写一篇笔记记录。