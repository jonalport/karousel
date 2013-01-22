$(document).ready(function() {
  $(document).karousel();
});

(function($){
  $.fn.extend({          
    karousel: function() { 
      return this.each(function() {
        // Initialise
        var firstSlide = 1;
        moveToSlide(firstSlide);
        // Button handlers
        $('#left').click(function() {
          moveLeft();
          return false;
        });
        $('#right').click(function() {
          moveRight();
          return false;
        });
        // Keypress handlers
        $(document).keydown(function(e) {
          // Left
          if(e.keyCode == 37) { 
            showSlideToLeft();
            return false;
          }
          // Right
          else if(e.keyCode == 39) { 
            showSlideToRight();
            return false;
          }
        });
        // Move to slide number (slide numbers start at 1)
        function moveToSlide(slideNum) {
          var slidePadding = parseInt($('#slides li').css('margin-left'));
          var slideWidth = parseInt($('#slides li').css('width'));
          var slideContainerWidth = parseInt($('#slides').parent().css('width'));
          var totalSlideWidth = slideWidth + slidePadding * 2;
          var startPosition = totalSlideWidth * -1 * (slideNum - 1) + slideContainerWidth / 2 - slideWidth / 2 - slidePadding;
          $('ul#slides').css('margin-left', startPosition + 'px').children().removeClass('active').eq(slideNum - 1).addClass('active');
          $('ul#filmstrip').children().removeClass('active').eq(slideNum - 1).addClass('active');
        }
        // Which slide is active?
        function getActiveSlideNum() {
          return $('#slides .active').index() + 1;
        }
        // Activate the slide to the left
        function showSlideToLeft() {
          if(getActiveSlideNum() > 1) {
            moveToSlide(getActiveSlideNum() - 1);
          }
        }
        // Activate the slide to the right
        function showSlideToRight() {
          if(getActiveSlideNum() < $('#slides > *').length) {
           moveToSlide(getActiveSlideNum() + 1);  
          }
        }
      });
    }
  });
})(jQuery);