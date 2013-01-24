(function($) {
  'use strict';
  /*
   * jquery.karousel.js - version 0.1
   * A simple jQuery carousel plugin
   * Copyright (c) 2013, Jon Alport (http://jonalport.com/)
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
        // Save a reference to the slides list
        var slides = karousel.find('.slides ul');
        // Save a reference to the filmstrip list
        var filmstrip = karousel.find('.filmstrip ul');
        // Initialise
        moveToSlide(options.firstSlide);
        // Button handlers
        karousel.find('.left').click(function() {
          showSlideToLeft();
          return false;
        });
        karousel.find('.right').click(function() {
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
        // Filmstrip click handler
        $('.filmstrip a').click(function() {
          moveToSlide($(this).parent().index() + 1);
          return false;
        });
        // Move to slide number (slide numbers start at 1)
        function moveToSlide(slideNum) {
          var slidePadding = parseInt(slides.children('li').css('margin-left'), 10);
          var slideWidth = parseInt(slides.children('li').css('width'), 10);
          var slideContainerWidth = parseInt(slides.parent().css('width'), 10);
          var totalSlideWidth = slideWidth + slidePadding * 2;
          var startPosition = totalSlideWidth * -1 * (slideNum - 1) + slideContainerWidth / 2 - slideWidth / 2 - slidePadding;
          slides.css('margin-left', startPosition + 'px').children().removeClass('inactive active').addClass('inactive').eq(slideNum - 1).removeClass('inactive').addClass('active');
          filmstrip.children().removeClass('inactive active').addClass('inactive').eq(slideNum - 1).removeClass('inactive').addClass('active');
        }
        // Which slide is active?
        function getActiveSlideNum() {
          return slides.children('.active').index() + 1;
        }
        // Activate the slide to the left
        function showSlideToLeft() {
          if(getActiveSlideNum() > 1) {
            moveToSlide(getActiveSlideNum() - 1);
          }
        }
        // Activate the slide to the right
        function showSlideToRight() {
          if(getActiveSlideNum() < slides.children('li').length) {
           moveToSlide(getActiveSlideNum() + 1);  
          }
        }
      });
    }
  });
})(jQuery);