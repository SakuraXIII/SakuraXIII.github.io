---
title: Gridea客户端管理博客
date: 2019-09-19 16:59:33
tags: [博客管理工具]
category: 博客
---

### 关于Gridea

在网上查了一下有没有便捷的博客管理工具，然后就在[大佬](https://sspai.com/post/54212)这里发现了`Gridea` 这款工具，花了点时间配置之后发现是真的好用👍。

<!-- more -->

这里有知乎大佬**契卡**的详细配置[教程](https://zhuanlan.zhihu.com/p/71681116)，这是我的配置信息：

![Gridea配置](/images/post/Gridea客户端管理博客/Gridea.png)

关于配置Token和启用评论所需的第三方应用的配置可在个人Github账户下设置中最后一项开发者设置（Developer settings）中找到对应选项。配置之后可以尝试同步一下，看看是否成功同步，如果有问题可以在[Gridea](https://gridea.dev/)文档中查看常见问题，基本都能解决。

配置完成之后，就可以在客户端中进行主题，网站标题，头像等的配置了，这个我觉得很方便，还有标签分类，最重要的就是可以直接在客户端里面写文章了，文章会默认保存在电脑的`document` 中，这里可以在客户端的系统下的源文件夹选项中修改。文章还支持自定义的URL地址，插入封面图等等，一切都是为方便写作而生。如果不喜欢内置的四种主题，可以在官网中找更多的，甚至是自己创作。

### 关于Netlify

在发现Gridea无法对Hexo框架搭建的博客进行管理，又去继续探索了一下，于是发现的Netlify这款插件，这是一款具有CMS（内容管理系统 Content Manage System）后台的插件，这里是来自XUJINKAI 的个人主页的博文：[为Github Pages添加后台管理界面](https://xujinkai.net/posts/netlify-as-github-pages-cms)。

Netlify的优点是在可以为个人的静态博客页面提供一个后台进行管理，只需要在个人的博客页面的/admin/地址下输入正确密码就可以进入。本来我也想用，后来意识到直接在后台修改部署之后，在本地没有备份，如果以后在本地提交就会覆盖掉新的内容，我需要每次都要在后台写完之后再在本地拷贝一份保存，还是很麻烦，于是就放弃了。Netlify也没有提供相关的解决方案，主要还是针对Github Pages的静态服务。

关于使用Netlify服务的相关配置方法在这里：https://www.dnocm.com/articles/beechnut/hexo-netlify-cms/。

