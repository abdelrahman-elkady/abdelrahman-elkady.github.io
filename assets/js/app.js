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
   * Adjusting main section margin to the nav height
   */
  var adjustMe = function() {
    var navHeight = $('.navbar-material-blue.navbar').height();
    $('.home-header').css('margin-top', navHeight + 'px');
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
  var age = (new Date()).getFullYear() - 1995; // stalkers who dive into code, it's 12/1994 !
  $('#age-row').append(age + ' Years')

   /*
    * Social sharing icons hover shadow
    */
    $('.post-sharing img').mouseover(function(){
      $(this).addClass('shadow-z-2');
    });

    $('.post-sharing img').mouseout(function(){
      $(this).removeClass('shadow-z-2');
    });


});
