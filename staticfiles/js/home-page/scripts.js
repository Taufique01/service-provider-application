jQuery(function ($) {

    'use strict';

    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */

    $(window).ready(function() {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');
    });


    // -------------------------------------------------------------
    // Sticky Menu
    // -------------------------------------------------------------

    (function () {
        var nav = $('.navbar');
        var scrolled = false;

        $(window).scroll(function () {

            if (110 < $(window).scrollTop() && !scrolled) {
                nav.addClass('sticky animated fadeInDown').animate({ 'margin-top': '0px' });

                scrolled = true;
            }

            if (110 > $(window).scrollTop() && scrolled) {
                nav.removeClass('sticky animated fadeInDown').css('margin-top', '0px');

                scrolled = false;
            }
        });

    }());



    // -------------------------------------------------------------
    // WOW JS
    // -------------------------------------------------------------

    (function () {
        new WOW().init();
    }());


    // -----------------------------------------------------------------
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    // ------------------------------------------------------------------

    (function () {
	    $('a.page-scroll').bind('click', function(event) {
	        var $anchor = $(this);
	        $('html, body').stop().animate({
	            scrollTop: $($anchor.attr('href')).offset().top
	        }, 1500, 'easeInOutExpo');
	        event.preventDefault();
	    });
    }());


    $('.offcanvas-menu a.offcanvas-link').on('click', function(event){

        event.preventDefault();
       

        $('#off-canvas-close-btn').trigger('click');

        var $anchor = $(this);

        $anchor.closest('ul').find('>li').removeClass('active');

        $anchor.parent().addClass('active');


        $(window).one('hippo-offcanvas-closed', function(e){

             e.stopImmediatePropagation();

            $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');

        });

    });





    // -------------------------------------------------------------
    // OffCanvas
    // -------------------------------------------------------------

    (function () {
        $('button.navbar-toggle').HippoOffCanvasMenu({

        documentWrapper: '#st-container',
        contentWrapper : '.st-content',
        position       : 'hippo-offcanvas-left',    // class name
        // opener         : 'st-menu-open',            // class name
        effect         : 'slide-in-on-top',             // class name
        closeButton    : '#off-canvas-close-btn',
        menuWrapper    : '.offcanvas-menu',                 // class name below-pusher
        documentPusher : '.st-pusher'

        });
    }());

    
    // -------------------------------------------------------------
    //  Twitter Feed
    // -------------------------------------------------------------

	/**
	 * ### HOW TO CREATE A VALID ID TO USE: ###
	 * Go to www.twitter.com and sign in as normal, go to your settings page.
	 * Go to "Widgets" on the left hand side.
	 * Create a new widget for what you need eg "user time line" or "search" etc.
	 * Feel free to check "exclude replies" if you don't want replies in results.
	 * Now go back to settings page, and then go back to widgets page and
	 * you should see the widget you just created. Click edit.
	 * Look at the URL in your web browser, you will see a long number like this:
	 * 567185781790228482
	 * Use this as your ID below instead!
	 */

   


    // -------------------------------------------------------------
    // Shuffle
    // -------------------------------------------------------------



    //-------------------------------------------------------
    // counter
    //-------------------------------------------------------




    // -------------------------------------------------------------
    // Detect IE version
    // -------------------------------------------------------------
    (function () {
        function getIEVersion() {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
            return match ? parseInt(match[1]) : false;
        }


        if( getIEVersion() ){
            $('html').addClass('ie'+getIEVersion());
        }
       

        if( $('html').hasClass('ie9') || $('html').hasClass('ie10')  ){

            $('.submenu-wrapper').each(function(){

               $(this).addClass('no-pointer-events');

            });

        }

    }());




    // ------------------------------------------------------------------
    // jQuery for back to Top
    // ------------------------------------------------------------------

    (function(){

          $('body').append('<div id="toTop"><i class="flaticon-thin16"></i></div>');

            $(window).scroll(function () {
                if ($(this).scrollTop() != 0) {
                    $('#toTop').fadeIn();
                } else {
                    $('#toTop').fadeOut();
                }
            }); 

        $('#toTop').on('click',function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

    }());



	// -----------------------------------------------------------------
	//STELLAR FOR BACKGROUND SCROLLING
	// ------------------------------------------------------------------

	$(window).load(function() {
	    $(window).stellar({
	        horizontalScrolling: false,
	        responsive: true
	    });

	});




	// -----------------------------------------------------------------
	//CONTACT FORM
	// ------------------------------------------------------------------

	



	// -----------------------------------------------------------------
	//GOOGLE MAP
	// ------------------------------------------------------------------

	jQuery(document).ready(function($) {





	   
	});



}); // JQuery end
