// Imports
//=require jquery/dist/jquery.min.js
//=require slick-carousel/slick/slick.min.js

// DOM
var MyApp = {
    nav: function () {
        $("#nav-mobile").click(function () {
            $("nav#site-navigation").toggle("fast");
        });
        $('.nav-arrow-mobile').click(function (event) {
            event.preventDefault();
            $('.cb-site-header__navigation nav > ul > li:hover > ul').slideToggle();
        });
    },
    home : {
        heroSlider : function () {
            $('.cb-hero__slider').slick({
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    dots: true   
                }  
            );
        }
    }
}

// On ready

$(function () {

    MyApp.nav();

    if ($('.cb-hero__slider').length) {
        MyApp.home.heroSlider();
    }

});