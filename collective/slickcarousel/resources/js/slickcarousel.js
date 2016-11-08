
/* JS ENHANCEMENTS */

require(['jquery', 'slick-carousel-dist'], 
function(jQuery, slickDist) {
	jQuery(document).ready(function() {
		jQuery(".slideshow-wrapper").slick({
			infinite: true,
			slidesToShow: 1,
			dots: false,
			speed: 500
		});
	});
});
