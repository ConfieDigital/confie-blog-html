// Imports
//=require jquery/dist/jquery.min.js
//=require slick-carousel/slick/slick.min.js

// DOM
var MyApp = {
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

    if ($('.cb-hero__slider').length) {
        MyApp.home.heroSlider();
    }

});