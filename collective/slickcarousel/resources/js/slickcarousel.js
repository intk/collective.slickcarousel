/* JS ENHANCEMENTS */

require(['jquery', 'slick-carousel-dist'], 
function(jQuery, slickDist) {

    var slickCarousel = {};
    
    slickCarousel.updateHash = function(slick, currentSlide) {
        // Get current slide
        var $currslide = jQuery(slick.$slides[currentSlide]);
        
        // Get slide data-path
        var path = $currslide.data('path');

        // Add hash to url
        var original_path = window.location.href.split(/\?|#/)[0];
        var absolute_path = original_path + "#" + path;
        history.replaceState(null, null, absolute_path);
    };

    slickCarousel.initialPosition = function() {
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");

        if (!jQuery(slickCarousel.elem).hasClass("initial-slide")) {
            jQuery(slickCarousel.elem).addClass("initial-slide");
        }
    };

    slickCarousel.moveForward = function() {
        jQuery(slickCarousel.elem).removeClass("initial-slide");
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");

        if (!jQuery(slickCarousel.elem).hasClass("forward")) {
            jQuery(slickCarousel.elem).addClass("forward");
        }
    };

    slickCarousel.moveBackwards = function() {
        jQuery(slickCarousel.elem).removeClass("initial-slide");
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");

        if (!jQuery(slickCarousel.elem).hasClass("backward")) {
            jQuery(slickCarousel.elem).addClass("backward");
        }
    };

    slickCarousel.changeDirection = function(slick, currentSlide) {
        var prev = slickCarousel.prevSlide;

        // initial - show both
        if (currentSlide == 0) {
            slickCarousel.initialPosition();
        } else if (prev == 0 && currentSlide == slick.$slides.length-1) {
            slickCarousel.moveBackwards();
        } else if (prev < currentSlide) {
            slickCarousel.moveForward();
        } else {
            slickCarousel.moveBackwards();
        }
    };

    slickCarousel.afterChange = function(event, slick, currentSlide, nextSlide) {
        slickCarousel.updateHash(slick, currentSlide);
        slickCarousel.changeDirection(slick, currentSlide);
    };

    slickCarousel.beforeChange = function(event, slick, currentSlide, nextSlide) {
        slickCarousel.prevSlide = currentSlide;
    };

    slickCarousel.findInitialSlide = function(elem) {
        var location_hash = window.location.hash;

        if (location_hash != "" || location_hash != undefined) {
            var hash = location_hash.split("#")[1];

            var $slide = jQuery(jQuery(elem).find("[data-path='"+hash+"']"));

            if ($slide.length) {
                return $slide.data('index');
            }
        }
        return 0;
    };

    slickCarousel.initProperties = function(initialSlide, elem) {
        slickCarousel.initialSlide = initialSlide;
        slickCarousel.prevSlide = initialSlide;
        slickCarousel.elem = elem;
    }

    slickCarousel.init = function(elem) {
        var initialSlide = slickCarousel.findInitialSlide(elem);
        
        slickCarousel.initProperties(initialSlide, elem);

        jQuery(elem).slick({
            infinite: true,
            slidesToShow: 1,
            initialSlide: initialSlide,
            dots: false,
            speed: 500,
        });

        jQuery(elem).on('afterChange', function(event, slick, currentSlide, nextSlide) {
            slickCarousel.afterChange(event, slick, currentSlide, nextSlide);
        });

        jQuery(elem).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            slickCarousel.beforeChange(event, slick, currentSlide, nextSlide);
        });

        jQuery(".carousel-image-wrapper, .video-slide iframe").mouseover(function () {
            slickCarousel.initialPosition();
        });
    };

    jQuery(document).ready(function() {
        slickCarousel.init(".slideshow-wrapper");
    });
});
