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
    }).eq(3).click();
};


function newsTabs(tabList, tabBox) {
    var $div_li = $(tabList);
    $div_li.click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);
        $(tabBox).eq(index).show().siblings().hide();
    }).eq(3).click();
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