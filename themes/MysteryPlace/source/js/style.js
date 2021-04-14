/*
 * @Author: Sakura Sun
 * @Date: 2020-09-11 13:50:59
 * @LastEditTime: 2020-09-12 08:34:11
 * @Description:
 */
//监测浏览器tab标签页的切换
$(function () {
  //添加页面可见性改变事件，实时监测页面变化
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState == "hidden") {
      document.title = "你要离开了嘛-∑(❍ฺд❍ฺlll) ";
    } else {
      document.title = "Σ(ﾟ∀ﾟﾉ)ﾉ-欢迎吖";
    }
  });

  //一言
  fetch("https://v1.hitokoto.cn")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var hitokoto = document.getElementsByClassName("hitokoto");
      var strong = document.getElementsByTagName("strong");
      for (var i = 0; i < hitokoto.length; i++) {
        hitokoto[i].innerText = data.hitokoto;
        strong[i].innerText = "--" + data.from;
      }
    })
    .catch(function (err) {
      console.error(err);
    });

  document.querySelector(".menu").addEventListener("click", function () {
    this.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  });

  document.querySelector(".shadow").addEventListener("touchmove", function (e) {
    this.parentElement.classList.remove("open");
    document.documentElement.style.overflow = null;
    //禁止事件冒泡，避免又触发菜单按钮点击事件
    e.stopPropagation();
    e.preventDefault();
  });

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
    live: true, // default
  });
  wow.init();
  $("article:odd").addClass("bounceInRight"); //添加自右向左的出场动画

  // 如果不是移动端则显示live2d和player
  if (window.screen.width < 768) {
    $("#not-mobile").remove("#not-mobile");
  }
  let date = (new Date().getMonth() + 1).toString() + "月" + new Date().getDate().toString() + "日";
  console.log(date);
  if (date === "4月4日") {
    $("html").css("filter", "grayscale(100%)");
    setTimeout(function () {
      $(".hitokoto").text("悼念离我们而去的同胞们");
      $(".hitokoto-text strong").text("-- 博主");
    }, 1000);
  }
});
