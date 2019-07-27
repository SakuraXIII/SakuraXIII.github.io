//监测浏览器tab标签页的切换
$(function () {
    //添加页面可见性改变事件，实时监测页面变化
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') {
            document.title = '你要离开了嘛-∑(❍ฺд❍ฺlll) '
        } else {
            document.title = 'Σ(ﾟ∀ﾟﾉ)ﾉ-欢迎吖'
        }
    })

    //一言
    fetch('https://v1.hitokoto.cn')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var hitokoto = document.getElementsByClassName('hitokoto');
            var strong = document.getElementsByTagName('strong')
            for (var i = 0; i < hitokoto.length; i++) {
                hitokoto[i].innerText = data.hitokoto;
                strong[i].innerText = '--' + data.from;
            }

        })
        .catch(function (err) {
            console.error(err);
        })
})

