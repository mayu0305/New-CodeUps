
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    //ドロワーメニュー
    $("#MenuButton").click(function () {
        if($(".js-drawer-open").hasClass("open")){
            $(".js-drawer-menu").fadeOut();
            $(this).removeClass("open");
        }else{
            $(".js-drawer-menu").fadeIn();
            $(this).addClass("open");
        }
        $(".js-header").toggleClass("open");
        $("html").toggleClass("is-fixed");

    });


    //ドロワーボタン
    (function () {
    $('#MenuButton').click(function () {

        if ($(this).attr('aria-expanded') == 'false') {
        $(this).attr('aria-expanded', true);
        } else {
        $(this).attr('aria-expanded', false);
        }
    });
    })();


    //ナビメニューをエスケープキーで閉じる
    $(document).keyup(function(e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
        if($('.js-drawer-open').attr('aria-expanded') == 'true'){
            $('.js-drawer-open').trigger('click');
        }
        }
    });


    //ページ内リンクをクリック時ハンバーガーメニューを閉じる
        $("#global-nav a[href]").on("click", function() {
        $('#MenuButton').trigger('click');
    });


    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

    $(document).on('click', 'a[href*="#"]', function () {
        let time = 400;
        let header = $('header').innerHeight();
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $('html,body').animate({ scrollTop: targetY }, time, 'swing');
        return false;
    });



    $(window).scroll(function() { //スクロールしたら処理を開始する

        var pagetop = $(".to-top");
        var scroll = $(window).scrollTop() + $(window).height(); //ページトップから現在の画面下部までの高さ
        var footer = $("footer").offset().top; //ページトップからfooterまでの高さ
        var absoluteBottom = $("footer").outerHeight(); //footerの高さ(margin、padding、borderの値を含める)

        if ($(window).scrollTop() > $(window).height()) { //ページトップから1画面の高さ分、下にスクロールしたら

            pagetop.fadeIn(); //「ページトップへ戻る」ボタンをフェードインさせる

        } else {

            pagetop.fadeOut(); //ページトップから1画面の高さ以内でスクロールしている場合はフェードアウト

        }

        if (scroll > footer) { //画面下部からfooterが現れたら

            pagetop.css({
                "position": "absolute", //固定表示を解除する
                "bottom": absoluteBottom,
                "right": "0",
            });

        } else {

            pagetop.css({ //画面下部にfooterが現れるまでは
                "position": "fixed", //固定表示する
                "bottom": "0", //画面の最下部に
                "right": "0",
            });

        }
    });


}); //jQueryここまで

//mvスライダー
const firstSwiper = new Swiper(".js-fv-swiper", {
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    speed: 2000,

});


//キャンペーンスライダー
const secondSwiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 'auto',
    grabCursor: true,
    loop: true,
    speed: 2000,
    centeredSlides: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    }
});

window.addEventListener('load', () => {
    matchHeight('.campaign-card');
});


//スクロールアニメーション要素の取得とスピードの設定
var box = $('.js-scroll'),
    speed = 500;

box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
        if(counter == 0){
                $(this).delay(200).animate({'width':'100%'},speed,function(){
                image.css('opacity','1');
                $(this).css({'left':'0' , 'right':'auto'});
                $(this).animate({'width':'0%'},speed);
            })
            counter = 1;
        }
    });
});

//タブ
const tabs = document.querySelectorAll('.js-tab');

function tabSwitch(event) {
    const clickedTab = event.target;
    const tabsArray = Array.from(tabs);
    const index = tabsArray.indexOf(clickedTab);

    const resetTab = function () {
        const activeTab = document.querySelector('.js-tab.-active');
        const activePanel = document.querySelector('.js-tab-panel.-active');

        if (activeTab) {
            activeTab.classList.remove('-active');
            activeTab.removeAttribute('aria-selected');
            activeTab.tabIndex = -1;
        }
        if (activePanel) {
            activePanel.classList.remove('-active');
        }
    }

    const setTab = function (tab, tabpanel) {
        tab.classList.add('-active');
        tab.tabIndex = 0;
        tab.setAttribute('aria-selected', true);
        tabpanel.classList.add('-active');
    }

    if (event.type === 'keyup') {
        if (event.key === 'ArrowRight') {
            if (tabsArray[index + 1]) {
                tabsArray[index + 1].focus();
                resetTab();
                setTab(tabsArray[index + 1], document.querySelectorAll('.js-tab-panel')[index + 1]);
            } else {
                tabsArray[0].focus();
                resetTab();
                setTab(tabsArray[0], document.querySelectorAll('.js-tab-panel')[0]);
            }
        }
        if (event.key === 'ArrowLeft') {
            if (tabsArray[index - 1]) {
                tabsArray[index - 1].focus();
                resetTab();
                setTab(tabsArray[index - 1], document.querySelectorAll('.js-tab-panel')[index - 1]);
            } else {
                let lastTab = tabsArray.pop();
                lastTab.focus();
                resetTab();
                setTab(lastTab, Array.from(document.querySelectorAll('.js-tab-panel')).pop());
            }
        }
    }

    if (event.type === 'click') {
        resetTab();
        setTab(clickedTab, document.querySelectorAll('.js-tab-panel')[index]);
    }
}

tabs.forEach((tab) => {
    tab.addEventListener('click', tabSwitch);
    tab.addEventListener('keyup', tabSwitch);
});
//タブココまで

//FAQアコーディオン
document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('.js-faqItem');

        details.forEach(element => {
        const summary = element.querySelector('.js-faqQuestion');
        const content = element.querySelector('.js-faqAnswer');

        // 初期状態で詳細が展開されるようにする
        element.setAttribute('open', 'true');

        summary.addEventListener('click', e => {
            e.preventDefault();
            if (element.open) {
            const openDetails = content.animate(
                {
                opacity: [1, 0],
                height: [content.offsetHeight + 'px', 0],
                },
                {
                duration: 360,
                easing: 'ease-out',
                }
            );
            openDetails.onfinish = () => {
                element.removeAttribute('open');
            }
            } else {
            element.setAttribute('open', 'true');
            const openDetails = content.animate(
                {
                opacity: [0, 1],
                height: [0, content.offsetHeight + 'px'],
                },
                {
                duration: 360,
                easing: 'ease-out',
                }
            );
            }
        });
    });
});

//ギャラリーモーダル
MicroModal.init({
    awaitCloseAnimation: true,
    awaitOpenAnimation: true,
    disableScroll: true
});