// Imports
//=require jquery/dist/jquery.min.js
//=require jquery-validation/dist/jquery.validate.min.js
//=require jquery-mask-plugin/dist/jquery.mask.min.js

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

    onlyNumbers : function() {
        $('.only-numbers').on('keypress', function(event) {
            var numbers = /[0-9]/g;
            var key = String.fromCharCode(event.which);
            var other_keys = [9];
            if ($.inArray(event.keyCode, other_keys) >= 0 || numbers.test(key)) {
                return true;
            }
            return false;
        });
    },
    onlyLetters : function () {
        $('.only-letters').on('keypress', function(event) {
            var englishAlphabetAndWhiteSpace = /[A-Za-z- ]/g;
            var other_keys = [8, 9, 37, 39, 193, 225, 200, 232, 205, 237, 211, 243, 218, 250, 209, 241];
            var key = String.fromCharCode(event.which);
            if ($.inArray(event.keyCode, other_keys) >= 0 || englishAlphabetAndWhiteSpace.test(key)) {
                return true;
            }
            return false;
        });
    },
    quote : {
        form : function () {
            jQuery.validator.addMethod("validEmail", function(value, element) {
                if(value == '') 
                    return true;
                var temp1;
                temp1 = true;
                var ind = value.indexOf('@');
                var str2=value.substr(ind+1);
                var str3=str2.substr(0,str2.indexOf('.'));
                if(str3.lastIndexOf('-')==(str3.length-1)||(str3.indexOf('-')!=str3.lastIndexOf('-')))
                    return false;
                var str1=value.substr(0,ind);
                if((str1.lastIndexOf('_')==(str1.length-1))||(str1.lastIndexOf('.')==(str1.length-1))||(str1.lastIndexOf('-')==(str1.length-1)))
                    return false;
                str = /(^[a-zA-Z0-9]+[\._-]{0,1})+([a-zA-Z0-9]+[_]{0,1})*@([a-zA-Z0-9]+[-]{0,1})+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})$/;
                temp1 = str.test(value);
                return temp1;
            }, "Please enter a valid email address.");

            $('.form').validate({
                errorPlacement: function(error, element) {
                    error.insertAfter(element);
                },
                errorElement:'span',
                errorClass: 'form__error',
                rules:{
                    'first-name':{minlength:2},
                    'last-name':{minlength:2},
                    email: { minlength: 3, maxlength: 255, validEmail: true},
                    phone: { minlength: 12, maxlength: 12},
                    zipcode:{ digits: true, minlength:3, maxlength:5}
                },
                messages: {
                    phone: {
                        minlength: "You must enter 10 digits",
                        maxlength: "You must enter 10 digits",
                    },
                },
                submitHandler: function(form) {

                    $('.form').addClass('form__loading');
                    $('.error-zipcode').html('');

                    $.getJSON('https://www.freewaylms.com/controller/validation-zipcode.php?callback=?',{zipcode:$('#zipcode').val(), method :'json', return_data:'true'}, function(data){
                        if (data.response == 1) {
                            $('#VisitorState').val(data.data.state);
                            $('#city').val(data.data.city);
                            $('.form').addClass('form__loading');
                            form.submit();
                        } else {
                            $('.error-zipcode').addClass('show-error').append('<span class="error">Please enter a valid zip code.</span>');
                            $('.form').removeClass('form__loading');
                        }
                    });
                }
            });
        },
        phone : function () {
            $('#phone').mask('000-000-0000');
        }
    }
}

// On ready

$(function () {

    if ($('.only-numbers').length) {
        MyApp.onlyNumbers();
    }

    if ($('.only-letters').length) {
        MyApp.onlyLetters();
    }

    if ($('.form').length) {
        MyApp.quote.form();
        MyApp.quote.phone();
    }

});