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
			triggerClick = "touchend";
			down = "touchstart";
			move = "touchmove";
			out = "touchleave";
			up = "touchend";
			$("html").addClass("touchingDevice");
		}


	//recup position client, update l'objet coord fournis
	    function getCursorPos(e){
	    	currentPos = new Coord();
	        if(isTouch){
	            var touch = e.originalEvent.touches[0];
	            currentPos.set(touch.clientX, touch.clientY);
	            return (currentPos);
	        }else{
	            currentPos.set(e.clientX, e.clientY);
	            return (currentPos);
	        }
	    }
	function getOffset( el ) {
	    var _x = 0;
	    var _y = 0;
	    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
	        _x += el.offsetLeft - el.scrollLeft;
	        _y += el.offsetTop - el.scrollTop;
	        el = el.offsetParent;
	    }
	    return { top: _y, left: _x };
	}

	//objet coordoonées
        function Coord(x,y){
            this.x = x || 0;
            this.y = y || 0;
        }

        Coord.prototype.set = function (x, y){
            this.x = x || 0;
            this.y = y || 0;
        }
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