
var supportCanvas = true
try{
	document.createElement("canvas").getContext("2d");
}catch(e){
	supportCanvas = false
}

if($("html").hasClass("lt-ie9") || !supportCanvas){//canvas marche pas
	// console.log("PAS CANVAS");

}else{//canvas OK

	//init variables
		var startPos
		,	oldPos
		,	endPos 
		,	currentPos = new Coord()
		,	state = ""
		//canvas options
		,	canvasWidth = $(".canvasArea").width()
		,	canvasHeight = $(".canvasArea").height()
		,	canvas = document.querySelector(".canvasArea .canvas")
		,	ctx = canvas.getContext("2d")
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		var canvasPoly = [
			new Coord(0,0),
			new Coord(canvas.width, 0),
			new Coord(canvas.width, canvas.height),
			new Coord(0, canvas.height)
		]

	// gestion resize
		$(window).resize(function(){
			canvasWidth = $(".canvasArea").width();
			canvasHeight = $(".canvasArea").height();
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			canvasPoly = [
				new Coord(0,0),
				new Coord(canvas.width, 0),
				new Coord(canvas.width, canvas.height),
				new Coord(0, canvas.height)
			]
		});


    var $parallaxMouse = $("#parallaxMouse");
    var $layer1 = $(".layer1")
    ,   $layer2 = $(".layer2")
    var offset = $parallaxMouse.offset()
    ,   pmw = $parallaxMouse.width()
    ,   pmh = $parallaxMouse.height();
        
    var deltaX = -offset.left-(pmw/2)
    ,	deltaY = -offset.top-(pmh/2)
    // locked = false;
    var mousePos = new Coord();
    var mousePosDelta = new Coord();
   $layer1.hide();
	$layer2.hide();
	locked = false;
	// $("#parallaxMouse").on('mousemove', function(e){
	// 	if(!locked){
	// 		// locked = true
	// 		// setTimeout(function(){
	// 		// 	locked = false;
	// 		// },50)
	// 		mousePos.x = e.pageX - offset.left;
	// 		mousePos.y = e.pageY - offset.top;
	// 		mousePosDelta.x = mousePos.x + deltaX;
	// 		mousePosDelta.y = mousePos.y + deltaY;
	// 	}

	// 	// $layer1.css({"transform": "translate("+((mousePos.x + deltaX)/8)+"px, "+((mousePos.y + deltaY)/4)+"px)"});
	// 	// $layer2.css({"transform": "translate("+((mousePos.x + deltaX)/20)+"px, "+((mousePos.y + deltaY)/15)+"px)"});
	// });



	var particuleInactive = []
	//rendering loop
		var idAnimFrame;
		function render(){
			idAnimFrame = requestAnimationFrame(function(){
				//loop that

				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				for (var i =  0; i < particules.length; i++) {
					particules[i].render();
					particules[i].update();
				}
				// for (var i =  0; i < particulesStatic.length; i++) {
				// 	particulesStatic[i].render();
				// 	particulesStatic[i].followMouse();
				// }
				render();

				//recursive
			});
		}
	var particules = []
	,	particulesStatic = [];
	function initCanvas(){

		// set pixel 
		for (var x = 0; x < 25; x++) {
			particules.push( new Particule({ ctx: ctx }) );
		}
		// for (var x = 0; x < 25; x++) {
		// 	particulesStatic.push( new Particule({ ctx: ctx, fixed: true }) );
		// }

		render();
	}initCanvas();
}