
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

//要素の取得とスピードの設定
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
