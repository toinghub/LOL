(function () {
    var divSwith = $('.menu_switch');
    var ulNav = $('.menu_nav');

    // 切换菜单的显示状态
    function toggleNav(){
        //divSwitch 有类样式 menu_switch--expand，则去掉，没有则加上
        // divSwith.classList 类样式列表
        divSwith.classList.toggle('menu_switch--expand');
        ulNav.classList.toggle('menu_nav--expand')
    }
    divSwith.onclick = toggleNav;

    ulNav.addEventListener("click",function(){
        toggleNav();
    })
})()