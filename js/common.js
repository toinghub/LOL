// 全局通用的一些函数或一开始要执行的全局代码
function $(seletor) {
    return document.querySelector(seletor);
}
function $$(seletor) {
    return document.querySelectorAll(seletor);
}

function width() {
    return document.documentElement.clientWidth;
}
function height() {
    return document.documentElement.clientHeight;
}


// 创建一个轮播图区域
function createCarousel(carouselId, datas) {
    //   获取整个轮播图容器

    // 获取各种dom元素
    var container = document.getElementById(carouselId);
    var carouselList = container.querySelector(".g_carousel-list");
    var indicator = container.querySelector(".g_carousel-indicator");
    var prev = container.querySelector(".g_carousel-prev");
    var next = container.querySelector(".g_carousel-next");

    var curIndex = 0; //当前显示的图片索引

    // 创建轮播图的各种元素

    function createCarouselElements() {
        var listHtml = "";//轮播图列表内部的html
        var indHTML = "";//指示器的内部html
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.link) {
                // 有超链接
                listHtml += `<li>
                <a href="${data.link}" target="_blank">
                    <img src="${data.image}">
                </a>
                </li>`
            } else {
                listHtml += `<li>
                    <img src="${data.image}">
                </li>`
            }
            indHTML += "<li></li>";
            
        }
        carouselList.style.width = `${datas.length}00%`;
        carouselList.innerHTML = listHtml;
        indicator.innerHTML = indHTML;
    }
    createCarouselElements();

    //根据目前的索引，设置正确的状态
    function setStatus() {
        carouselList.style.marginLeft = -curIndex * width() + "px";
        //设置指示器状态
        //取消之前的selected
        var beforeSelected = indicator.querySelector(".selected");
        if (beforeSelected) {
            beforeSelected.classList.remove("selected")
        }
        indicator.children[curIndex].classList.add("selected");
        // 处理之前和之后
        if(prev){
            if(curIndex === 0){
                //目前是第一张图
                prev.classList.add("disabled");//不可用样式
            } else {
                prev.classList.remove("disabled");//不可用样式
            }
        }
        if(next){
            if(curIndex === datas.length - 1){
                //目前是最后一张图
                next.classList.add("disabled");//不可用样式
            } else {
                next.classList.remove("disabled");//不可用样式
            }
        }

    }
    setStatus()

    //去上一个
    function toPrev() {
        if (curIndex === 0) {
            return;
        }
        curIndex --;
        setStatus();
    }

    //去下一个
    function toNext() {
        if (curIndex === datas.length - 1) {
            return;
        }
        curIndex ++;
        setStatus();
    }


    var timer = null;//自动切换到计时器id
    // 开始自动切换
    function start(){
        if (timer) {
            //已经在切换
            return;
        }
        timer = setInterval(function(){
            curIndex ++;
            if (curIndex === datas.length) {
                curIndex = 0;
            }
            setStatus();
        }, 2000);
    }

    //停止自动切换
    function stop(){
        clearInterval(timer);
        timer = null;
    }

    start();

    // 事件
    if (prev) {
        prev.onclick = toPrev;
    }
    if (next) {
        next.onclick = toNext;
    }
    var x ,
        pressTime;
    // 按下事件
    container.addEventListener("touchstart",function (e) {
        x = e.touches[0].clientX;//记录按下横坐标
        stop(); //停止自动播放
        carouselList.style.transition = "none";//去掉过渡效果
        pressTime = Date.now(); //手指按下的事件
        // 监听移动事件
        container.addEventListener("touchmove",function (e) {
            e.stopPropagation();//阻止事件冒泡
            var dis = e.touches[0].clientX - x; //计算拖动的距离
            carouselList.style.marginLeft = -curIndex * width() + dis + "px";
        })
    },false)
    // 放手事件
    container.addEventListener("touchend", function (e) {
        var dis = e.changedTouches[0].clientX - x; //计算拖动的距离
        start();
        carouselList.style.transition = ""; //加上过渡效果
        container.addEventListener("touchmove", null, false) //不再监听
        var duration = Date.now() - pressTime; //滑动的时间
        //300ms内都算快速滑动
        if (duration < 300) {
            if (dis > 20 && curIndex > 0) {
                //300毫秒内快速得向右滑动了至少20px
                toPrev();
            } else if (dis < -20 && curIndex < datas.length - 1 ) {
                toNext();
            } else {
                setStatus();
            }
        } else {
        //切换上下页
            if(dis < - width() / 2 && curIndex < datas.length - 1 ) {
                toNext();
            } else if (dis > width() / 2 && curIndex > 0) {
                toPrev();
            } else {
                setStatus();
            }
        }
        
    },false)
}



// ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }
