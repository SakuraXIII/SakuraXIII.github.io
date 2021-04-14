---
title: 关于一段ES6代码的探讨
date: 2020-03-01 13:19:00
category: [笔记]
tags: [js, 理论]
---

### 说在前面的话

疫情不出门，在家也无聊，打开浏览器翻看各个收藏夹，想找点好康的，突然发现了很久以前收藏的 [30s一个代码片段](https://www.30secondsofcode.org/)，选择了JS语言，然后随机给我了一个代码片段<https://www.30secondsofcode.org/js/s/pipe-async-functions/>，仔细一看，顿时惊到了，一行代码就写完了。。完全看不懂。。于是来了兴趣，便研究了起来。

<!--more-->

![](/images/post/关于一段ES6代码的探讨/57.jpg)

这里展出这段代码：

```javascript
const pipeAsyncFunctions =
(...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

// EXAMPLES
const sum = pipeAsyncFunctions(
x => x + 1,
x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
x => x + 3,
async x => (await x) + 4
);
(async () => {
console.log(await sum(5)); // 15 (after one second)
})();
```

#### 分析

根据下面示例显示，1秒后会输出15，试着将5代入 `sum函数` 的几个箭头函数中累加了一下，结果没错，也就是说`pipeAsyncFunctions` 函数能将传进去的几个箭头函数依次执行一遍。再看到 `reduce` 函数，可以确定 `p,f` 两个参数想必就是 `sum` 传入的几个函数。

`reduce` 函数可以将数组中的每一项依次执行指定的回调函数：

```javascript
arr.reduce(callback,[initValue])
// 回调函数有四个参数
callback(preValue,currentValue,?index,?arr)
```

#### 改写代码

为了更好理解这段代码，我在 VS Code 中将这段代码改成了更适合理解的写法：

```javascript
/*
const pipeAsyncFunctions =
(...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
*/
const pipeAsyncFunctions = function(...fns) {
console.log("fns:", fns);
// fns: [ [Function], [Function], [Function], [Function] ]
return function(arg) {
console.log("arg:", arg);
// arg: 5
return fns.reduce(function(p, f, index, arr) {
return p.then(f);
}, Promise.resolve(arg));
};
};

const sum = pipeAsyncFunctions(
x => x + 1,
x => x + 2,
x => x + 3,
x => x + 4
);
(async () => {
console.log(await sum(5)); // 15 (after one second)
})();

```

这里的 `fns` 即为传入的四个函数通过 `三点运算符` 形成的数组，通过打印输出可以证实这一点，同时确定了 `arg,p,f` 的值。之所以 `fns` 不是 `sum(5)` 传入的5，是因为 `sum函数` 实际接收的是 `pipeAsyncFunctions` 返回的函数，即 `function(arg) {...}` 。

```javascript
const sum = pipeAsyncFunctions(
x => x + 1,
x => x + 2,
x => x + 3,
x => x + 4
);
// 等效于

const temp = pipeAsyncFunctions(...fns) //temp接受执行后的返回值
const sum = temp;
/*
const sum = function(arg) {
return fns.reduce(function(p, f) {
return p.then(f);
}, Promise.resolve(arg));
};
*/
```

对于 `reduce` 函数的 `initValue` 值要写成 `Promise.resolve(arg)` ，个人认为是为了将 `arg` 变成 `Promise` 对象，从而在回调函数中使 `p` 使用 `then` 方法执行 `fns` 中的各函数得到结果。所以要在最后使用 ES7的 `async和await` 语法等待异步函数执行完成再输出最终结果。

### 结语

这段代码初一看显得有些难以理解，但是只需要将其进行拆分，转换成 ES5 的写法就会变得很容易理解了，最值得关注的便是 `reduce` 和 `promise` 的使用技巧了。当然，这样难以理解的高(zhuang)级(bi)技巧，平时研究一下原理就好，团队合作的时候就不要写了。好麻烦啊