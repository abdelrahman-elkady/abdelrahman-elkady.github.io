  $(document).ready(function() {

    preloader = new $.materialPreloader({
       position: 'top',
       height: '6px',
       fadeIn: 200,
       fadeOut: 200
    });

    preloader.on();

    $(window).load(function(){
      preloader.off();
    });

    /*
     * Smooth Scroll
     */
    $('a').smoothScroll({
      speed: 800
    });

    /*
     * Adjusting main section margin to the nav height
     */
    var adjustMe = function() {
      var navHeight = $('.navbar-material-blue.navbar').height();
      $('.home-header').css('margin-top', -1 * navHeight + 'px');
    };

    $(window).resize(adjustMe())
      .ready(adjustMe());

    /*
     * Adding copyright with current year
     */
    var copyrightText = document.createTextNode('\u00A9 abdelrahman elkady ' + (new Date()).getFullYear());
    $('#copyright').append($('<p>').attr('class', 'paragraph-slim').append(copyrightText));

    /*
     * Calculating my age :3
     */
    var age = (new Date()).getFullYear() - 1995;
    $('#age-row').append(age + ' Years')


    /*
     * Owl Carousel
     */

     $('#hide-me-photos').owlCarousel({

      autoPlay: 3000, //Set AutoPlay to 3 seconds

      items : 3
     });

  });
