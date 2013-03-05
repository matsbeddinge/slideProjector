(function($){
	$.fn.slideProjector = function(options){
	options = $.extend({}, $.fn.slideProjector.defaults, options);
	return this.each(function(){
	
	/**
	 *	Prepare the DOM structure of the slideProjector.
	 *	All thumbnails, (with a width of 60px), are wrapped in one container with position relative.
	 *	Only five thumbnails are showed at once thru a second wrapping container with overflow hidden.
	 *	Different thumbnails are showed by changing the left position of the inner container.
	 *	A big picture is showed of the thumbnail in the middle of the viewing area.
	 */	
	$(this).find('img').wrapAll('<div class="SP_thumbnails_inner" />');
	$('.SP_thumbnails_inner').wrap('<div class="SP_thumbnails_outer" />');
	$('.SP_thumbnails_outer').wrap('<div class="SP_thumbnails" />');
	$('<div />')
		.attr('id', 'SP_viewBox')
		.prependTo(this);
	$('<div />')
		.attr('id', 'SP_frame')
		.appendTo('.SP_thumbnails_outer');
	$('<img>')
		.attr({'src': 'arrow_left.png', 'id': 'SP_backward', 'alt': 'backward'})
		.prependTo('.SP_thumbnails');
	$('<img>')
		.attr({'src': 'arrow_right.png', 'id': 'SP_forward', 'alt': 'forward'})
		.appendTo('.SP_thumbnails');
	$('<img>')
		.attr('src', $('.SP_thumbnails_inner img').eq(2).attr('src'))
		.appendTo('#SP_viewBox');
	
	/**
	 * Style the slideProjector.
	 */
	$(this).css({
		'background-color':options.bgcolor,
		'width':options.width + 'px',
		'height': (options.height + 75) + 'px',
		'padding':'20px',
		'float':'none'
	});
	$('#SP_frame').css({
		'position':'absolute',
		'z-index':999,
		'left':'120px',
		'width':'58px',
		'height':'58px',
		'border':'1px solid #ddd'
	});
	$('#SP_backward, #SP_forward').css({
		'float':'left',
		'width':'26px',
		'height':'40px',
		'padding':'10px 17px',
		'cursor':'pointer'
	});
	$('.SP_thumbnails').css({
		'width':'420px',
		'margin':'0 auto',
		'padding-top':'15px'
	});
	$('.SP_thumbnails_outer').css({
		'overflow':'hidden',
		'width':'300px',
		'float':'left',
		'position':'relative'
	});
	$('.SP_thumbnails_inner').css({
		'float':'left',
		'position':'relative'
	});
	$('.SP_thumbnails_inner img').css({
		'float':'left',
		'width':'50px',
		'height':'50px',
		'padding':'5px',
		'cursor':'default'
	});
	$('#SP_viewBox').css({
		'height':options.height + 'px',
		'line-height':options.height + 'px',
		'text-align':'center'
	});
	$('#SP_viewBox img').css({
		'float':'none',
		'height':'auto',		// necessary for IE
		'width':'auto',			// necessary for IE
		'max-height':options.height + 'px',
		'padding':'0px',
		'margin':'0px',
		'vertical-align':'middle',
		'cursor':'pointer'
	});
	
	/**
	 *	Common variables for the functions of the plugin.
	 *	Offsets are handled as steps, hence 1 step is equal to the width of the thumbnail, 60px.
	 */
	var 
		numberOfPictures = $('.SP_thumbnails_inner img').length,
		maxOffset = numberOfPictures - 3,
		currentOffset = 0,
		intervalId = null
	;
	
	/**
	 *	Move the thumbnails forward one step, if at last position it returns to first position.
	 *	Removes the event handler to avoid strange behaviour if one goes clicking crazy.
	 */
	function forward(){
		$('#SP_forward').off('click');
		$('#SP_backward').off('click');
		if (currentOffset < maxOffset){
			currentOffset++;
			swapPic('-=60');
		}
		else{
			currentOffset = -2;
			swapPic(120);
		}
	}
	
	/**
	 *	Move the thumbnails backward one step, if at first position it returns to last position.
	 *	Removes the event handler to avoid strange behaviour if one goes clicking crazy. 
	 */
	function backward(){
		$('#SP_forward').off('click');
		$('#SP_backward').off('click');
		if (currentOffset > -2){
			currentOffset--;
			swapPic('+=60');
		}
		else{
			currentOffset = maxOffset;
			swapPic(-maxOffset*60);
		}
	}
	
	/**
	 *	Function responsible for the movement of thumbs and for changing the big picture.
	 *	Event handler is once again attached after the animation has come to an end.
	 */
	function swapPic(leftPos){
		$('#SP_viewBox img').fadeOut(options.duration);
		$('.SP_thumbnails_inner').animate(
			{'left':leftPos},
			{
				duration: options.duration, 
				queue: true,
				complete: function(){
					$('#SP_viewBox img')
						.attr('src', $('.SP_thumbnails_inner img').eq(currentOffset+2).attr('src'))
						.fadeIn(options.duration, function(){
							$('#SP_forward').on('click', clearAndForward);
							$('#SP_backward').on('click', clearAndBackward);
						});
				}
			}
		);
	}
	
	/**
	 *	Clear the intervall timer an move forward.
	 */
	function clearAndForward(){
		clearTimer();
		forward();
	}
	
	/**
	 *	Clear the intervall timer an move backward.
	 */
	function clearAndBackward(){
		clearTimer();
		backward();
	}
	
	/**
	 *	Clear the intervall timer.
	 */
	function clearTimer(){
		if (intervalId !== null){clearInterval(intervalId); intervalId = null;}
	}
	
		
	$('.SP_thumbnails_inner').css('width', numberOfPictures*60);	// make sure to wrap all pictures.
	$('#SP_forward').on('click', clearAndForward); 			// atach event handler, move forward, on forward arrow.
	$('#SP_backward').on('click', clearAndBackward);		// atach event handler, move backward, on backward arrow.
	$('#SP_viewBox img').click(function(){
		if (intervalId === null){forward(); intervalId = setInterval(function() {forward();}, options.slidetime);}
		else {clearTimer();}
	});

	});
	}
	
	/**
	 *	Setting default values for the slideProjector
	 */
	$.fn.slideProjector.defaults = {
      'swaptime': 300,
			'slidetime': 4000,
			'bgcolor': '#333',
			'width': 700,
			'height': 400,
    }
	
})(jQuery);