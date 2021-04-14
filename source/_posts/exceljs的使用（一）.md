---
title: exceljs操作Excel（一）
date: 2019-11-08 22:36:00
tags: [nodejs, excel]
category: 笔记
---

## 前言

前几天，同学接到一个任务，由于任务量很大，所以也交给我了一部分。目的是将一份Excel工作表中的地点信息通过百度的[坐标拾取系统](http://api.map.baidu.com/lbsapi/getpoint/index.html)获取到经纬度信息，并将对应的地点的编号及其放入另一份文件的工作表中，同时给地点不明确的模糊数据进行标记。

<!-- more -->

当时并没有仔细看过文件就接下来了，等打开看的时候就后悔了。。。好家伙！这数据量可以啊，上千条数据。尝试着处理了11个以后，时间已经过去一个小时，我开始明白这仅凭人工操作太浪费时间了。

`鲁迅先生说过：懒是人类进步的阶梯`

![鲁迅](/images/post/exceljs的使用/luxun.jpeg)

所以，我决定运用网上冲浪的能力，使用nodejs进行面向百度编程，用脚本处理数据。于是就在网上找到了[exceljs](https://github.com/exceljs/exceljs)的插件。

## 申请百度地图API的AK

这次要做的东西需要请求百度地图API，找到[官方文档](http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi)后，需要申请AK，也就是用来验证的个人密钥。

![API地址](/images/post/exceljs的使用/API.png)

申请AK需要登录账号，然后进入控制台，在我的应用中创建一个应用，因为我是用nodejs，所以选择的是服务端，我的目标是地名转换为坐标，所以需要地点检索，其他的就不需要了。每个选项都根据个人所需选择吧

![create](/images/post/exceljs的使用/create.png)

提交之后，就可以在`查看应用`中看到已创建好的应用

![demo](/images/post/exceljs的使用/demo.png)

接下来将AK填入API地址对应字段就可以在代码中调用了。未认证成为百度地图的开发者，每天的额度比较小，并发量允许峰值也比较低，我在测试的时候经常超额，所以认证个人开发者了。

![limit](/images/post/exceljs的使用/limit.png)

认证需要提供姓名，联系方式，证件正反照，还有用途以及不少于100字的具体说明（随便凑字就可以了），还是很好认证的。