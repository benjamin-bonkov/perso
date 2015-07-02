
var supportCanvas = true
try{
	document.querySelector(".canvasArea canvas").getContext("2d");
}catch(e){
	supportCanvas = false
}

if($("html").hasClass("lt-ie9") || !supportCanvas){//canvas marche pas
	// console.log("PAS CANVAS");

}else{//canvas OK

	//monitoring
		var $monitx = $(".monitor .x")
		,	$monity = $(".monitor .y");
		function monitorPos(e){
			pos = getCursorPos(e)
			$monitx.html(pos.x);
			$monity.html(pos.y);
		}

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

	// gestion resize
		$(window).resize(function(){
			canvasWidth = $(".canvasArea").width();
			canvasHeight = $(".canvasArea").height();
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			canvasText.width = canvasWidth;
			canvasText.height = canvasHeight;
		});


	//moving drawing 
		var lineDiag = []
		,	timerEnd;
		$(".canvas").bind(move, moving);
		function moving(e){
			e.preventDefault();
			monitorPos(e);
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

	particules = [];
	function init(){
		// TODO : recup text, set in canvasText

		// TODO : loop data, set pixel pos
		for (var x = 0; x < 20; x++) {
			particules.push( new Particule({ ctx: ctx }) );
		}
		// TODO : start render
		render();
	}init();

	var particuleInactive = []
	,	dateStart = Date.now();
	//rendering loop
		var idAnimFrame;
		function render(){
			idAnimFrame = requestAnimationFrame(function(){
				//loop that

					dateNow = Date.now();
					// t = dateNow - dateStart;
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				for (var i =  0; i < particules.length; i++) {
					particules[i].render();
					if(particules[i].actif) {
						particules[i].update(dateNow);
					}else{
						particules[i] = new Particule({ ctx: ctx })
					}
				}
				render();

				//recursive
			});
		}
}