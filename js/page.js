var showPage = (function() {
var pageIndex = 0; //当前显示的页面索引
var pages = $$(".page_container .page"); //拿到所有的页面元素
var nextIndex = null; //下一个页码索引

// 设置静止状态的各种样式
function setStaic() {
    nextIndex = null;//静止状态下没有下一个页面
    for (var i = 0; i < pages.length; i ++) {
        var page = pages[i]; //一个页面一个页面的去设置
        // page.style.zIndex = i === pageIndex ? 1 : 10; //三元表达式
        if(i === pageIndex) {
            //这个页面就是目前显示的页面
            page.style.zIndex = 1;
        } else {
            page.style.zIndex = 10;
        }

        // 位置
        page.style.top = (i - pageIndex) * height() +'px';
    }
}


setStaic()


//移动中
// dis移动的偏移量（相对于正确的位置）
function moving(dis) {
    for (var i = 0; i < pages.length; i ++) {
        var page = pages[i]; //一个页面一个页面的去设置
        if(i !== pageIndex) {
           // 位置
           page.style.top = (i - pageIndex) * height() + dis +'px';
        }
    }
    //设置下一个页面
    if (dis > 0 && pageIndex > 0) {
        // 往下在移动，同时，目前不是第一页
        nextIndex = pageIndex - 1;
    } else if (dis < 0 && pageIndex < pages.length - 1) {
        // 往上在移动，同时，目前不是最后一页
        nextIndex = pageIndex + 1;
    } else {
        nextIndex = null;
    }
    
}

// 移动完成
function finishMove() {
    if (nextIndex === null) {
        setStaic();//复位
        return;
    }
    var nextpage = pages[nextIndex];//下一个页面
    nextpage.style.transition = ".5s";//500ms过渡
    nextpage.style.top = 0;

    setTimeout(function(){
        //当前页面变了
        pageIndex = nextIndex;
        // 动画完了
        nextpage.style.transition = '';
        setStaic();
    }, 500)
}

// 事件
var pageContainer = $('.page_container');
function hanhler_box() {
    
}
// touchstart手指按下事件
pageContainer.addEventListener('touchstart',function(e) {
    var y = e.touches[0].clientY;
    function handler (e) {
        var dis = e.touches[0].clientY - y;
        if (Math.abs(dis) < 20 ) {  //防止误触
            dis = 0; //相当于手指没动
        }
        moving(dis);
        // 阻止事件的默认行为
        if (e.cancelable) { //如果事件可以取消
            e.preventDefault() ;//取消事件，阻止默认行为
        }
    }
    // 手指按下，监听移动
    pageContainer.addEventListener("touchmove", handler, {
      passive: false,
    });
},false);
    
// 手指松开，结束移动
pageContainer.addEventListener('touchend',function(){
    function handler (e) {
        var dis = e.touches[0].clientY - y;
        if (Math.abs(dis) < 20 ) {  //防止误触
            dis = 0; //相当于手指没动
        }
        moving(dis);
        // 阻止事件的默认行为
        if (e.cancelable) { //如果事件可以取消
            e.preventDefault() ;//取消事件，阻止默认行为
        }
    }
    finishMove();
    pageContainer.removeEventListener('touchmove',handler);
},false);


//自动切换到某个板块
// index页面索引
function showPage(index) {
    var nextPage = pages[index]; //下一个页面元素
    if (index < pageIndex) {
        //下一个页面在当前页的上面
        nextPage.style.top = -height() + 'px';
    }else if (index > pageIndex) {
        //下一个页面在当前页的下面
        nextPage.style.top = height() + 'px' ;
    }else{
        //下一个页面就是当前页面
        if (pageIndex === 0) {
            //目前是第一个页面
            pageIndex ++;
        } else {
            pageIndex --;
        }
        setStaic(); //重新设置位置
    }
    //强行让浏览器渲染
    nextPage.clientHeight;//读取dom的尺寸和位置，会导致浏览器强行渲染
    nextIndex = index; //设置下一个页面索引
    finishMove();
}
return showPage;
})()