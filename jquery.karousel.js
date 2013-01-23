(function($) {
  'use strict';
  /*
   * jquery.karousel.js - version 0.1
   * A simple jQuery carousel plugin
   * Copyright (c) 2013, Jon Alport (http://jonalport.com)
   */
  $.fn.extend({          
    karousel: function(options) {
      // Default options
      var defaults = {
          firstSlide: 1
      };       
      options = $.extend(defaults, options);
      // For each matched element
      return this.each(function() {
        // Save a reference to this
        var karousel = $(this);
        // Initialise
        moveToSlide(options.firstSlide);
        // Button handlers
        $('#left').click(function() {
          showSlideToLeft();
          return false;
        });
        $('#right').click(function() {
          showSlideToRight();
          return false;
        });
        // Keypress handlers
        $(document).keydown(function(e) {
          // Left
          if(e.keyCode === 37) { 
            showSlideToLeft();
            return false;
          }
          // Right
          else if(e.keyCode === 39) { 
            showSlideToRight();
            return false;
          }
        });
        // Move to slide number (slide numbers start at 1)
        function moveToSlide(slideNum) {
          var slidePadding = parseInt(karousel.children('li').css('margin-left'), 10);
          var slideWidth = parseInt(karousel.children('li').css('width'), 10);
          var slideContainerWidth = parseInt(karousel.parent().css('width'), 10);
          var totalSlideWidth = slideWidth + slidePadding * 2;
          var startPosition = totalSlideWidth * -1 * (slideNum - 1) + slideContainerWidth / 2 - slideWidth / 2 - slidePadding;
          karousel.css('margin-left', startPosition + 'px').children().removeClass('active').eq(slideNum - 1).addClass('active');
          $('ul#filmstrip').children().removeClass('active').eq(slideNum - 1).addClass('active');
        }
        // Which slide is active?
        function getActiveSlideNum() {
          return karousel.children('.active').index() + 1;
        }
        // Activate the slide to the left
        function showSlideToLeft() {
          if(getActiveSlideNum() > 1) {
            moveToSlide(getActiveSlideNum() - 1);
          }
        }
        // Activate the slide to the right
        function showSlideToRight() {
          if(getActiveSlideNum() < karousel.children('li').length) {
           moveToSlide(getActiveSlideNum() + 1);  
          }
        }
      });
    }
  });
})(jQuery);