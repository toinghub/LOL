(function() {
  //轮播图数据
  var carouselData = [
    {
      image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
    },
    {
      image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
    },
    {
      image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
    },
    {
      image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
    },
    {
      image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
    },
    {
      image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
    },
  ];
  createCarousel("gameCarousel", carouselData);

  var container = $(".game_container");
  
  container.addEventListener("touchstar",function(e) {
    if (container.scrollTop >= 1) {
      // 当滑动位置不在顶部时
      e.stopPropagation();//阻止事件冒泡
    }
  })
})()