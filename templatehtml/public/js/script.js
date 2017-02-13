$(document).ready(function(){
	$("html").removeClass("no-js");

	function isTouchDevice(){
		try{
			document.createEvent("TouchEvent");
			return true;
		}catch(e){
			return false;
		}
	}
	//change les event selon la presence du touch
		var isTouch = isTouchDevice()
		,	triggerClick = "click"
		,	down = "mousedown"
		,	move = "mousemove"
		,	out = "mouseout"
		,	up = "mouseup";
		if(isTouch){
			triggerClick = "touchstart";
			down = "touchstart";
			move = "touchmove";
			out = "touchleave";
			up = "touchend";
			$("html").addClass("touchingDevice");
		}

});