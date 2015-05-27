  $(document).ready(function() {
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
    $('#copyright').append($('<p>').append(copyrightText));
  });
