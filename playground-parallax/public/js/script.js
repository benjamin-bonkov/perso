
$(document).ready(function(){
	var $parallax = $("#parallax")
	,	$layer = $(".layer")
	,	nbLayer = $layer.length
	,	wH = $(window).height();

	$parallax.css({"height": nbLayer* wH})
	$layer.css({
		"height":wH,
		"line-height":wH+"px"
	});

	var oldY = 0
	,	speed = 1;
	$(window).scroll(function(){
		// $(window).animate({"scrollTop":oldY+wH});
		var newY = $(window).scrollTop()
		,	delta = oldY - $(window).scrollTop();
		// console.log(delta)
		if(delta > 50 || delta < -50){
			timeAnim = 500
		}else{
			timeAnim = 0;
		}
		for(var i = 0; i < nbLayer; i++){
			for(var j = 0, $l =  $layer.eq(i).find(".customScroll"), len = $l.length; j < len; j++){
				speed = $l.eq(j).attr("data-speed") || 1;
				console.log($l.eq(j).attr("data-speed"));
				if(!$layer.hasClass("active")){
					speed = -1;
				}
				if (speed == 1 || speed == -1) {
					timeAnim = 0;
				}
				$l.eq(j).stop().animate({"top" : -newY*speed},timeAnim);
				if(delta > 50 || delta < -50){
					timeAnim = 500
				}else{
					timeAnim = 0;
				}
			}
		}
		oldY = newY;
	});



});