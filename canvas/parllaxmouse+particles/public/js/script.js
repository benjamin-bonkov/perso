$(document).ready(function(){
	$("html").removeClass("no-js");

	
	var $parallaxMouse = $("#parallaxMouse")
	,	$layer1 = $(".layer1")
	,	$layer2 = $(".layer2")
	,	offset = $parallaxMouse.offset()
	,	pmw = $parallaxMouse.width()
	,	pmh = $parallaxMouse.height();
	console.log(offset);
	$("#parallaxMouse").bind(move, moving);

	var deltaY1 = -offset.top-(pmh/2)
	,	deltaX1 = -offset.left-(pmw/2)
	,	deltaY2 = -offset.top-(pmh/2)
	,	deltaX2 = -offset.left-(pmw/2)
	locked = false;
	function moving(e){
		e.preventDefault();
		pos = getCursorPos(e);
		$layer1.css({"transform": "translate("+((pos.x + deltaX1)/8)+"px, "+((pos.y + deltaY1)/4)+"px)"});
		$layer2.css({"transform": "translate("+((pos.x + deltaX2)/20)+"px, "+((pos.y + deltaY2)/15)+"px)"});
	}

});