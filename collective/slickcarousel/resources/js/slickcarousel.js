
/* JS ENHANCEMENTS */

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-objectfit-setclasses !*/
!function(e,n,t){function r(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?_.className.baseVal=n:_.className=n)}function o(e,n){return typeof e===n}function i(){var e,n,t,r,i,s,a;for(var f in g)if(g.hasOwnProperty(f)){if(e=[],n=g[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(r=o(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=r:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=r),y.push((r?"":"no-")+a.join("-"))}}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){return!!~(""+e).indexOf(n)}function f(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var r;for(var i in e)if(e[i]in n)return t===!1?e[i]:(r=n[e[i]],o(r,"function")?l(r,t||n):r);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(){var e=n.body;return e||(e=f(w?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var i,s,a,l,u="modernizr",p=f("div"),c=d();if(parseInt(r,10))for(;r--;)a=f("div"),a.id=o?o[r]:u+(r+1),p.appendChild(a);return i=f("style"),i.type="text/css",i.id="s"+u,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",l=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),s=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=l,_.offsetHeight):p.parentNode.removeChild(p),!!s}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(n[o])+":"+r+")");return i=i.join(" or "),c("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,r,i){function l(){p&&(delete z.style,delete z.modElem)}if(i=o(i,"undefined")?!1:i,!o(r,"undefined")){var u=m(e,r);if(!o(u,"undefined"))return u}for(var p,d,c,v,h,y=["modernizr","tspan","samp"];!z.style&&y.length;)p=!0,z.modElem=f(y.shift()),z.style=z.modElem.style;for(c=e.length,d=0;c>d;d++)if(v=e[d],h=z.style[v],a(v,"-")&&(v=s(v)),z.style[v]!==t){if(i||o(r,"undefined"))return l(),"pfx"==n?v:!0;try{z.style[v]=r}catch(g){}if(z.style[v]!=h)return l(),"pfx"==n?v:!0}return l(),!1}function h(e,n,t,r,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+S.join(s+" ")+s).split(" ");return o(n,"string")||o(n,"undefined")?v(a,n,r,i):(a=(e+" "+E.join(s+" ")+s).split(" "),u(a,n,t))}var y=[],g=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){g.push({name:e,fn:n,options:t})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var _=n.documentElement,w="svg"===_.nodeName.toLowerCase(),x="Moz O ms Webkit",S=C._config.usePrefixes?x.split(" "):[];C._cssomPrefixes=S;var b=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};C.atRule=b;var E=C._config.usePrefixes?x.toLowerCase().split(" "):[];C._domPrefixes=E;var j={elem:f("modernizr")};Modernizr._q.push(function(){delete j.elem});var z={style:j.elem.style};Modernizr._q.unshift(function(){delete z.style}),C.testAllProps=h;var N=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?b(e):(-1!=e.indexOf("-")&&(e=s(e)),n?h(e,n,t):h(e,"pfx"))};Modernizr.addTest("objectfit",!!N("objectFit"),{aliases:["object-fit"]}),i(),r(y),delete C.addTest,delete C.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);

(function() {
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api"; 
    var before = document.getElementsByTagName("script")[0];
    before.parentNode.insertBefore(s, before);
})();

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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

require(['slick-carousel-dist'], 
function(slickdist) {

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
        if (!slickCarousel.collection) {
            // Get current slide
            var $currslide = jQuery(slick.$slides[currentSlide]);
            
            // Get slide data-path
            var path = $currslide.data('path');

            // Add hash to url
            var original_path = window.location.href.split(/\?|#/)[0];
            var absolute_path = original_path + "#" + path;
            history.replaceState(null, null, absolute_path);
        }
    };

    slickCarousel.playingPosition = function() {
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");
        jQuery(slickCarousel.elem).removeClass("initial-slide");

        if (!jQuery(slickCarousel.elem).hasClass("playing-slide")) {
            jQuery(slickCarousel.elem).addClass("playing-slide");
            jQuery("#slideshow-controls").fadeOut();
        }
    };

    slickCarousel.initialPosition = function() {
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");
        jQuery(slickCarousel.elem).removeClass("playing-slide");

        if (!jQuery(slickCarousel.elem).hasClass("initial-slide")) {
            jQuery(slickCarousel.elem).addClass("initial-slide");
            jQuery("#slideshow-controls").fadeIn();
        }
    };

    slickCarousel.moveForward = function() {
        jQuery(slickCarousel.elem).removeClass("playing-slide");
        jQuery(slickCarousel.elem).removeClass("initial-slide");
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");

        if (!jQuery(slickCarousel.elem).hasClass("forward")) {
            jQuery(slickCarousel.elem).addClass("forward");
            jQuery("#slideshow-controls").fadeOut();
        }
    };

    slickCarousel.moveBackwards = function() {
        jQuery(slickCarousel.elem).removeClass("playing-slide");
        jQuery(slickCarousel.elem).removeClass("initial-slide");
        jQuery(slickCarousel.elem).removeClass("backward");
        jQuery(slickCarousel.elem).removeClass("forward");

        if (!jQuery(slickCarousel.elem).hasClass("backward")) {
            jQuery(slickCarousel.elem).addClass("backward");
            jQuery("#slideshow-controls").fadeOut();
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
                jQuery(".carousel-wrapper").addClass("moved");
            }
            slickCarousel.moved = true;
        }
        slickCarousel.updateHash(slick, currentSlide);
        slickCarousel.changeDirection(slick, currentSlide);
        slickCarousel.playVideoFromSlide(slick, currentSlide);
        slickCarousel.startStreetView(slick, currentSlide);
        slickCarousel.collectionEvents(slick, currentSlide);
    };

    slickCarousel.beforeChange = function(event, slick, currentSlide, nextSlide) {
        slickCarousel.prevSlide = currentSlide;
        slickCarousel.pauseCurrentSlide(currentSlide);
        slickCarousel.pauseStreetView(slick, currentSlide, true);
    };

    slickCarousel.findInitialSlide = function(elem) {
        if (!slickCarousel.collection) {
            var location_hash = window.location.hash;

            if (location_hash != "" || location_hash != undefined) {
                var hash = location_hash.split("#")[1];

                var $slide = jQuery(jQuery(elem).find("[data-path='"+hash+"']"));

                if ($slide.length) {
                    return $slide.data('index');
                }
            }
        }
        return 0;
    };

    slickCarousel.initProperties = function(elem) {
        slickCarousel.initialSlide = 0;
        slickCarousel.prevSlide = 0;
        slickCarousel.elem = elem;
        slickCarousel.moved = false;
        slickCarousel.collection = false;
    }

    slickCarousel.createEvents = function(elem) {
        jQuery(elem).on('afterChange', function(event, slick, currentSlide, nextSlide) {
            slickCarousel.afterChange(event, slick, currentSlide, nextSlide);
        });

        jQuery(elem).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            slickCarousel.beforeChange(event, slick, currentSlide, nextSlide);
        });

        jQuery(".slick-track, .video-slide iframe, .overlay-image, .street-view").mouseover(function () {
            slickCarousel.initialPosition();
            jQuery("#slideshow-controls").fadeIn();
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

    // UTILS
    slickCarousel.changeSlideshowDescription = function(description) {
        var $description_element = jQuery("#slide-description");

        if ($description_element.length) {
            $description_element.html(description);
        }
    };

    slickCarousel.getSlick = function() {
        if (slickCarousel.$slick != undefined) {
            return slickCarousel.$slick.slick('getSlick');
        }

        return false;
    }

    // COLLECTION

    slickCarousel.initCollectionProperties = function() {
        slickCarousel.danger_entry = 5;
        slickCarousel.danger_entry_increase = 5;
        slickCarousel.collection = true;
    };

    slickCarousel.triggerCollectionEvents = function() {
        // expand / shrink
        jQuery(".expand-btn").click(function() {
            jQuery(".slideshow-wrapper").toggleClass("image-contain");

            if (!jQuery(".slideshow-wrapper").hasClass("image-contain")) {
                jQuery(".actions-div .expand-btn i").removeClass("fa-expand");
                jQuery(".actions-div .expand-btn i").addClass("fa-compress");
            } else {
                jQuery(".actions-div .expand-btn i").removeClass("fa-compress");
                jQuery(".actions-div .expand-btn i").addClass("fa-expand");
            }
        });

        // info button
        jQuery(".info-btn").click(function() {
            if (jQuery(".page-container").is(":visible")) {

                jQuery('html, body').animate({
                    scrollTop: jQuery("#slickcarousel").offset().top
                }, 600, function() {
                    jQuery(".actions-div .info-btn i").removeClass("fa-times");
                    jQuery(".actions-div .info-btn i").addClass("fa-info-circle");
                    jQuery(".page-container, footer").hide();
                });
            } else {
                jQuery('html, body').animate({
                    scrollTop: jQuery("#slideshow-controls").offset().top
                }, 600);
              
                jQuery(".actions-div .info-btn i").removeClass("fa-info-circle");
                jQuery(".actions-div .info-btn i").addClass("fa-times");      
                jQuery(".page-container, footer").show();
            }
        });
    };

    slickCarousel.updateHashCollection = function() {

    };

    slickCarousel.updateSchema = function(schema) {
          jQuery(".object-fieldset").html('');

          var html = "";
          var body = "";

          for (var i = 0; i < schema.length; i++) {
            if (schema[i].fields.length > 0) {
              html += "<h3 class='fieldset-header'>"+schema[i].name+"</h3>";
              for (var j = 0; j < schema[i].fields.length; j++) {
                if (schema[i].fields[j].title != "body") {
                  html += "<div class='col-lg-5 col-md-5 col-sm-5 col-xs-12 object-label' style='padding-left:0px;'><span>"+schema[i].fields[j].title+"</span></div><div class='col-lg-7 col-md-7 col-sm-7 col-xs-12 object-value'><p>"+schema[i].fields[j].value+"</p></div>";
                } else {
                  body = schema[i].fields[j].value;
                }
              }
            }
          }
          
          var no_lt = html.replace(/&lt;/g, "<");
          var res = no_lt.replace(/&gt;/g, ">");
          
          var jsBody = jQuery($.parseHTML(body));
          var htmlBody = $.parseHTML(jsBody.text());
          jQuery(".object-fieldset").html(res);
    };

    slickCarousel.getSlideFields = function(slick, currentSlide) {
          var URL = "";
          var request_url = "get_fields";
          var $slide_object = jQuery(slickCarousel.getSlick().$slides[currentSlide]);
          var data_url = $slide_object.attr('data-absoluteurl');

          URL = data_url + "/" + request_url;

          $.getJSON(URL, function(data) {
            if (data.schema != undefined) {
              slickCarousel.updateSchema(data.schema);
            }
          });
    };

    slickCarousel.collectionEvents = function(slick, currentSlide) {
        // UPDATE CURRENT SLIDE DETAILS
        slickCarousel.updateSlideDescription(currentSlide);
        slickCarousel.getSlideFields(slick, currentSlide);

        // UPDATE SLIDES
        // check dangereous entry

        // request for more slides

        // render new slides

        // update dangerous entry
    };

    slickCarousel.updateSlideDescription = function(slideIndex) {
        var slick = slickCarousel.getSlick();
        if (slick) {
            var $currslide = jQuery(slick.$slides[slideIndex]);
            var title = $currslide.data('title');
            if (getParameterByName('collection_id') == "") {
                var document_title = document.title.split('—');
                title = document_title[0];
            }
            slickCarousel.changeSlideshowDescription(title);

            //TEMP
            if (slideIndex == 0) {
                jQuery('.wrap-prev, .slick-prev').hide();
            } else {
                jQuery('.wrap-prev, .slick-prev').attr("style", "");
            }

            jQuery('#object-title h1').html(title);
        }
    };

    slickCarousel.initCollection = function() {
        if (jQuery('body').hasClass('portaltype-object')) {
            slickCarousel.initCollectionProperties();
            slickCarousel.triggerCollectionEvents();
            slickCarousel.updateHashCollection();
            slickCarousel.updateSlideDescription(0);
        }
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

    slickCarousel.initSocialButtons = function() {
        if ($("body.site-nl").length > 0) {
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/nl_NL/sdk.js#xfbml=1&appId=634764129875517&version=v2.0";
              fjs.parentNode.insertBefore(js, fjs);
            } (document, 'script', 'facebook-jssdk'));
        } else {
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=634764129875517&version=v2.0";
                fjs.parentNode.insertBefore(js, fjs);
            } (document, 'script', 'facebook-jssdk'));
        }

        jQuery(function() {
            jQuery(".share-btn").popover({ trigger: "click focus", html: true, animation:false,
              content: function() {
                return jQuery('#share-settings').html()
              },
              title: function() {
                return jQuery('#share-title').html();
              }
            }).on("mouseenter", function () {
                var _this = this;
                jQuery(this).popover("show");
                jQuery(".popover").on("mouseleave", function () {
                    jQuery(_this).popover('hide');
                });
            }).on("mouseleave", function () {
                var _this = this;
                setTimeout(function () {
                    if (!jQuery(".popover:hover").length) {
                        jQuery(_this).popover("hide");
                    }
                }, 200);
            });
      });
    };

    slickCarousel.init = function(elem) {
        slickCarousel.initProperties(elem);
        var initialSlide = slickCarousel.findInitialSlide(elem);
        slickCarousel.initialSlide = initialSlide;
        slickCarousel.prevSlide = initialSlide;
        
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

        slickCarousel.createEvents(elem);
        slickCarousel.initCollection();
    };

    jQuery(document).ready(function() {
        slickCarousel.init(".slideshow-wrapper");
        slickCarousel.checkCarouselElements('.carousel-image-wrapper');
        slickCarousel.fixIECompatibility('.carousel-image-wrapper');
        slickCarousel.initSocialButtons();

    });
});

