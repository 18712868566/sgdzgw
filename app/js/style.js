$(function () {

    // 首屏视频
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    if (isAndroid) {
        $('.homeVideo').html('');
    }

    // 整体框架
    var page = new Swiper('.mySwiper', {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        slidesPerView: "auto",
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        on: {
            init: function (swiper) {
                slide = this.slides.eq(0);
                slide.addClass('ani-slide');
            },
            transitionStart: function () {
                for (i = 0; i < this.slides.length; i++) {
                    slide = this.slides.eq(i);
                    slide.removeClass('ani-slide');
                }
            },
            transitionEnd: function () {
                console.log('this.activeIndex===' + this.activeIndex);
                slide = this.slides.eq(this.activeIndex);

                if (!slide.hasClass('ani-slide')) {
                    // slide.addClass('ani-slide');
                } else {
                    console.log('已有');
                }


            },
            slideChangeTransitionStart: function () {
                console.log(this.activeIndex);
                // argumentsTabs('.swp-nav .btn', page, this.activeIndex);
                $('.swp-nav .after').stop().animate({ 'left': (this.activeIndex * 2.53) + 1.88 + 'rem' }, "88");
                $('.swp-nav .btn').eq(this.activeIndex).addClass('curr').siblings().removeClass('curr');
            },
        },
    });

    // 查看详情 
    $(document).on('click', '.page3 .btn-more,.grid .grid__item ', function (event) {
        event.preventDefault();
        $('.wamfa-pop').show();

        let iNow = $(this).index();

        console.log(iNow);

        anime({
            targets: '.page3 .wamfa-pop',
            duration: 1000,
            easing: 'easeOutExpo',
            opacity: 1,
            begin: function (anime) {
                gallerySwiper.slideTo(iNow, 1000, false);//切换到第一个slide，速度为1秒
            }
        });
    });

    // 查看详情关闭
    $(document).on('click', '.wamfa-pop .wamfa-close', function (event) {
        event.preventDefault();
        console.log('close');
        anime({
            targets: '.page3 .wamfa-pop',
            duration: 1000,
            easing: 'easeOutExpo',
            opacity: 0,
            begin: function (anime) {
                console.log('end');
                setTimeout(() => {
                    $('.wamfa-pop').hide();
                }, 1000);
            }
        });
    });

    // 玩法详情
    var gallerySwiper = new Swiper('#gallery', {
        spaceBetween: 10,
        thumbs: {
            swiper: {
                el: '#thumbs',
                spaceBetween: 85,
                slidesPerView: 'auto',
                watchSlidesVisibility: true,/*避免出现bug*/
            },
        }
    });

    // 缩略图操作
    $(document).on('click', '#thumbs .swiper-slide', function (event) {
        event.preventDefault();
        let iNow = $(this).index();

        gallerySwiper.slideTo(iNow, 1000, false);//切换到第一个slide，速度为1秒
    });


    // 灯笼收缩
    $('.lantern-btn').on('click', function (param) {
        $(this).toggleClass('btn-move-off');
        if ($(this).hasClass('btn-move-off')) {
            $('.fixed-lantern-top').stop().animate({
                right: '-3.4rem'
            }, 500)
        } else {
            $('.fixed-lantern-top').stop().animate({
                right: '0'
            }, 500)
        }
    });

    //  游戏特色
    $('.banner-container li').on('click', function () {
        $(this).addClass('curr').siblings().removeClass('curr');
    });


    // 首页pv
    $('.btn-video-play').on('click', function () {
        let vUrl = $(this).attr('data-url');
        dialog.alertVideo(vUrl)
    });


    argumentsTabs('.swp-nav .btn', page);

    // 公告新闻
    newsTabs('.news-tabs .btn', '.news-box .show');
    // 武将介绍
    heroTabs('.tabs-heronav .hitem', '.tabs-heros .show');

    // 监听url参数跳转到指定模块
    let aUrlData = getUrlData();
    if (aUrlData) {
        let sStr = aUrlData[0].slice(aUrlData[0].length - 1);
        let iStr = Number.parseInt(sStr);

        console.log(iStr);

        page.slideTo(iStr, 800, false);//切换到第一个slide，速度为1秒
        $('.swp-nav .btn').eq(iStr).addClass('curr').siblings().removeClass('curr');
        $('.swp-nav .after').stop().animate({ 'left': (iStr * 2.53) + 1.88 + 'rem' }, "88");
    }



});

function argumentsTabs(tabList, page) {
    var $div_li = $(tabList);
    $div_li.click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);

        page.slideTo(index, 800, false);//切换到第一个slide，速度为1秒
        // 跟随横条
        console.log(index);
        $(this).siblings('.swp-nav .after').stop().animate({ 'left': (index * 2.53) + 1.88 + 'rem' }, "88");
<<<<<<< HEAD
    }).eq(4).click();
=======
    }).eq(0).click();
>>>>>>> 0ff4477814eeb7bf2b933eb5f11fe23485dbe6be
};


function newsTabs(tabList, tabBox) {
    var $div_li = $(tabList);
    $div_li.click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);
        $(tabBox).eq(index).show().siblings().hide();
    }).eq(0).click();
};


function heroTabs(tabList, tabBox) {
    var $div_li = $(tabList);
    $div_li.click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);

        console.log(index);

        // $(tabBox).eq(index).show().siblings().hide();
        $(tabBox).eq(index).addClass('anime').siblings().removeClass('anime');

        $(this).siblings('.move-curr').stop().animate({ 'top': (index * 1.38) - 0.21 + 'rem' }, "88");

    }).eq(0).click();
};


function getUrlData() {
    var url = window.location.href; //获取当前页面的url
    // console.log(url)
    if (url.indexOf('?page') == -1) {
        var arr = url;
        console.log('没找到');
    } else {
        arr = url.split("?")[1].split("&");
        // console.log('找到了');
        var enUrl = decodeURI(url); //解码
        var len = enUrl.length; //获取url的长度值
        var a = enUrl.indexOf("?"); //获取第一次出现？的位置下标
        var b = enUrl.substr(a + 1, len); //截取问号之后的内容
        var c = b.split("&"); //从指定的地方将字符串分割成字符串数组
        var arr = new Array(); //新建一个数组
        for (var i = 0; i < c.length; i++) {
            var d = c[i].split("=")[1]; //从=处将字符串分割成字符串数组,并选择第2个元素
            arr.push(d); //将获取的元素存入到数组中
        }

        return arr;
    }
};

