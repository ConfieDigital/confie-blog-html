// Imports
//=require jquery/dist/jquery.min.js
//=require slick-carousel/slick/slick.min.js

// Check Email
function checkEmail(email){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
        return false;
    }else{
        return true;
    }
}

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