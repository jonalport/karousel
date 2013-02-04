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
          firstSlide: 1, 
          slideArrowPadding: 40, // The amount of space for arrow edge to slide
          filmstripArrowPadding: 20, // Relative to the filmstrip page width
          useKeyboardShortcuts: true, 
          showSlideControls: true, 
          showSlideControlsOnOutside: true, // If false, then inside slide
          showFilmstrip: true,
          showFilmstripControls: true, 
          filmstripSize: 100 // The max number of filmstrip items to show. Only kicks in if lower than what can be seen
      };       
      options = $.extend(defaults, options);
      // For each matched element
      return this.each(function() {
        // Save a reference to this
        var karousel = $(this);
        // The list of slides
        var slides = karousel.find('.slides ul');
        // Slide controls
        var slidesControls = karousel.find('.slides .controls');
        if(options.showSlideControls === true) {
          slidesControls.show();
        }
        // Filmstrip arrows
        var slideControlLeft = slidesControls.children('.left');
        var slideControlRight = slidesControls.children('.right');
        var filmstripContainer = karousel.find('.filmstrip .items');
        // Filmstrip list
        var filmstrip = karousel.find('.filmstrip ul');
        // Filmstrip controls
        var filmstripControls = karousel.find('.filmstrip .controls');
        if(options.showFilmstripControls === true) {
          filmstripControls.show();
        }
        // Filmstrip arrows
        var filmstripControlLeft = filmstripControls.children('.left');
        var filmstripControlRight = filmstripControls.children('.right');
        // Calculate some dimensions
        var slideMargin = parseInt(slides.children('li').css('margin-left'), 10);
        var slideWidth = slides.children('li').outerWidth();
        var numFilmstripItems = filmstrip.children('li').length;
        var filmstripItemWidth = filmstrip.children('li').outerWidth(); // Todo: Add potential margin?
        var filmstripItemHeight = filmstrip.children('li').outerHeight();
        var filmstripItemsWidth = numFilmstripItems * filmstripItemWidth;
        var filmstripContainerWidth = filmstripContainer.outerWidth();
        // numFilmstripPageItems: work out the max number of filmstrip items we should show, if not specified
        var numFilmstripPageItems = Math.floor(filmstripContainerWidth / filmstripItemWidth) - 1; // Add 1 extra for arrow button padding
        /*
         * If options size is too large, set it to correct size.
         *
         * We have:
         *   options.filmstripSize: the number of items to show in a page (specified)
         *   numFilmstripPageItems: the number that can fit (worked out)
         *   numFilmstripItems: the number of items (counted)
         */        
        options.filmstripSize = Math.min(options.filmstripSize, numFilmstripPageItems, numFilmstripItems);
        var widthOfFilmstripPage = options.filmstripSize * filmstripItemWidth;        
        // Container div is as wide as a page
        filmstripContainer.css('width', widthOfFilmstripPage + 'px');
        // Filmstrip UL is as wide as the sum of its items
        filmstrip.css('width', numFilmstripItems * filmstripItemWidth + 'px');  

        // Add .visible and .invisible class to appropriate filmstrip items
        filmstrip.children().addClass('invisible').slice(0, options.filmstripSize).addClass('visible').removeClass('invisible');
        checkFilmstripArrows();

        var slideContainerWidth = parseInt(slides.parent().css('width'), 10);
        var totalSlideWidth = slideWidth + slideMargin * 2; // Width of a slide, including margins
        var numSlides = slides.children('li').length;
        var totalSlidesWidth = totalSlideWidth * numSlides;
        // Set the slide container size
        slides.css('width', totalSlidesWidth + 'px');
        // Set the slides controls vertical position
        slidesControls.css('top', slides.height() / 2 - slidesControls.height() / 2 + 'px');
        // Set the slide arrows to be just on either side of the slide
        if(options.showSlideControlsOnOutside === true) {
          var slideArrowOffset = slidesControls.width() / 2 - slideWidth / 2 - slideControlLeft.width() - options.slideArrowPadding;
        }
        else {
          var slideArrowOffset = slidesControls.width() / 2 - slideWidth / 2 + options.slideArrowPadding;
        }
        slideControlLeft.css('left',  slideArrowOffset + 'px');
        slideControlRight.css('right', slideArrowOffset + 'px');
        // Set the filmstrip controls vertical position
        filmstripControls.css('top', filmstrip.height() / 2 - filmstripControls.height() / 2 + 'px');
        // Set the filmstrip arrows to be just on either side of the filmstrip
        var filmstripArrowOffset = filmstripControls.width() / 2 - widthOfFilmstripPage / 2 - filmstripControlLeft.width() - options.filmstripArrowPadding;
        filmstripControlLeft.css('left',  filmstripArrowOffset + 'px');
        filmstripControlRight.css('right', filmstripArrowOffset + 'px');
        // Begin
        moveToSlide(options.firstSlide);
        // Button handlers
        karousel.find('.slides .left').click(function() {
          showSlideToLeft();
          return false;
        });
        karousel.find('.slides .right').click(function() {
          showSlideToRight();
          return false;
        });
        karousel.find('.filmstrip .left').click(function() {
          pageFilmstripLeft();
          return false;
        });
        karousel.find('.filmstrip .right').click(function() {
          pageFilmstripRight();
          return false;
        });
        // Keypress handlers
        if(options.useKeyboardShortcuts === true) {
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
        }
        // Filmstrip click handler
        $('.filmstrip li a').click(function() {
          moveToSlide($(this).parent().index() + 1);
          return false;
        });
        function pageFilmstripRight() {
          // One page of elements to right
          var invisibleElementsToRight = filmstrip.children('.visible').last().nextAll().slice(0, options.filmstripSize); 
          var numToMove = invisibleElementsToRight.length;
          
          if(numToMove === 0) {
            return false;
          }
          // If there isn't a full page of items available to the right, we will keep this number of items on the right of the current page
          var remainderOnLeft = options.filmstripSize - numToMove;
          var currentLeftMargin = parseInt(filmstrip.css('margin-left'));
          var newLeftMargin = currentLeftMargin -= numToMove * filmstripItemWidth;
          filmstrip.css('margin-left', newLeftMargin + 'px');
          filmstrip.children().removeClass('visible').addClass('invisible');
          invisibleElementsToRight.addClass('visible').removeClass('invisible');
          filmstrip.children('.visible:first').prevAll().slice(0, remainderOnLeft).addClass('visible').removeClass('invisible');
          checkFilmstripArrows();
        }
        function pageFilmstripLeft() {
          // One page of elements to left
          var invisibleElementsToLeft = filmstrip.children('.visible').first().prevAll().slice(0, options.filmstripSize); 
          var numToMove = invisibleElementsToLeft.length;
          
          if(numToMove === 0) {
            return false;
          }
          // If there isn't a full page of items available to the right, we will keep this number of items on the right of the current page
          var remainderOnRight = options.filmstripSize - numToMove;
          var currentLeftMargin = parseInt(filmstrip.css('margin-left'));
          var newLeftMargin = currentLeftMargin += numToMove * filmstripItemWidth;
          filmstrip.css('margin-left', newLeftMargin + 'px');
          filmstrip.children().removeClass('visible').addClass('invisible');
          invisibleElementsToLeft.addClass('visible').removeClass('invisible');
          filmstrip.children('.visible:last').nextAll().slice(0, remainderOnRight).addClass('visible').removeClass('invisible');
          checkFilmstripArrows();
        }
        // Add inactive class if they shouldn't do anything (nothing to left, or nothing to right)
        function checkFilmstripArrows() {
          filmstripControls.find('a').removeClass('inactive');

          if(filmstrip.children('.visible').last().nextAll().length === 0) {
            filmstripControls.find('.right').addClass('inactive');
          }
          if(filmstrip.children('.visible').first().prevAll().length === 0) {
            filmstripControls.find('.left').addClass('inactive');
          }
        }
        // Move to slide number (slide numbers start at 1)
        function moveToSlide(slideNum) {
          var startPosition = totalSlideWidth * -1 * (slideNum - 1) + slideContainerWidth / 2 - slideWidth / 2 - slideMargin;
          slides.css('margin-left', startPosition + 'px').children().removeClass('inactive active').addClass('inactive').eq(slideNum - 1).removeClass('inactive').addClass('active');
          filmstrip.children().removeClass('inactive active').addClass('inactive').eq(slideNum - 1).removeClass('inactive').addClass('active');
          slidesControls.find('a').removeClass('inactive');
          if(slideNum == 1) {
            slidesControls.find('.left').addClass('inactive');
          }
          if(slideNum == numSlides) {
            slidesControls.find('.right').addClass('inactive');
          }
          // Page the filmstrip if we've moved out of range
          var activeIndex = slides.children('.active').index();
          var firstVisibleIndex= filmstrip.children('.visible:first').index();
          var lastVisibleIndex = filmstrip.children('.visible:last').index();

          if(activeIndex > lastVisibleIndex) {
            pageFilmstripRight();
          }
          else if(activeIndex < firstVisibleIndex) {
            pageFilmstripLeft();
          }
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
          if(getActiveSlideNum() < numSlides) {
           moveToSlide(getActiveSlideNum() + 1);  
          }
        }
      });
    }
  });
})(jQuery);