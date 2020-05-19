(function($) {
    // List of images for every section
    var image_list = {
        'tree-1': 'images/tree1.jpg',
        'tree-2': 'images/tree2.jpg',
        'tree-3': 'images/tree3.jpg',
        'contact': 'images/tree4.jpg'
    }

    // Helper function that checks if the section is currently seen by the web site visitor
    $.fn.isInViewport = function() {
        return $(this).offset().top + $(this).outerHeight() > 100 && $(this).offset().top < $(window).scrollTop() + 550;
    };

    // On scroll, check if a new section is seen
    $('.scrollable-content').on('scroll', function() {
        $.each(image_list, function (section_name, image_url) {
            if ($('#' + section_name + ' ' + 'p').isInViewport()) {
                $('#navlink-' + section_name).addClass('active');
                $('.background-container').css('background-image', 'url(' + image_url + ')');
            } else {
                $('#navlink-' + section_name).removeClass('active');
            }
        });
    });

    // On nav click animation to section
    $('.nav-link').click(function(event) {
        event.preventDefault();
        $('.scrollable-content').animate({ scrollTop: $($(this).attr('href')).offset().top - parseFloat($('.section-separator:first-of-type').css('margin-top')) }, 1000);
    });

    //if ($('.sticky-top')) {
        //scroll should take into consideration the height of the stickytop
    //}
})(jQuery);
