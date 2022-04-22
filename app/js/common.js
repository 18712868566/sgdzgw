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
    // 活动规则
    alertPop_gz: function () {
        let _html = `<div class="plan-cen"> 
            <div>
                <p class='font-skt'>【活動規則】</p>
                <p>1. 活動期間，軍師可以在「謀略無雙」區域點擊題目答題。若軍師回答正確，該題目對應的獎勵將存入「獎勵背包」內，獎勵禮包碼將在遊戲上市後顯示，屆時軍師可以複製並前往遊戲使用；若軍師回答錯誤，則需要依照提示公開分享頁面，分享成功後方可再次回答該題目。軍師可以點擊「答案查詢」按鈕，前往官方粉絲團查詢關鍵詞來獲取答案。</p>
                 <br />
                <p>2. 活動期間，將按連續3週、每週解鎖4道題目的節奏更新題目，共有12道題目可供軍師作答。4月29日中午12:00解鎖第1、2、3、4題，5月6日中午12:00解鎖第5、6、7、8題，5月13日中午12:00解鎖第9、10、11、12題。</p>
                 <br />
                <p>3. 活動期間，軍師成功答對全部12道題目後，限定稱號獎勵將存入「獎勵背包」內，獎勵禮包碼將在遊戲上市後顯示，屆時軍師可以複製並前往遊戲使用。</p>
                 <br />
                <p>4. 活動結束後，《戰國大戰M》官方將從答對全部12道題目的軍師中，隨機抽選1人獲得「Nintendo Switch（OLED款式）」大獎。中獎結果將另行公佈於《戰國大戰M》官方粉絲團。</p>
                <br />
                <br />
                <p>【活動時間】</p>
                <p>即日起至《戰國大戰M》上市前一日23:59為止（詳細上市日期請留意《戰國大戰M》官方粉絲團）。</p>
                <br />
                <br />
                <p>【抽選獎勵】</p>
                 <br />
                <p>1. 「7-ELEVEN商品卡 1000元」：官方從答對第1、2、3、4題的軍師中隨機抽選3人獲得，5月6日開獎。</p>
                 <br />
                <p>2. 「德國ankale便攜式隨行杯果汁機」：官方從答對第5、6、7、8題的軍師中隨機抽選5人獲得，5月13日開獎。</p>
                 <br />
                <p>3. 「MyCard 1000點」：官方從答對第9、10、11、12題的軍師中隨機抽選3人獲得，5月20日開獎。</p>
                 <br />
                <p>4. 「Nintendo Switch（OLED款式）」：官方從答對全部12道題目的軍師中隨機抽選1人獲得，遊戲上市後擇日開獎。</p>
                 <br />
                <p>所有中獎軍師將在獎勵背包收到中獎憑證，請在官方開獎後及時查看背包。</p>
                 <br />
                <br />
                <br />
                <p>【注意事項】</p>
                <br />
                <p>1. 活動期間，軍師獲得的所有獎勵將存入「獎勵背包」內，獎勵對應的禮包碼序號將在遊戲上市後顯示。</p>
                 <br />
                <p>2. 每個遊戲帳號至多可兌換一次相同題目的禮包碼。</p>
                 <br />
                <p>3. 所有禮包碼有效期截至2022年12月31日23:59，請軍師及時使用。</p>
                 <br />
                <p>4. 禮包碼不得出售或轉換現金。若因軍師個人原因造成禮包碼遺失、過期、無法使用等問題，恕不補發。</p>
                 <br />
                <p>5. 活動結束後，軍師將無法在該頁面提交答案，但在頁面關閉前仍可透過「獎勵背包」查看並使用獎勵。頁面關閉時間將另行通知，還請軍師留意《戰國大戰M》官方粉絲團。</p>
                 <br />
                <p>6. 實體獎項中獎者需在官方公佈結果後7個工作日內（不包括公佈當日）主動私訊《戰國大戰M》官方粉絲團，逾期則視為自動放棄。</p>
                 <br />
                <p>7. 由於部分實體獎項涉及稅務需求，實體獎項中獎者需主動私訊《戰國大戰M》官方粉絲團並提供聯繫資料，中獎者須填冩得獎確認單，提供資料並填寫完畢得獎確認單方可領取獎項。需要自中獎者以私訊方式聯繫《戰國大戰M》官方粉絲團後31個工作日內(不包括聯繫當日)配合完成申請作業，若逾時未完成申請作業或者提供不實與不完整的資料，導致無法確認得獎者身份或獎品無法寄出，視同放棄得獎資格。</p>
                 <br />
                <p>8. 如使用不正當手段參與事前登錄獲取活動獎勵，官方將有權取消該用戶獲取獎勵資格並追究責任。</p>
                 <br />
                <p>9. 活動期間如有任何未盡事宜，主辦單位保留變更或終止本活動之決定權，相關變更內容將不定期公告與官方Facebook粉絲團。本公司保留本活動一切最終解釋權。</p>
                 <br />
            </div>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-logic">
            <div class="borbox pop-hdgz">
                ${_html}
            </div>
        </div>`);

        $(".pop-hdgz .plan-cen").mCustomScrollbar();
    },
    // 我的背包
    alertPop_mylott: function (data) {
        // let _html = `<div class="plan-cen"> 
        //     <dl class='dl_lists'>
        //         <dd> <b class="cms-lott-icon"></b> <span class="code" id='dum1'>XDF3FXCV</span> </dd>
        //         <i class='copyele'>COPY</i>
        //     </dl>
        // </div>`;

        let _htmlInner = '';
        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            _htmlInner += ` 
            <dl class='dl_lists'>
                <dd> <b class="cms-lott-icon"><img class="imgcove" src="../images/page2/${data[i].gift_id}.png" /></b> <span class="code" id='dum${i + 1}'>${data[i].gift_code}</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
        `;
        }

        let _html = `<div class="plan-cen">${_htmlInner}</div>`;


        dialog.showInfo(`<div class="pop pop-global-logic">
            <div class="borbox pop-plan-mylott">
                ${_html}
            </div>
        </div>`);

        $(".pop-plan-mylott .plan-cen").mCustomScrollbar();
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
    // 协议
    alertXy: function () {
        var gzHtml = ` 
            <div class="plan-cen">
                <p>
                    迪諾遊戲有限公司「個人資料暨隱私權保護政策」聲明：
                </p>
                <p>
                迪諾遊戲有限公司（以下簡稱迪諾遊戲）為保障您個人資料之安全性，特針對您個人的隱私權擬定「個人資料暨隱私權保護政策」聲明（Privacy Policy，下簡稱隱私權政策），讓您瞭解迪諾遊戲對於您的隱私權之尊重與保護，並告訴您有關您個人資料之相關資訊。 本政策讓您瞭解迪諾遊戲在蒐集您的個人資料時：<br/><br/>· 1. 本公司的名稱。<br/><br/>· 2. 蒐集之目的。<br/><br/>· 3. 個人資料之類別。<br/><br/>· 4. 個人資料利用之期間、地區、對象及方式。<br/><br/>· 5. 您得行使之權利及方式。<br/><br/>· 6. 若您無法提供完整的個人資料時，不提供將對您權益之影響。<br/><br/>· 7. 個人資料的安全維護<br/><br/>請您詳細閱讀迪諾遊戲「隱私權政策」<br/><br/>一、適用範圍<br/><br/>迪諾遊戲「隱私權政策」適用於您在遊戲內與其所附屬之網站活動時，所涉及的個人資料蒐集、處理、利用、國際傳遞以及保護措施。但不適用於經迪諾遊戲網站而連結至第三人經營的網站或網頁。<br/><br/>二、資料蒐集之目的及類別<br/><br/>根據迪諾遊戲所提供不同服務目的，迪諾遊戲可能蒐集您的個人資料類別及情形如下：<br/><br/>· （一）進行遊戲<br/><br/>當您申請進入遊戲時，迪諾遊戲將蒐集您的個人資料，包括姓名、暱稱、身份證字號、電話、電子信箱等相關必要資料，成為會員後，您將會獲得一個會員的帳號與密碼，並由本組帳號、密碼登入使用會員的各項服務。<br/><br/>迪諾遊戲亦會蒐集您的電腦硬體、軟件和行動電話裝置的資料。包括您的IP位置、瀏覽器類型、登入時間以及網站地址等必要資訊。迪諾遊戲會利用此等資料協助維持遊戲運作和服務品質。<br/><br/>· （二）線上交易<br/><br/>如您於遊戲中使用線上交易服務，將會依照你提出的線上交易形態，蒐集您所填寫的訂單相關資料，以確保您完成付款、儲值等消費服務。<br/><br/>· （三）線上活動<br/><br/>您若因參加迪諾遊戲舉辦之線上活動或網路調查時，關於您個人資料將直接由會員資料庫提供進行核對。惟若該項活動仍需您配合補充相關資料時，請詳細登錄所需之資料。惟該此補充資料，亦一併受到隱私權政策之保護。<br/><br/>· （四）瀏覽網頁<br/><br/>當您於迪諾遊戲站內或其附屬網站中瀏覽或查詢時，迪諾遊戲伺服器將自動紀錄您使用連線之IP位置、時間及瀏覽相關記錄。這些資料僅供作流量統計分析及網路服務優化，以便於改善迪諾遊戲的服務品質，這些資料僅作為總量上的分析，不會和特定個人相連繫。<br/><br/>· （五）其他<br/><br/>除了您直接提供的個人資料之外，您也可能在迪諾遊戲合作廠商處主動提供個人資料，並在您同意或為履行契約目的前提下，將您的個人資料提供給迪諾遊戲。這些資料只會在您同意或為履行契約的服務範圍內利用及處理，不會用於其他用途。<br/><br/>三、資料利用之期間、地區、對象及方式<br/><br/>· （一）利用期間<br/><br/>除法令另有規定者外，將於遊戲內與其所附屬網站服務完畢或至您提出停止使用之請求為止。<br/><br/>· （二）利用地區<br/><br/>台灣地區及提供迪諾遊戲與其所附屬網站服務之地區及其他合作廠商設立所在地。<br/><br/>· （三）利用對象<br/><br/>除法令另有規定者外，將僅供你同意之服務目的及迪諾遊戲內部在相關連之範圍內使用，不會任意將您提供的個人資料轉供其他第三人或移作其他目的使用。但基於履行契約目的，將提供相關資料予合作廠商，以完成履行契約義務。<br/><br/>· （四）利用方式<br/><br/>o 1.會員資料<br/><br/>您在執行遊戲服務時，迪諾遊戲將會自動蒐集您使用設備之相關資訊以及購買消費、服務記錄、累計金額、資訊傳送等，並作為分析您個人遊戲習慣及消費行為，以作為將來提供會員所需之詳盡資料以及作為設計會員活動、遊戲內容優化時之依據。<br/><br/>o 2.線上交易<br/><br/>如您選擇使用線上交易服務，將會依照你提出的線上交易形態，蒐集您所填寫的訂單相關資料，以確保您完成付款、儲值或物流等消費服務。<br/><br/>o 3.線上活動及調查<br/><br/>您若因參加迪諾遊戲舉辦之線上活動或網路調查所留下的個人資料，僅供該次活動或調查使用。這些資料將於活動或調查結束後銷毀。<br/><br/>o 4.統計與分析<br/><br/>迪諾遊戲針對您申請遊戲帳號時所取得的資料，以及站內瀏覽時伺服器所產生的紀錄，將不定期進行總體會員行為分析與統計，不會針對個人行為進行分析。<br/><br/>四、您得行使的權利及方式<br/><br/>· (一)您就您的個人資料得向迪諾遊戲以書面請求行使以下權利：<br/><br/>o 1.查詢或請求閱覽。<br/><br/>o 2.請求製給複製本。<br/><br/>o 3.請求補充或更正。<br/><br/>o 4.請求停止蒐集、處理或利用。<br/><br/>o 5.請求刪除。<br/><br/>· (二)權利限制<br/><br/>以上權利，若因您不符合迪諾遊戲申請程序或法令另有規定時，將會受到限制。<br/><br/>· (三)酌收費用<br/><br/>若您就您的個人資料向迪諾遊戲查詢、請求閱覽個人資料或製給複製本時，迪諾遊戲將酌收必要成本費用。<br/><br/>· (四)權利行使之方式<br/><br/>上開權利之申請，應填具申請文件，迪諾遊戲得向您請求提出可資確認之身分證明文件。若委託他人代為申請者，並應出具委任書，且提供本人及代理人之身分證明文件。<br/><br/>五、若您無法提供完整的個人資料時，不提供將對您權益之影響<br/><br/>若您無法提供完整且確實的個人資料，將影響迪諾遊戲和您的聯繫、完成交易、提供服務、身份驗證或處理消費、交易或客訴問題。建議您應提供完整的個人資料及隨時更新。若因您未提供完整且確實個人資料，造成對您及第三人發生損害時，您應負擔一切責任，如造成迪諾遊戲的損失時，迪諾遊戲有權向您請求損害賠償。<br/><br/>六、個人資料安全維護<br/><br/>關於您的個人資料檔案，迪諾遊戲將採行適當之安全措施，並盡力以合理之技術及措施，依相關法令辦理安全維護事項，防止您的個人資料被竊取、竄改、毀損、滅失或洩漏。<br/><br/>七、隱私權政策的修改<br/><br/>迪諾遊戲有權自行修訂隱私權政策，相關修正規定將會公告於本網站，請您密切注意以保障個人權益。當您於隱私權政策任何修改或變更後繼續使用迪諾遊戲網站與其所附屬之網站服務，表示您已閱讀、瞭解並同意接受隱私權政策修改或變更後之內容。<br/><br/>如果您不同意本隱私權政策，請您立即停止使用迪諾遊戲網站與其所附屬之網站服務。<br/><br/>八、看法與建議<br/><br/>您如果對於迪諾遊戲隱私權政策或與個人資料有關之相關事項有任何意見或疑問，可以和迪諾遊戲客服中心聯絡。
                </p>
            </div>`;

        dialog.showInfo(`<div class="pop pop-global-logic">
            <div class="borbox pop-hdgz">
                ${gzHtml}
            </div>
        </div>`);

        $(".pop-hdgz .plan-cen").mCustomScrollbar();
    },
};


function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s
};
