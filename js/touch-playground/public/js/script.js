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

var $drawingArea = $('<canvas class="drawingArea" data-state="waiting" width="'+document.width+'" height="'+document.height+'"></canvas>');
$("body").append($drawingArea);
var ctx = document.querySelector(".drawingArea").getContext("2d");
//OBJET coordonnées
	function coord(x,y){
		this.x = x || 0;
		this.y = y || 0;
	}

	coord.prototype.set = function (x, y){
		this.x = x || 0;
		this.y = y || 0;
	}

//recup position client, update l'objet coord fournis
	function getCursorPos(e, coord){
		if(isTouch){
			var touch = e.originalEvent.touches[0];
			coord.set(touch.clientX, touch.clientY);
		}else{
			coord.set(e.clientX, e.clientY);
		}
	}

var start = new coord()
,	end = new coord()
,	state = ""
,	lineWidth = 5
,	strokeStyle = "#b01055"
,	fillStyle = "#b01055";

//start drawing
	$drawingArea.bind(down, function(e){
		e.preventDefault();
		var $this = $(this);
		state = "start";
		getCursorPos(e, start);
		// console.log(start);
		ctx.beginPath();
     	ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI, false);
		ctx.moveTo(start.x, start.y);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
		state = "moving";
	});

//drawing 
	$drawingArea.bind(move, function(e){
		e.preventDefault();
		if(state == "moving"){
			var $this = $(this);
			getCursorPos(e, end);
			// console.log(end);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
		}
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
	});


//end drawing
	// $drawingArea.on(out, movingEnd);
	$drawingArea.on(up, movingEnd);
	function movingEnd(e){
		e.preventDefault();
		state = "";
		var $this = $(this);
		getCursorPos(e, end);
     	ctx.arc(end.x, end.y, 2, 0, 2 * Math.PI, false);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
		ctx.closePath();
		console.log("end");
	}

//render
	// Request Animation Frame
	// courtesy of @paul_irish
// 	requestAnimationFrame = (function() {
// 	    var prefixed = (window.requestAnimationFrame       || 
// 	                    window.webkitRequestAnimationFrame || 
// 	                    window.mozRequestAnimationFrame    || 
// 	                    window.oRequestAnimationFrame      || 
// 	                    window.msRequestAnimationFrame     || 
// 	                    function( callback ){
// 	                        window.setTimeout(callback, 1000 / 60);
// 	                    });

// 	    var requestAnimationFrame = function() {
// 	        prefixed.apply(window, arguments);
// 	    };

// 	    return requestAnimationFrame;
// 	})();

// 	var anim
// 	function startRender(){

// 		return requestAnimationFrame(draw)
// 	}

// cancelAnimationFrame()