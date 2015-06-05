
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
		,	text = document.querySelector(".canvasArea .canvasText").attributes["data-text"].value
		//canvas options
		,	canvasWidth = $(".canvasArea").width()
		,	canvasHeight = $(".canvasArea").height()
		,	canvas = document.querySelector(".canvasArea .canvas")
		,	ctx = canvas.getContext("2d")
		,	canvasText = document.querySelector(".canvasArea .canvasText")
		,	ctxText = canvasText.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvasText.width = canvasWidth;
		canvasText.height = canvasHeight;

	// gestion resize
		$(window).resize(function(){
			canvasWidth = $(".canvasArea").width();
			canvasHeight = $(".canvasArea").height();
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			canvasText.width = canvasWidth;
			canvasText.height = canvasHeight;
		});

	//start drawing
		// $canvasArea.bind(down, startMoving);
		// function startMoving(e){
		// 	if(imgReady){
		// 		$(".rejouer").unbind(triggerClick);
		// 		e.preventDefault();
		// 		state = "start";
		// 		drawing.push(startPos = getCursorPos(e));
		// 		ctx.beginPath();
		//      	// drawCircle(startPos);
		// 		ctx.lineWidth = 1;
		// 		ctx.strokeStyle = grey;
		// 		ctx.stroke();
		// 		ctx.closePath()
		// 		state = "moving";

		// 		polygon = new Polygon(startPos);
		// 		oldPos = startPos;
		// 		endPos = startPos;
		// 		// setGrid(oldPos);
		//  		clearTimeout(timerEnd);
		// 		timerEnd = setTimeout(function(){
		// 			movingEnd();
		// 		},500);
		// 	}else{
		// 		// console.log("notReady");
		// 	}
		// }

	//moving drawing 
		var lineDiag = []
		,	timerEnd;
		$(".canvas").bind(move, moving);
		function moving(e){
			e.preventDefault();
			monitorPos(e);
		}

	//end drawing
		// $canvasArea.on(out, movingEnd);
		// $canvasArea.on(up, movingEnd);
		// function movingEnd(){
		// 	clearTimeout(timerEnd);
		// 	state = "";
		// 	var $this = $(this);
		// 	ctx.beginPath();
		// 	ctx.moveTo(endPos.x, endPos.y);
		// 	drawing.push(endPos);
	 //     	ctx.arc(endPos.x, endPos.y, 2, 0, 2 * Math.PI, false);
		// 	ctx.lineWidth = 1;
		// 	ctx.strokeStyle = grey;
		// 	ctx.stroke();
		// 	ctx.closePath();
		// 	// polygon = drawing.makePolygon()

	 //     	if(polygon.push(endPos)){
		// 		lineDiag.push(new Line(polygon.list[polygon.length()-1], endPos,true))
	 //     		ctx.globalAlpha = 0.5;
	 //     		// setGrid(endPos);
	 //     		ctx.globalAlpha = 1;
	 //     	}
		//  		ctx.globalAlpha = 0.5;
		//  		linePolygon.push(drawLine(polygon.list[polygon.length()-1], startPos, true));
		//  		ctx.globalAlpha = 1;
		// 		drawPolygon(polygon.list, greyBlack);
		// 		// setGridPoints();
	 //     	// console.log(gridPoints);
		// 	// console.log(polygon.length());
	 //     	// if(gridPoints != undefined && gridPoints.length >= 5 && gridPoints[0].length >= 5 
	 //     	// 	&& (!mainPolygonSide.diagLT.isPoint && !mainPolygonSide.diagRT.isPoint && !mainPolygonSide.diagRB.isPoint && !mainPolygonSide.diagLB.isPoint)
	 //     	// ){
		// 	errorNbPoints = false;
		// 	errorNbPointsInGuid = false;
		// 	var nbInGuid = 0;
		// 	for (var i = 0; i < polygon.list.length; i++) {
		// 		if(isPointInPoly(rectGuidPolygon, polygon.list[i])){
		// 			nbInGuid++;
		// 		}
		// 	};
		// 	if(polygon.length() >= 4){
		// 		if(true){
		//      		setMainRectRepere();
		//      		if(mainPolygon.length > 3){
		// 				setRectRepere();
		// 				drawFinalPolygons();
		// 				$canvasArea.unbind(up);
		// 				$canvasArea.unbind(down);
		// 				// $canvasArea.unbind(move);
		// 				// $canvasArea.bind(move, monitorPos);
		// 				$canvasArea.bind(down, clickPolygon);
		// 				$canvasArea.bind(move, hoverPolygon);
		// 				$(".rejouer").bind(triggerClick, resetDrawing);
		//      		}else{
		//      			errorNbPoints = true;
		//      		}					
		// 		}else{
	 //     			errorNbPointsInGuid = true;
	 //     		}
		// 	}else{
		// 		errorNbPoints = true;
		// 	}
		// 	if (errorNbPoints) {
		// 		throwErrorNbPoints();
		// 	}
		// 	if(errorNbPointsInGuid){
		// 		throwEerrorNbPointsInGuid();
		// 	}
		// }

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

particulesText = [];
	function init(){
		// TODO : recup text, set in canvasText
			ctxText.clearRect(0,0,canvasWidth,canvasHeight);
			ctxText.textAlign="center";
			ctxText.textBaseline="middle";

	        ctxText.font= "50px sans-serif";
			ctxText.fillText(text, canvasWidth/2, canvasHeight/2);

		// TODO : recup canvas text pixel coord
			txtData = ctxText.getImageData(0,0,canvasWidth,canvasHeight);
			dataLoop = txtData.data;
			dataHeight = txtData.height;
			dataWidth = txtData.width;

		// TODO : loop data, set pixel pos
		for (var x = 0; x < dataWidth; x++) {
			for (var y = 0; y < dataHeight; y++ ) {
				i=(y*txtData.width + x)*4;
				if(dataLoop[i+3]>128){
					coordStart = new Coord(
			        	getRandomInt( (0), (canvasWidth) ),
			        	getRandomInt( (0), (canvasHeight) )
			        );
					duration = getRandomInt( 10000, 15000);
					console.log("duration");
					console.log(duration);
					particulesText.push(
						new Particule({
					        coordStart: coordStart, 
					        coorEnd: new Coord(x,y),
					        coorCurrent: coordStart,
					        // speed: 1,
					        duration: duration,
					        ctx: ctx
					    })
					);
				}
			};
		};
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
				if(particulesText.length > 0){
					dateNow = Date.now();
					t = dateNow - dateStart;
					console.log(t);
					ctx.clearRect(0, 0, canvasWidth, canvasHeight);
					for (var i =  0; i < particulesText.length; i++) {
						particulesText[i].render();
						if(particulesText[i].actif) {
							particulesText[i].update(t);
						}else{
							particuleInactive.push(particulesText[i]);
	                		particulesText.splice(i,1)
						}
					}
					for (var i =  0; i < particuleInactive.length; i++) {
						particuleInactive[i].render();
					}
					render();
				}else{
					ctx.clearRect(0,0,canvasWidth,canvasHeight);
					ctx.textAlign="center";
					ctx.textBaseline="middle";

			        ctx.font= "50px sans-serif";
					ctx.fillText(text, canvasWidth/2, canvasHeight/2);
				}

				//recursive
			});
		}
}