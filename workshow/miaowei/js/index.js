// 1，js的分层（功能）：jquery(tools) 组件（UI）应用（app逻辑）mvc(backbone)
// 2，js的规划（管理）：避免全局变量和方法（命名空间，闭包，面向对象），模块化（seaJs，requireJs）

window.onload = function () {
    mv.app.toTip();
    mv.app.topBanner();
    mv.app.tosel();
    mv.app.torun();
};

var mv = {}; //命名空间

mv.tools = {};
//自定义一个方法，通过class值获取到元素所在位置
mv.tools.getByClass = function (oParent, sClass) {
    var aEle = oParent.getElementsByTagName("*");
    var arr = [];

    for (var i = 0, j = aEle.length; i < j; i++) {
        if (aEle[i].className == sClass) {
            arr.push(aEle[i]);
        }
    }
    return arr;
};

mv.ui = {};

//搜索框默认文字显示及隐藏方法
mv.ui.textchange = function (obj, str) {
    //光标移入事件，对象值为str时，置空
    obj.onfocus = function () {
        if (this.value == str) {
            this.value = "";
        }
    }
    //光标移出事件，对象值为空时，置为str
    obj.onblur = function () {
        if (this.value == "") {
            this.value = str;
        }
    }
};

//轮播图片的淡入淡出方法
mv.ui.fadein = function (obj) {
    var value = 0; //透明度
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var ispeed = 5;
        if (value == 100) {
            clearInterval(obj.timer);
        } else {
            value += ispeed;
            obj.style.opacity = value / 100;
            obj.style.filter = 'alpha(opacity=' + value + ')';
        }
    }, 30);
};

mv.ui.fadeout = function (obj) {
    var value = 100; //透明度
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var ispeed = -5;
        if (value == 0) {
            clearInterval(obj.timer);
        } else {
            value += ispeed;
            obj.style.opacity = value / 100;
            obj.style.filter = 'alpha(opacity=' + value + ')';
        }
    }, 30);
};

//滚动广告前后图片位置计算，移动方法
mv.ui.moveleft = function (obj, old, now) {
    console.log(old, now)
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        var ispeed = (now - old) / 10;
        ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);

        if (now == old) {
            clearInterval(obj.timer);
        } else {
            old += ispeed;
            obj.style.left = old + "px";
        }
    }, 30);

}

mv.app = {};

//搜索方法
mv.app.toTip = function () {
    //获取到两个搜索框输入id
    var oText1 = document.getElementById("text1");
    var oText2 = document.getElementById("text2");

    //调用搜索框方法
    mv.ui.textchange(oText1, "Search website");
    mv.ui.textchange(oText2, "Search website");
};

//--------------------banner滚动事件-----------------------
mv.app.topBanner = function () {
    //通过id获得结点
    var oDd = document.getElementById("ad");
    //通过标签名称获取结点上的元素
    var aLi = oDd.getElementsByTagName("li");

    //获取到两个span
    var oprevbg = mv.tools.getByClass(oDd, "prev_bg")[0];
    var onextbg = mv.tools.getByClass(oDd, "next_bg")[0];
    //获取到两个轮播箭头
    var oprev = mv.tools.getByClass(oDd, "prev")[0];
    var onext = mv.tools.getByClass(oDd, "next")[0];

    var inow = 0; //轮播图片的下标
    var timer = setInterval(auto, 3000); //定时器,3秒执行1次

    //正向轮播，用于自动轮播 和 交互点击事件
    function auto() {
        //轮播图片下标到最后一个时，再指向第一个，做一个循环
        if (inow == aLi.length - 1) {
            inow = 0;
        } else {
            inow++;
        }
        //首先所有轮播图片淡出
        //然后下一张轮播图片淡入
        for (var i = 0, j = aLi.length; i < j; i++) {
            mv.ui.fadeout(aLi[i]);
        }
        mv.ui.fadein(aLi[inow]);
    }
    // 反向轮播，用于交互点击事件
    function autoprev() {
        //轮播图片下标到最后一个时，再指向第一个，做一个循环
        if (inow == 0) {
            inow = aLi.length - 1;
        } else {
            inow--;
        }
        //首先所有轮播图片淡出
        //然后下一张轮播图片淡入
        for (var i = 0, j = aLi.length; i < j; i++) {
            mv.ui.fadeout(aLi[i]);
        }
        mv.ui.fadein(aLi[inow]);
    }

    /*
    1，这里用span(oprevbg,onextbg)将轮播分为左右两个区域
    2，用两个a(oprev,onext)标签包裹 左右两个方向箭头
    3，当鼠标移入span区域时，显示a箭头，移除时隐藏
        3.1，span 和 a 和图片li 之间存在层级关系，a需要点击事件，层级最高。
        3.2，span 需要鼠标移入移除事件，层级第二，li层级最低。
        3.3，当鼠标移动到a时，同时触发span的移出事件，出现 a 闪烁出现隐藏，因此 a增加span相同的移入事件
    4，点击a事件使图片切换
        4.1，调用 auto();
        4.2，调研 autoprev(); 
    */

    // 鼠标悬停在元素上事件，显示轮播图的点击图片, 并且停止轮播循环事件
    oprevbg.onmouseover = oprev.onmouseover = function () {
        oprev.style.display = "block";
        clearInterval(timer);
    }
    onextbg.onmouseover = onext.onmouseover = function () {
        onext.style.display = "block";
        clearInterval(timer);
    }
    // 鼠标离开元素事件，隐藏轮播图的点击图片, 并且轮播图片继续自动播放
    oprevbg.onmouseout = function () {
        oprev.style.display = "none";
        timer = setInterval(auto, 3000);
    }
    onextbg.onmouseout = function () {
        onext.style.display = "none";
        timer = setInterval(auto, 3000);
    }
    //点击事件，使图片改变
    oprev.onclick = function () {
        autoprev();
    }
    onext.onclick = function () {
        auto();
    }
};

/* ---------------------下拉选项事件-------------------------
    1，获取到3个dd节点
    2，循环dd节点，每个dd被点击时，显示dd对应的ul
        2.1，点击其中一个dd时，将所有ul先隐藏，再显示对应的ul
        2.2, 点击文档其他区域时，隐藏当前ul
        2.3, function中嵌套function时，this的指向只属于当前function，要使用
             外层this，需要定义变量代替
        2.4，内层function事件引起的事件冒泡，影响到父元素事件，需要cancelBubble
    3, 鼠标滑过选项，高亮
        3.1，循环ul，获取每个ul里面的li
        3.2, 循环li, 增加鼠标滑入，滑出事件，对选项进行高亮
        3.3, 循环中嵌套循环，事件用一个闭包包裹
        3.4, li增加点击事件，替换兄弟元素h2的内容
            3.4.1，h2 + ul > li, h2为li父元素ul的兄弟元素，需要获得ul的结点下标
            3.4.2，内层function事件引起的事件冒泡，影响到父元素事件，需要cancelBubble
*/
mv.app.tosel = function () {
    var osel = document.getElementById("sel1");
    var aDd = osel.getElementsByTagName("dd");
    var aul = osel.getElementsByTagName("ul");
    var ah2 = osel.getElementsByTagName("h2");

    for (var i = 0, j = aDd.length; i < j; i++) {
        aDd[i].index = i;
        aDd[i].onclick = function (ev) {
            var ev = ev || window.event;
            var thisDd = this;

            for (var i = 0, j = aDd.length; i < j; i++) {
                aul[i].style.display = "none";
            }
            aul[this.index].style.display = "block";

            document.onclick = function () {
                aul[thisDd.index].style.display = "none";
            };

            ev.cancelBubble = true;
        }
    }

    for (var i = 0, j = aul.length; i < j; i++) {

        aul[i].index = i;

        (function (ul) {
            var ali = ul.getElementsByTagName("li");

            for (var i = 0, j = ali.length; i < j; i++) {
                ali[i].onmouseover = function () {
                    this.className = "active";
                }
                ali[i].onmouseout = function () {
                    this.className = "";
                }
                ali[i].onclick = function (ev) {

                    var ev = ev | window.event;
                    ah2[this.parentNode.index].innerHTML = this.innerHTML;

                    ev.cancelBubble = true;
                    this.parentNode.style.display = "none";
                }
            }
        })(aul[i]);

    }

};


/* ------------------滚动广告---------------------------
    1，获取广告ul节点，ul下3个li节点，前后滚动箭头a节点
    2，复制ul下的所有li，并追加在ul里面
        2.1，增加原ul的长度，扩大一倍，存放6个li
        2.2，ul的外层设置超出隐藏，只显示正面3个li
    3，点击滚动广告
        3.1，mv.ui.moveleft（）方法，传入li对象，及第一个个li的新旧两个位置
        3.2，ul根据第一个li的位置进行偏移
*/
mv.app.torun = function () {
    var orun = document.getElementById("run1");
    var aul = orun.getElementsByTagName("ul")[0];
    var ali = orun.getElementsByTagName("li");

    var aprev = mv.tools.getByClass(orun, "prev")[0];
    var anext = mv.tools.getByClass(orun, "next")[0];

    var inow = 0;

    aul.innerHTML += aul.innerHTML;
    aul.style.width = ali.length * ali[0].offsetWidth + "px";
    // console.log(ali.length, ali[0].offsetWidth);

    aprev.onclick = function () {
        if (inow == 0) {
            inow = ali.length / 2;
            aul.style.left = -aul.offsetWidth / 2 + "px";
        }
        console.log(aul.style.left);
        mv.ui.moveleft(aul, -inow * ali[0].offsetWidth, -(inow - 1) * ali[0].offsetWidth);
        inow--;
    }
    anext.onclick = function () {
        if (inow == ali.length / 2) {
            inow = 0;
            aul.style.left = 0;
        }
        console.log(aul.style.left);
        mv.ui.moveleft(aul, -inow * ali[0].offsetWidth, -(inow + 1) * ali[0].offsetWidth);
        inow++;

    }
};