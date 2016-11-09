/* JS ENHANCEMENTS */
var slickCarousel = {};
slickCarousel.youtube_ready = false;
slickCarousel.initiated_youtube = false;
slickCarousel.yt_ready = false;
slickCarousel.players = {};
slickCarousel.initialSlide = 0;
slickCarousel.playing = false;
slickCarousel.$slick = undefined;

function onYouTubePlayerAPIReady() {
  slickCarousel.youtube_ready = true;
  if (slickCarousel.initiated_youtube == false) {
    if (slickCarousel != undefined) { 
      slickCarousel.YT_ready();
    }
  }
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

require(['jquery', 'slick-carousel-dist'], 
function(jQuery, slickDist) {

    (function() { //Closure, to not leak to the scope
        var s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api"; 
        var before = document.getElementsByTagName("script")[0];
        before.parentNode.insertBefore(s, before);
    })();

    slickCarousel.pauseCurrentSlide = function(currentSlide) {
        var curr = currentSlide;
        var $slide = jQuery(slickCarousel.$slick.slick('getSlick').$slides[curr]);
        if ($slide.hasClass("video-slide")) {
            var frameID = jQuery($slide.find('iframe')[0]).attr("id");
            // Pause video
            var slide_player = slickCarousel.players[frameID];
            if (slide_player != undefined) {
                slide_player.pauseVideo();
            }
        }
    };

    slickCarousel.startVideoFromSlide = function(slide) {
        if (!jQuery("body").hasClass("userrole-authenticated") && !isMobile.any()) {
            var iframeID = jQuery(slide.find('iframe')[0]).attr('id');

            var player = slickCarousel.players[iframeID];
            if (player != undefined) {
                if (player.playVideo) {
                    player.playVideo();
                } else {
                    jQuery(".slick-active.video-slide img.overlay-image").hide();
                    jQuery(".video-play-btn").hide();
                    jQuery(".video-play-btn").css("opacity", 0);
                    jQuery(".slick-active.video-slide iframe").show();
                }
            } else {
              jQuery(".slick-active.video-slide img.overlay-image").hide();
              jQuery(".video-play-btn").hide();
              jQuery(".video-play-btn").css("opacity", 0);
              jQuery(".slick-active.video-slide iframe").show();
            }
        }
    };

    slickCarousel.startFirstVideo = function(slide) {
      if (!jQuery("body").hasClass("userrole-authenticated") && !isMobile.any()) {
            var iframeID = jQuery(slide.find('iframe')[0]).attr('id');
            var player = slickCarousel.players[iframeID];
        
            if (player != undefined) {
                if (player.playVideo) {
                    player.playVideo();
                } else {
                    jQuery(".slick-active.video-slide img.overlay-image").hide();
                    jQuery(".video-play-btn").css("opacity", 0);
                    jQuery(".slick-active.video-slide iframe").show();
                    jQuery(".video-play-btn").hide();
                }
            } else {
                  jQuery(".slick-active.video-slide img.overlay-image").hide();
                  jQuery(".video-play-btn").css("opacity", 0);
                  jQuery(".slick-active.video-slide iframe").show();
                  jQuery(".video-play-btn").hide();
            }
        }
    };

    slickCarousel.onPlayerStateChange = function(iframeID) {
        return function(event) {
            if (event.data == 1) {
                slickCarousel.playingPosition();
                slickCarousel.playing = true;
          
                setTimeout(function() {
                    jQuery(".slick-active.video-slide img.overlay-image").hide();
                    jQuery(".video-play-btn").css("opacity", 0);
                    jQuery(".video-play-btn").hide();
                    jQuery(".slick-active.video-slide iframe").show();
                }, 400);
            } else if (event.data == 2) {
                slickCarousel.initialPosition();
                slickCarousel.playing = false;
            }

            /* Video ended 
            * Got to next slide */
            else if (event.data == 0) {
                slickCarousel.initialPosition();
                slickCarousel.$slick.slick('slickNext');
            }
        }
    };

    slickCarousel.createYTEvent = function(iframeID, first_slide) {
        return function(event) {
            var player = slickCarousel.players[iframeID];
            if (first_slide.hasClass('video-slide')) {
                var slide_iframeID = jQuery(first_slide.find('iframe')[0]).attr('id');
                if (slide_iframeID == iframeID) {
                    slickCarousel.startFirstVideo(first_slide);
                }
            }
        }
    };

    slickCarousel.YT_ready = function() {
        if (slickCarousel.$slick != undefined) {
            if (!slickCarousel.yt_ready) {
                slickCarousel.yt_ready = true;
                var $first_slide = jQuery(slickCarousel.$slick.slick('getSlick').$slides[slickCarousel.initialSlide]);
                jQuery(".video-slide:not(.slick-cloned) iframe").each(function() {
                    var iframeID = this.id;
                    slickCarousel.players[iframeID] = new YT.Player(iframeID, {
                        events: {
                            "onReady": slickCarousel.createYTEvent(iframeID, $first_slide),
                            "onStateChange": slickCarousel.onPlayerStateChange(iframeID)
                        }
                    });
                });
            }
        }
    };

    /* UTILS */
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

    slickCarousel.playingPosition = function() {
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");
        jQuery(slickCarousel.elem).removeClass("initial-slide");

        if (!jQuery(slickCarousel.elem).hasClass("playing-slide")) {
            jQuery(slickCarousel.elem).addClass("playing-slide");
        }
    };

    slickCarousel.initialPosition = function() {
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");
        jQuery(slickCarousel.elem).removeClass("playing-slide");

        if (!jQuery(slickCarousel.elem).hasClass("initial-slide")) {
            jQuery(slickCarousel.elem).addClass("initial-slide");
        }
    };

    slickCarousel.moveForward = function() {
        jQuery(slickCarousel.elem).removeClass("playing-slide");
        jQuery(slickCarousel.elem).removeClass("initial-slide");
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");

        if (!jQuery(slickCarousel.elem).hasClass("forward")) {
            jQuery(slickCarousel.elem).addClass("forward");
        }
    };

    slickCarousel.moveBackwards = function() {
        jQuery(slickCarousel.elem).removeClass("playing-slide");
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
        if (currentSlide == 0 || currentSlide == slick.$slides.length-1) {
            slickCarousel.initialPosition();
        } else if (prev == 0 && currentSlide == slick.$slides.length-1) {
            slickCarousel.moveForward();
        } else if (prev < currentSlide) {
            slickCarousel.moveForward();
        } else {
            slickCarousel.moveBackwards();
        }
    };

    slickCarousel.playVideoFromSlide = function(slick, currentSlide) {
        var $currslide = jQuery(slick.$slides[currentSlide]);
        if ($currslide.hasClass('video-slide')) {
            slickCarousel.startVideoFromSlide($currslide);
        }
    };

    slickCarousel.afterChange = function(event, slick, currentSlide, nextSlide) {
        slickCarousel.updateHash(slick, currentSlide);
        slickCarousel.changeDirection(slick, currentSlide);
        slickCarousel.playVideoFromSlide(slick, currentSlide);
    };

    slickCarousel.beforeChange = function(event, slick, currentSlide, nextSlide) {
        slickCarousel.prevSlide = currentSlide;
        slickCarousel.pauseCurrentSlide(currentSlide);
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

        slickCarousel.$slick = jQuery(elem).slick({
            infinite: true,
            slidesToShow: 1,
            initialSlide: initialSlide,
            dots: false,
            speed: 500,
            nextArrow: "<div class='wrap-next'><button type='button' class='slick-next'></button></div>",
            prevArrow: "<div class='wrap-prev'><button type='button' class='slick-prev'></button></div>"
        });

        if (!slickCarousel.$slick.length) {
            slickCarousel.$slick = undefined;
        }

        jQuery(elem).on('afterChange', function(event, slick, currentSlide, nextSlide) {
            slickCarousel.afterChange(event, slick, currentSlide, nextSlide);
        });

        jQuery(elem).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            slickCarousel.beforeChange(event, slick, currentSlide, nextSlide);
        });

        jQuery(".carousel-image-wrapper, .video-slide iframe, .overlay-image").mouseover(function () {
            slickCarousel.initialPosition();
        });

        if (slickCarousel.youtube_ready) {
            slickCarousel.initiated_youtube = true;
            slickCarousel.YT_ready();
        }
    };

    jQuery(document).ready(function() {
        slickCarousel.init(".slideshow-wrapper");
    });
});
