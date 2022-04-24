$(function () {
    $(document).on("click", "#alertInfo .close,.pop-hero .pop_hero_close,.pop_hero_close,.btn_determine", dialog.closeDiv);

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

    // 点击播放音频
    var indexAudio = $('#mp3Btn')[0];

    // hero cv
    $(document).on('click', '.pop-hero .btn-cv-play', function () {
        $(this).toggleClass('cv-open');
        // cv 控制
        indexAudio = $('#mp3Btn')[0];
        indexAudio.src = '';

        var musrc_url = $(this).attr('data-url');

        if ($(this).hasClass('cv-open')) {
            indexAudio.src = musrc_url;
            indexAudio.pause();
            indexAudio.play();
        } else {
            indexAudio = $('#mp3Btn')[0];
            indexAudio.pause();
            indexAudio.src = '';
        }

        // 监听音频结束后 重置播放按钮
        indexAudio.onended = function (param) {
            let oEle = $('.pop-hero .btn-cv-play');
            $('.pop-hero .btn-cv-play').removeClass('cv-open');
        };
    });

    argumentsTabs('.swp-nav .btn', page);
    // 公告新闻
    newsTabs('.news-tabs .btn', '.news-box .show');
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
    }).eq(2).click();
};


function newsTabs(tabList, tabBox) {
    var $div_li = $(tabList);
    $div_li.click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);
        $(tabBox).eq(index).show().siblings().hide();

    }).eq(0).click();
};