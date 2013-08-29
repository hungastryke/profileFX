$(document).ready(function(){
	$('.overlayFX').delay(50).fadeIn(750);
	$('#pageContainer').delay(250).fadeIn(750);
	
	$('.closure').click(function(){
		$('.overlayFX').css({ 'display' : 'none'});
		$('#pageContainer').css({ 'display' : 'none'});
	});
	
	$('.popClose').hover(function(){
			$(this).attr("src", "img/close_button_over.png");
		}, function(){
			$(this).attr("src", "img/close_button.png");
		}
	);
	
	$('.postOver').hover(function(){
			$(this).attr("src", "http://media.inhaledigital.com.s3-us-west-1.amazonaws.com/assets/posttxtred.jpg");
		}, function(){
			$(this).attr("src", "http://media.inhaledigital.com.s3-us-west-1.amazonaws.com/assets/posttxtgrey.jpg");
		}
	);
	var currentPosition = 0;
	var slideWidth = 710;
	var slides = $('.slide');
	var numberOfSlides = slides.length;
	
	//shuffle Tactics
	/*$(window).load(function() {
	$('.slide').shuffle();
	});*/
	
	$('.slide:has(a)').click(function(event) {
			event.preventDefault();
	});
	
	// Remove scrollbar in JS
	$('#slidesContainer').css('overflow', 'hidden');
	
	// Wrap all .slides with #slideInner div
	slides
	.wrapAll('<div id="slideInner"></div>')
	// Float left to display horizontally, readjust .slides width
	.css({
	  'float' : 'left',
	  'width' : slideWidth
	});
	
	// Set #slideInner width equal to total width of all slides
	$('#slideInner').css('width', slideWidth * numberOfSlides);
	
	var myChoice = $('.fb_onboard_choices').find('img'); //$('img').attr('src') == 'img/fbspace.png';
	var myGenre = $('.explanation').find('.genre');
	
	var msg = ['Please pick your gender', 'What games do you play?', 'How long do you play for?', 'What consoles do you play on?', 'Click done to continue'];
	
	if (currentPosition == 0){
		$('.onboard_cloud_directives').html(msg[0]);
	}
	// Insert controls in the DOM
	$('.onboard_wrap')
	.prepend('<span class="control" id="leftControl">Back</span>')
	.append('<span class="control" id="rightControl">Continue</span>');
	
	// Hide left arrow control on first load
	manageControls(currentPosition);
	
	//console.log($('.onboard_progress_underlay').width());
	var progress = $('.onboard_progress_underlay').width();
	
	
	// Create event listeners for .controls clicks
	$('.control')
	.bind('click', function(){
	// Determine new position
	currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;
	console.log("slide #: " + currentPosition);
	// Hide / show controls
	manageControls(currentPosition);
	
	$('.onboard_cloud_directives').html(msg[currentPosition]);
	
	
	// Move slideInner using margin-left
	$('#slideInner').animate({
	  'marginLeft' : slideWidth*(-currentPosition),
	  'duration': 1000
	}, 1900, 'easeInOutElastic');
	
	$('.onboard_cloud').hide().delay(1500).fadeIn(1000);
	
	console.log(progress);
	$('.onboard_progress').delay(350).animate({
		width: (progress/slides.length)*(currentPosition+1),
		'duration': 1000
		}, 1900, 'swing');	
	
	$('.onboard_calculation').html(currentPosition+1 + ' / ' + numberOfSlides);
	

	if(currentPosition < 4 && !currentPosition == 0) {
		//$('#gameProfile').delay(1000).fadeIn(800);
		$('#genres').delay(200).fadeOut(750);
		//$('.control').delay(200).fadeOut(750).delay(200).fadeIn(300);
	}
	
	if(currentPosition == 0) {
		$('#gameProfile').delay(1000).fadeIn(800);
		$('#genres').delay(200).fadeOut(750);
		//$('#rightControl').delay(200).fadeOut(750).delay(200).fadeIn(300);
	}
	
	if(currentPosition == 4){
		//$('#fb_onboard_invite').delay(900).fadeIn(300);
		$('#fb_onboard_complete').delay(900).fadeIn(300);
		$('#gameProfile').delay(200).fadeOut(750);
		//$('.control').delay(200).fadeOut(750).delay(200).fadeIn(300);
	}
	
	if(currentPosition == numberOfSlides-1){
		$('#fb_onboard_complete').delay(900).fadeIn(300);
		$('#fb_onboard_invite').delay(200).fadeOut(750);
		//$('#leftControl').delay(200).fadeOut(750).delay(200).fadeIn(300);
	}
	
	});
	
	
	
	// manageControls: Hides and Shows controls depending on currentPosition
	function manageControls(position){
	// Hide left arrow if position is first slide
	if(position==0){ $('#leftControl').hide() } else{ $('#leftControl').show() }
	// Hide right arrow if position is last slide
	if(position==numberOfSlides-1){ 
		$('.control').hide(); 
		$('#slideshow').append('<a href="javascript:window.close();"><span id="noThanks">Done</span></a>');
		$('#noThanks').delay(1000).fadeIn(300);
		
	 } else { 
	 	$('#rightControl').show(); 
	 	$('#noThanks').hide();
	 }
	}	
	
	$('.slide').css({ 'width' : '690px', 'height' : '550px', 'margin-bottom' : '20px'}).delay(1000).fadeIn(2000);
	$('#slidesContainer').css({'height' : '450px', 'margin-top' : '10px'});
	//$('img').hide();
	
	$('.fb_choice_female').click(function(){
		if ($(this).hasClass('fb_pink_female')){
			$(this).removeClass('fb_pink_female');
		} else {
			$(this).addClass('fb_pink_female');
			$('.fb_choice_male').removeClass('fb_blue_male');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_male').click(function(){
		if ($(this).hasClass('fb_blue_male')){
			$(this).removeClass('fb_blue_male');
		} else {
			$(this).addClass('fb_blue_male');
			$('.fb_choice_female').removeClass('fb_pink_female');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_solo').click(function(){
		if ($(this).hasClass('fb_select_solo')){
			$(this).removeClass('fb_select_solo');
		} else {
			$(this).addClass('fb_select_solo');
			$('.fb_choice_multiplayer').removeClass('fb_select_multiplayer');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_multiplayer').click(function(){
		if ($(this).hasClass('fb_select_multiplayer')){
			$(this).removeClass('fb_select_multiplayer');
		} else {
			$(this).addClass('fb_select_multiplayer');
			$('.fb_choice_solo').removeClass('fb_select_solo');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_shortbursts').click(function(){
		if ($(this).hasClass('fb_select_shortbursts')){
			$(this).removeClass('fb_select_shortbursts');
		} else {
			$(this).addClass('fb_select_shortbursts');
			$('.fb_choice_hourglass').removeClass('fb_select_hourglass');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_hourglass').click(function(){
		if ($(this).hasClass('fb_select_hourglass')){
			$(this).removeClass('fb_select_hourglass');
		} else {
			$(this).addClass('fb_select_hourglass');
			$('.fb_choice_shortbursts').removeClass('fb_select_shortbursts');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_desktop').click(function(){
		if ($(this).hasClass('fb_select_desktop')){
			$(this).removeClass('fb_select_desktop');
		} else {
			$(this).addClass('fb_select_desktop');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_mobile').click(function(){
		if ($(this).hasClass('fb_select_mobile')){
			$(this).removeClass('fb_select_mobile');
		} else {
			$(this).addClass('fb_select_mobile');
			$(this).unbind('mouseenter mouseleave');
		}
	});
	
	$('.fb_choice_console').click(function(){
		if ($(this).hasClass('fb_select_console')){
			$(this).removeClass('fb_select_console');
		} else {
			$(this).addClass('fb_select_console');
			$(this).unbind('mouseenter mouseleave');
		}
	});
});