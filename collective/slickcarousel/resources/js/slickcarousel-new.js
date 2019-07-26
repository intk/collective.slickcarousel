/* JS ENHANCEMENTS */

/*! modernizr 3.3.1 (Custom Build) | MIT *
* https://modernizr.com/download/?-objectfit-setclasses !*/
!function(e,n,t){function r(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?_.className.baseVal=n:_.className=n)}function o(e,n){return typeof e===n}function i(){var e,n,t,r,i,s,a;for(var f in g)if(g.hasOwnProperty(f)){if(e=[],n=g[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(r=o(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=r:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=r),y.push((r?"":"no-")+a.join("-"))}}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){return!!~(""+e).indexOf(n)}function f(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var r;for(var i in e)if(e[i]in n)return t===!1?e[i]:(r=n[e[i]],o(r,"function")?l(r,t||n):r);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(){var e=n.body;return e||(e=f(w?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var i,s,a,l,u="modernizr",p=f("div"),c=d();if(parseInt(r,10))for(;r--;)a=f("div"),a.id=o?o[r]:u+(r+1),p.appendChild(a);return i=f("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",l=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=l,_.offsetHeight):p.parentNode.removeChild(p),!!s}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(n[o])+":"+r+")");return i=i.join(" or "),c("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,r,i){function l(){p&&(delete z.style,delete z.modElem)}if(i=o(i,"undefined")?!1:i,!o(r,"undefined")){var u=m(e,r);if(!o(u,"undefined"))return u}for(var p,d,c,v,h,y=["modernizr","tspan","samp"];!z.style&&y.length;)p=!0,z.modElem=f(y.shift()),z.style=z.modElem.style;for(c=e.length,d=0;c>d;d++)if(v=e[d],h=z.style[v],a(v,"-")&&(v=s(v)),z.style[v]!==t){if(i||o(r,"undefined"))return l(),"pfx"==n?v:!0;try{z.style[v]=r}catch(g){}if(z.style[v]!=h)return l(),"pfx"==n?v:!0}return l(),!1}function h(e,n,t,r,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+S.join(s+" ")+s).split(" ");return o(n,"string")||o(n,"undefined")?v(a,n,r,i):(a=(e+" "+E.join(s+" ")+s).split(" "),u(a,n,t))}var y=[],g=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){g.push({name:e,fn:n,options:t})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var _=n.documentElement,w="svg"===_.nodeName.toLowerCase(),x="Moz O ms Webkit",S=C._config.usePrefixes?x.split(" "):[];C._cssomPrefixes=S;var b=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};C.atRule=b;var E=C._config.usePrefixes?x.toLowerCase().split(" "):[];C._domPrefixes=E;var j={elem:f("modernizr")};Modernizr._q.push(function(){delete j.elem});var z={style:j.elem.style};Modernizr._q.unshift(function(){delete z.style}),C.testAllProps=h;var N=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?b(e):(-1!=e.indexOf("-")&&(e=s(e)),n?h(e,n,t):h(e,"pfx"))};Modernizr.addTest("objectfit",!!N("objectFit"),{aliases:["object-fit"]}),i(),r(y),delete C.addTest,delete C.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);

(function() { //Closure, to not leak to the scope
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api"; 
    var before = document.getElementsByTagName("script")[0];
    before.parentNode.insertBefore(s, before);
})();

var slickCarousel = {};
slickCarousel.youtube_ready = false;
slickCarousel.initiated_youtube = false;
slickCarousel.yt_ready = false;
slickCarousel.players = {};
slickCarousel.initialSlide = 0;
slickCarousel.playing = false;
slickCarousel.$slick = undefined;

window.onYouTubePlayerAPIReady = function() {
  slickCarousel.youtube_ready = true;
  if (slickCarousel.initiated_youtube == false) {
    if (slickCarousel != undefined) { 
      slickCarousel.YT_ready();
    }
  }
};

function updatePOV(pano) {
    var options = pano.options;
    var pov_panorama = pano.panorama;
    var pov_setInterval = pano.pov_interval;

    if (pov_panorama != undefined && pov_panorama != null) { 
        var current_heading = pov_panorama.getPov().heading;

        if (options['heading_lower'] > options['heading']) {
            var new_heading = current_heading + pano.options['heading_increase'];
        } else {
            var new_heading = current_heading - pano.options['heading_increase'];
        }
        pov_panorama.setPov({heading: new_heading, pitch: 0});

        if (options['heading_lower'] > options['heading']) {
            if (current_heading >= pano.options['heading_middle']) {
              /* Deacelarates - remove acceleration */
              pano.options['heading_increase'] = pano.options['heading_increase'] - acceleration;
            } else {
              /* Acelerates  - add acceleration */
              pano.options['heading_increase'] = pano.options['heading_increase'] + acceleration;
            }
        } else {
            if (current_heading <= pano.options['heading_middle']) {
              /* Deacelarates - remove acceleration */
              pano.options['heading_increase'] = pano.options['heading_increase'] - acceleration;
            } else {
              /* Acelerates  - add acceleration */
              pano.options['heading_increase'] = pano.options['heading_increase'] + acceleration;
            }
        }

        if (options['heading_lower'] > options['heading']) {
            if (current_heading >= pano.options['heading_lower']) {
              clearInterval(pov_setInterval);
            }
        } else {
            if (current_heading <= pano.options['heading_lower']) {
              clearInterval(pov_setInterval);
            }
        }
    }
}

function movePOV(currslide) {
    if (currslide.find('.street-view').length) {

        var $street_view_div = jQuery(currslide.find('.street-view')[0]);

        if ($street_view_div.data('headinglower') != undefined && $street_view_div.data('headinglower') != undefined != '') {
            
            var uid = $street_view_div.data('uid');
            var pano = getPanorama(uid);
            if (pano != false && pano != undefined && pano != null) {
                if (!pano.pov_init && !isMobile.any()) {
                    
                    /* MOVE POV */
                    var pov_setInterval = setInterval(function() {
                        updatePOV(pano);
                    }, interval_time);

                    pano.pov_interval = pov_setInterval;
                    pano.pov_init = true;

                    if (slickCarousel.$slick != undefined) {
                        slickCarousel.playingPosition();
                    }
                }
            }
        }
    }
}

function clearPOV(currslide) {
    if (currslide.find('.street-view').length) {
        var $street_view_div = jQuery(currslide.find('.street-view')[0]);
        var uid = $street_view_div.data('uid');
        var pano = getPanorama(uid);
        if (pano != false && pano != undefined && pano != null) {
            clearInterval(pano.pov_interval);
        }
    }
}

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
                //slickCarousel.playingPosition();
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
        if (currentSlide == 0 && jQuery('body').hasClass('section-front-page') && jQuery('body').hasClass('mobile')) {
            slickCarousel.playingPosition();
        } else if (currentSlide == 0 || currentSlide == slick.$slides.length-1) {
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

    slickCarousel.startStreetView = function(slick, currentSlide) {
        var $currslide = jQuery(slick.$slides[currentSlide]);
        if ($currslide.find('audio').length) {
            var audio_div = $currslide.find('audio')[0];
            
            if (!jQuery('body').hasClass('mobile')) {
                audio_div.player.play();
            }

            var $button_play = jQuery($currslide.find('.play-button')[0]);
            if ($button_play.hasClass('playing')) {
              $button_play.removeClass('playing');
              $button_play.addClass('paused');
              $button_play.removeClass('hi-icon-volume-up');
              $button_play.addClass('hi-icon-volume-off');
            } else if ($button_play.hasClass('paused')) {
              $button_play.removeClass('paused');
              $button_play.addClass('playing');
              $button_play.removeClass('hi-icon-volume-off');
              $button_play.addClass('hi-icon-volume-up');
            } else {
              $button_play.removeClass('paused');
              $button_play.addClass('playing');
              $button_play.removeClass('hi-icon-volume-pff');
              $button_play.addClass('hi-icon-volume-up');
            }
        }

        /* Set interval for animation */
        movePOV($currslide);
    };

    slickCarousel.pauseStreetView = function(slick, currentSlide, pauseAudio) {
        var $currslide = jQuery(slick.$slides[currentSlide]);
        if (pauseAudio) {
            if ($currslide.find('audio').length) {
                var audio_div = $currslide.find('audio')[0];
                if (!jQuery('body').hasClass('mobile')) {
                    audio_div.player.pause();
                }
                var $button_play = jQuery($currslide.find('.play-button')[0]);
                if ($button_play.hasClass('playing')) {
                  $button_play.removeClass('playing');
                  $button_play.addClass('paused');
                  $button_play.removeClass('hi-icon-volume-up');
                  $button_play.addClass('hi-icon-volume-off');
                } else if ($button_play.hasClass('paused')) {
                  /* Do nothing */
                } else {
                  $button_play.removeClass('paused');
                  $button_play.addClass('playing');
                  $button_play.removeClass('hi-icon-volume-pff');
                  $button_play.addClass('hi-icon-volume-up');
                }
            }
        }
        clearPOV($currslide);
    }

    slickCarousel.afterChange = function(event, slick, currentSlide, nextSlide) {
        if (!slickCarousel.moved) {
            if (!jQuery(slickCarousel.elem).hasClass("moved")) {
                jQuery(slickCarousel.elem).addClass("moved");
            }
            slickCarousel.moved = true;
        }
        slickCarousel.updateHash(slick, currentSlide);
        slickCarousel.changeDirection(slick, currentSlide);
        slickCarousel.playVideoFromSlide(slick, currentSlide);
        slickCarousel.startStreetView(slick, currentSlide);
    };

    slickCarousel.beforeChange = function(event, slick, currentSlide, nextSlide) {
        slickCarousel.prevSlide = currentSlide;
        slickCarousel.pauseCurrentSlide(currentSlide);
        slickCarousel.pauseStreetView(slick, currentSlide, true);
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
        slickCarousel.moved = false;
    };

    slickCarousel.checkCarouselElements = function(elem, to_show) {
        if (!jQuery(elem).length) {
            jQuery('body').addClass('slideshow-empty');
        }
    };

    slickCarousel.fixIECompatibility = function(elem) {
        if ( !Modernizr.objectfit ) {
            jQuery(elem).each(function () {
                var $container = jQuery(this),
                imgUrl = $container.find('img').prop('src');
                if (imgUrl) {
                        $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('ie-object-fit');
                }
            });
        }
    };

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

        jQuery(".slick-track, .video-slide iframe, .overlay-image, .street-view").mouseover(function () {
            slickCarousel.initialPosition();
        });

        if (slickCarousel.youtube_ready) {
            slickCarousel.initiated_youtube = true;
            slickCarousel.YT_ready();
        }

        jQuery("#slideshow-btn").on('click touchstart', function() {
            if (slickCarousel.$slick != undefined) {
                slickCarousel.$slick.slick('slickNext');
            }
        });

        jQuery(".slideshow-title-wrapper").on('click touchstart', function() {
            window.location = jQuery(".slideshow-btn-wrapper > a.btn:nth-child(1)").attr('href');
        });

        jQuery(".street-view").on('click touchstart', function() {
            if (slickCarousel.$slick != undefined) {
                var currentSlide = slickCarousel.$slick.slick("slickCurrentSlide");
                slickCarousel.pauseStreetView(slickCarousel.$slick.slick('getSlick'), currentSlide, false);
            }
        });

        jQuery('.slideshow-btn-down').on('click touchstart', function() {
            var scrollTo = "#content-core";

            jQuery('.website-wrapper').animate({
                    scrollTop: jQuery(scrollTo).offset().top
            }, 600, function() {
                // slide
                var sliding = true;
                if (slickCarousel != undefined) {
                  if (slickCarousel.playing) {
                    slickCarousel.pauseCurrentSlide();
                  }
                };
            });
        });
    };

    jQuery(document).ready(function() {
        slickCarousel.init(".slideshow-wrapper");
        slickCarousel.checkCarouselElements('.carousel-image-wrapper');
        slickCarousel.fixIECompatibility('.carousel-image-wrapper');
    });
});
