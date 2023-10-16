
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

const secondSwiper = new Swiper(".js-campaign-swiper", {
    loop: true,
    speed: 1500,
    spaceBetween: 24,
    centeredSlides: false,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1.2,
    breakpoints: {
        // スライドの表示枚数：768px以上の場合
        768: {
            slidesPerView: 3.4,
            spaceBetween: 40,
        }
    }

});