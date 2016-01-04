(function($) {
  $.fn.fluidFont = function() {

    var parentHeight = function(el) {
      return (el.parent().parent().height() - 16);
    };

    var parentIsLarger = function(el) {
      if (el.outerHeight() < parentHeight(el)) {
        return true;
      } else {
        return false;
      }
    };

    var decreaseFont = function(el) {
      while (parentIsLarger(el) == false) {
        var newSize = parseInt(el.css('font-size')) - 1;
        el.css('font-size', newSize);
      }
    };

    var increaseFont = function(el) {
      while (parentIsLarger(el)) {
        var newSize = parseInt(el.css('font-size')) + 1;
        el.css('font-size', newSize);
      }
    };

    var fitFont = function(el) {
      $el = $(el);
      if (parentIsLarger($el)) {
        increaseFont($el);
      } else if (parentIsLarger($el) == false) {
        decreaseFont($el);
      }
    };

    return this.each( function() {
      var that = this;
      var resizeTimer;

      // on resize
      $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          fitFont(that);
        }, 250);
      });

      // on page load
      fitFont(this);
    });
  };
})(jQuery);
