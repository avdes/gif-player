(function($) {
  var play = function (gifPlayerWrapper) {
    var image = $('<img/>');
    image.attr('src', gifPlayerWrapper.data('url'));
    image.width(gifPlayerWrapper.width());
    image.height(gifPlayerWrapper.height());
    image.addClass('gif-player');

    gifPlayerWrapper.children('canvas').remove();
    gifPlayerWrapper.append(image);
    gifPlayerWrapper.addClass('play');
  };

  var pause = function (gifPlayerWrapper) {
    var image = gifPlayerWrapper.children('img');
    image.remove();

    var canvas = $('<canvas>fail</canvas>');
    canvas[0].width = gifPlayerWrapper.width();
    canvas[0].height = gifPlayerWrapper.height();
    canvas.width(gifPlayerWrapper.width());
    canvas.height(gifPlayerWrapper.height());

    if (gifPlayerWrapper.data('no-first-access') !== ''){
      canvas.css('opacity', 0);
      $.get(gifPlayerWrapper.data('url'), function () {
        canvas[0].getContext("2d").drawImage(image[0], 0, 0, gifPlayerWrapper.width(), gifPlayerWrapper.height());
        canvas.css('opacity', 1);
        gifPlayerWrapper.data('no-first-access', '');
      });
    } else {
      canvas[0].getContext("2d").drawImage(image[0], 0, 0, gifPlayerWrapper.width(), gifPlayerWrapper.height());
    }

    gifPlayerWrapper.append(canvas);
    gifPlayerWrapper.removeClass('play');
  };

  window.gifPlayerInit = function() {
    $(document).ready(function() {
      console.log('two');
      $('.gif-player').each(function () {
        var $this = $(this);

        $this.wrap("<div class='gif-player__wrapper'></div>");

        var wrapper = $this.parent();
        wrapper.data('url', $this.attr('src'));

        wrapper.width($this.width());
        wrapper.height($this.height());

        if ($this.data('autoplay') === '') {
          wrapper.addClass('play');
        } else {
          pause(wrapper);
        }
      });
      $('.gif-player__wrapper').on('click', function () {
        if (!$(this).hasClass('play')) {
          play($(this));
        } else {
          pause($(this));
        }
      });
    });
  };

  gifPlayerInit();
})(jQuery);
