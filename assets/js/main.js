(function($) {
    // 
    var image_list = {
        'evora': 'images/tree1.jpg',
        'about': 'images/tree2.jpg',
        'other': 'images/tree3.jpg',
        'contact': 'images/tree4.jpg'
    }

    // Helper function that checks if the section is currently seen by the web site visitor
    $.fn.isInViewport = function() {
        return $(this).offset().top + $(this).outerHeight() > $(window).scrollTop() && $(this).offset().top < $(window).scrollTop() + $(window).height();
    };

    // On scroll, check if a new section is seen
    $('.scrollable-content').on('scroll', function() {
        $.each(image_list, function (section_name, image_url) {
            if ($('#' + section_name).isInViewport()) {
                $('.background-container').css('background-image', 'url(' + image_list[section_name] + ')');
            }
        });

    });

    // On nav click animation to section
    $('.nav-link').click(function(event) {
        event.preventDefault();
        $('.scrollable-content').animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
    });

    //if ($('.sticky-top')) {
        //scroll should take into consideration the height of the stickytop
    //}
})(jQuery);
