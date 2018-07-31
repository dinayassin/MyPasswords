jQuery(document).ready(function ($) {
    //open popup
    $('.cd-popup-trigger').on('click', function (event) {
        showAlert();
    });

    function showAlert() {
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    }


    function hideAlert() {
        event.preventDefault();
        $('.cd-popup').removeClass('is-visible');
    }

   


    //close popup
    $('.cd-popup').on('click', function (event) {
        if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
            hideAlert();
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            hideAlert();
        }
    });
});