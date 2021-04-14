---
title: pywifi使用
date: 2020-01-30
tags: [python, wifi]
category: [瞎搞, 笔记]
---

### 开始

pywifi的[github](https://github.com/awkman/pywifi/blob/master/DOC.md)地址，[PyPI](https://pypi.org/project/pywifi/)平台地址。这是一个可以用来操纵设备无线网卡的python库，一开始发现这个库的时候想着写个破解wifi的程序，通过暴力破解的方式获取wifi密码。对这个库进一步了解后发现实际是不行的，效率太低了，使用多线程或许可以。

<!--more-->

![](/images/post/pywifi/42.png)

### 使用

将库下载并导入相关需要的库到项目：
```python
$ pip install pywifi
import pywifi
from pywifi import const
import timeimport itertools
```
使用`PyWiFi()`获取设备的无线网卡对象并获取网卡的接口信息：
```python
wifi = pywifi.PyWiFi();
interface = wifi.interface()[0]
# 返回的是一个数组，一般只有一个Wi-Fi interface
```
正式使用前先列出主要的几个方法：
```python
interface.status() # 获取网卡状态，即是否处于连接或其他状态 
interface.scan() # 触发接口扫描APs
interface.scan_results() # 返回扫描后的结果profile对象
interface.add_network_profile(profile) # 添加用于连接的AP配置文件
interface.connect(profile) # 给定的profile连接到指定的AP
interface.disconnect() # 断开当前的连接
```
首先要通过扫描获取设备所处环境周围的WIFI信号，这需要一定的时间，根据设备性能决定，时间越长自然获取的越多：
```python
print(iface.name()) # 这个可以获取接口名字，就是网卡的设备名字
print('开始扫描')iface.scan()time.sleep(5) # 等待5秒后获取结果
print('扫描完成')result = iface.scan_results() # 获取扫描结果，返回的是一个可迭代对象
```
由于返回的结果会出现重复的现象，所以再将其进行去重：
```python
profile = removeRepeat(result)
def removeRepeat(repeat):
  new = []
  for i in repeat:
    if i not in new:
      new.append(i)
      return new
```
最后可以将`profile`进行打印：
```python
def displayAPs(profile):
  print('获取到%d个信号:' % (len(profile)))
  print("%-3s %-19s %-19s %s"           % ('序号', 'ssid', 'MAC地址', '加密方式'))
  for i in profile:
    print("|%-4s|%-20s|%-20s|%s"              % (profile.index(i) + 1, i.ssid, i.bssid,                  'WPA2PSK',
		if i.akm[0] == const.AKM_TYPE_WPA2PSK
		else '其他')
```

![result](/images/post/pywifi/result.png)
