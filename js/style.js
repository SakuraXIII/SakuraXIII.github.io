//监测浏览器tab标签页的切换
$(function() {
  //添加页面可见性改变事件，实时监测页面变化
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState == "hidden") {
      document.title = "你要离开了嘛-∑(❍ฺд❍ฺlll) ";
    } else {
      document.title = "Σ(ﾟ∀ﾟﾉ)ﾉ-欢迎吖";
    }
  });

  //一言
  fetch("https://v1.hitokoto.cn")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var hitokoto = document.getElementsByClassName("hitokoto");
      var strong = document.getElementsByTagName("strong");
      for (var i = 0; i < hitokoto.length; i++) {
        hitokoto[i].innerText = data.hitokoto;
        strong[i].innerText = "--" + data.from;
      }
    })
    .catch(function(err) {
      console.error(err);
    });

  //显示时间
  setInterval(() => {
    var times = new Date();
    var h = times.getHours();
    var m = times.getMinutes();
    var s = times.getSeconds();
    h = h >= 10 ? h : "0" + h;
    m = m >= 10 ? m : "0" + m;
    s = s >= 10 ? s : "0" + s;
    $("#times")
      .html(h + " : " + m + " : " + s)
      .css("font-size", "18px");
  }, 500);

  //控制台输出一张图片
  console.log(`
    /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$ 
   /$$__  $$/$$__  $$/$$__  $$/$$__  $$ 
  |__/  \ $|__/  \ $|__/  \ $|__/  \ $$
    /$$$$$$/ /$$$$$$/  /$$$$$/  /$$$$$/
   /$$____/ /$$____/  |___  $$ |___  $$
  | $$     | $$      /$$  \ $$/$$  \ $$
  | $$$$$$$| $$$$$$$|  $$$$$$|  $$$$$$/
  |________|________/\______/ \______/ 
`);


  // wow.js
  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 50, // default
    mobile: false, // default
    live: true // default
  });
  wow.init();
  $("article:odd").addClass("bounceInRight"); //添加自右向左的出场动画

  // 如果不是移动端则显示live2d和player
  if (window.screen.width > 768) {
    $("#not-mobile").remove('#not-mobile')
  }
});
