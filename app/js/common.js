/*wlo:Cflower*/
var dialog;
if (!dialog) dialog = {};
var flagPC = true;
dialog = {
    //关闭  document.location.reload()
    closeDiv: function () {
        $("body").css("position", "relative");
        $("#alertInfo").stop(true, true).animate({
            "top": "-100%",
            "opacity": "0"
        }, "fast", function () {
            $("#maskLayer,#alertInfo").remove().hide();
        });
    },
    //
    maskLayer: function () {
        $("#maskLayer,#alertInfo").remove();
        var maskLayer = "<div id='maskLayer'></div>";
        var alertInfo = "<div id='alertInfo'><span class='close'>关闭</span></div>";
        $("body").append(maskLayer, alertInfo);
        $('.wrap').addClass('row');
        $("#maskLayer").height('100%').show();
    },
    // 转换成时间戳
    timestampToTime: function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s
    },
    //显示提示信息框
    showInfo: function (alertHtml) {
        dialog.maskLayer();
        // $("body").css({'position':'fixed','width':'100%'});
        var _winH = $(window).height(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
        var _scrollTop = $(document).scrollTop(); //　　　　　　　　　　　      ├→
        $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
        var _thisDomWidth = $("#alertInfo").outerWidth();
        var _thisDomHeight = $("#alertInfo").outerHeight();
        var topD = parseInt(_scrollTop + (_winH - _thisDomHeight) / 2);
        var mL = parseInt(_thisDomWidth / 2);
        if (_thisDomHeight >= _winH) {
            topD = _scrollTop;
            if (_scrollTop + _thisDomHeight >= $(document).height()) {
                topD = $(document).height() - _thisDomHeight;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topD = (_winH - _thisDomHeight) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("#alertInfo").css({
            "margin-left": "-" + mL + "px"
        }).stop(true, true).animate({
            "top": topD + "px",
            "margin-left": "-" + mL + "px",
            "opacity": "1"
        }, "fast");
    },
    //改变窗口大小时改变弹出层的位置
    alertInfoPo: function () {
        var _winHResize = $(window).height();
        var _scrollTopResize = $(document).scrollTop();
        var _thisDomWidthResize = $("#alertInfo").outerWidth();
        var _thisDomHeightResize = $("#alertInfo").outerHeight();
        var topResize = parseInt(_scrollTopResize + (_winHResize - _thisDomHeightResize) / 2);
        if (topResize >= $("body").height() - _thisDomHeightResize) {
            _scrollTopResize = $("body").height() - _thisDomHeightResize;
            topResize = _scrollTopResize - (_winHResize - _thisDomHeightResize) / 2;
        };
        if (_thisDomHeightResize >= _winHResize) {
            topResize = _scrollTopResize;
            if (_scrollTopResize + _thisDomHeightResize >= $(document).height()) {
                topResize = $(document).height() - _thisDomHeightResize;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topResize = (_winHResize - _thisDomHeightResize) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("html,body").stop(true, true).animate({
            scrollTop: _scrollTopResize
        });
        $("#alertInfo").stop(true, true).animate({
            "top": topResize + "px",
            "margin-left": "-" + (_thisDomWidthResize / 2) + "px"
        })
        $("#maskLayer").height($("body").height());
    },
    //视频弹窗
    alertVideo: function (videoUrl) {
        let sendUrl = videoUrl;

        dialog.showInfo(
            "<div class='pop_warp  popytbVideo'>" +
            "<span class='pop_hero_close'></span>"
            + "<div class='before '>"
            // +"<embed src='"+videoUrl+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque'>"
            + "<iframe border='0' marginwidth='0' framespacing='0' marginheight='0' src='" + sendUrl + "' frameborder='0' noresize='scrolling='no' width='100%' height='100%' vspale='0' id='iframe' name='iframe' allowfullscreen></iframe>" +
            // + '<video src="' + sendUrl + '" muted loop autoplay="autoplay" playsinline="" webkit-playsinline="" x5-playsinline="" controls="controls"></video>' +
            "</div>" +
            "</div>")

        $('.popytbVideo').siblings('.close').hide();
    },
    //图片弹窗
    alertImages: function (imgUrl) {
        dialog.showInfo(
            "<div class='pop_warp pop_warp_img popVideo' id='custom_scrollbar'>" +
            "<div class='before '>" +
            `<img class="imgcove" src="${imgUrl}" alt="">` +
            "</div>" +
            "</div>")
    },
    // UID登录
    alertUidLogin: function () {
        const uidHtml = `
            <a href="https://grayraven.onelink.me/gj4i/eden" class="btn btn_down_link" target="_blank"> https://grayraven.onelink.me/gj4i/eden </a>
            <a href="https://pgrjpdeeplink.onelink.me/hQpR/6d9356f1" target="_blank" class="btn btn_gogame"></a> `;

        dialog.showInfo(`<div class="pop pop_uid_login">
            <div class="borbox">
                ${uidHtml}
            </div>
        </div>`)
    },
    // 登陆
    alertPopLogin: function () {
        var LoginHtml = `
            <a href="https://sengoku-taisen-m.tw/pre/auth.html?authclient=facebook"  class="btn btn_fb_login"></a>
        `;

        dialog.showInfo(`<div class="pop pop-global-logic">
            <div class="borbox pop_login">
                <p>立即登入FB即可答題，免費領取豐厚虛寶和限定稱號，更有Switch大獎等你贏取！</p>
                ${LoginHtml}
            </div>
        </div>`)
    },
    // 武田信玄
    alertHeroXinXuan: function () {
        // cv-open
        let _html = `
                <dl class="hero-pic1">
                    <dt> <img class="imgcove" src="images/page4/pop-hero1.png" /> </dt>
                    <dd> <img class="imgcove" src="images/page4/hero-msg1.png" />  <span class="btn btn-cv-play " data-url="../audio/a1.wav"></span> </dd>
                </dl>
            `;

        dialog.showInfo(`<div class="pop pop-global-bg">

            <div class="borbox pop-hero">
                <span class="pop_hero_close"></span>
                ${_html}
            </div>
        </div>`);

        $('.pop-global-bg').siblings('.close').hide();
    },
    // 武田信长
    alertHeroXinChang: function () {
        // cv-open
        let _html = `
                <dl class="hero-pic2">
                    <dt> <img class="imgcove" src="images/page4/pop-hero2.png" /> </dt>
                    <dd> <img class="imgcove" src="images/page4/hero-msg2.png" />  <span class="btn btn-cv-play " data-url="../audio/a2.wav"></span> </dd>
                </dl>
            `;

        dialog.showInfo(`<div class="pop pop-global-bg">

            <div class="borbox pop-hero">
                <span class="pop_hero_close"></span>
                ${_html}
            </div>
        </div>`);

        $('.pop-global-bg').siblings('.close').hide();
    },
    // 武田长政
    alertHeroChangZheng: function () {
        // cv-open
        let _html = `
                <dl class="hero-pic3">
                    <dt> <img class="imgcove" src="images/page4/pop-hero3.png" /> </dt>
                    <dd> <img class="imgcove" src="images/page4/hero-msg3.png" />  <span class="btn btn-cv-play " data-url="../audio/a3.wav"></span> </dd>
                </dl>
            `;

        dialog.showInfo(`<div class="pop pop-global-bg">

            <div class="borbox pop-hero">
                <span class="pop_hero_close"></span>
                ${_html}
            </div>
        </div>`);

        $('.pop-global-bg').siblings('.close').hide();
    },
};
