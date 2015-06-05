
var $drawingArea = $(".drawingArea")
,	$canvas = $('<canvas width="'+$(".drawingArea").width()+'" height="'+$(".drawingArea").height()+'"></canvas>');
	$drawingArea.append($canvas);
var supportCanvas = true
try{
	document.querySelector(".drawingArea canvas").getContext("2d");
}catch(e){
	supportCanvas = false
}

if($("html").hasClass("lt-ie9") || !supportCanvas){//canvas marche pas
	// console.log("PAS CANVAS");
	function animIE(){
		var	$lt = $(".ie-lt")
		,	$rt = $(".ie-rt")
		,	$rb = $(".ie-rb")
		,	$lb = $(".ie-lb")
		,	$red = $(".ie-red")
		,	$green = $(".ie-green")
		,	$blue = $(".ie-blue")
		,	$orange = $(".ie-orange")
		,	$violetTop = $(".ie-violetTop")
		,	$greenTop = $(".ie-greenTop")
		,	$greenRight = $(".ie-greenRight")
		,	$violetRight = $(".ie-violetRight")
		,	$redRight = $(".ie-redRight")
		,	$blueRight = $(".ie-blueRight")
		,	$blueBot = $(".ie-blueBot")
		,	$violetBot = $(".ie-violetBot")
		,	$366communities = $(".ie-366communities");

		$lt.bind(triggerClick, function(){
			$("#video1").removeClass("hidden");
		})
		$rt.bind(triggerClick, function(){
			$("#video4").removeClass("hidden");
		})
		$rb.bind(triggerClick, function(){
			$("#video2").removeClass("hidden");
		})
		$lb.bind(triggerClick, function(){
			$("#video3").removeClass("hidden");
		})

		setTimeout(function(){
			$lt.fadeIn();
			$orange.fadeIn(500);
		},500);
		setTimeout(function(){
			$rt.fadeIn();
			$greenTop.fadeIn(500);
			$greenRight.fadeIn(750);
		},1000);
		setTimeout(function(){
			$rb.fadeIn();
			$redRight.fadeIn(500);
			$violetRight.fadeIn(750);
			$blueRight.fadeIn(1000);
		},1500);
		setTimeout(function(){
			$lb.fadeIn();
			$red.fadeIn(500);
			$green.fadeIn(750);
			$blue.fadeIn(1000);
			$blueBot.fadeIn(500);
			$violetBot.fadeIn(750);
		},2000);
			$366communities.fadeIn();
		setTimeout(function(){
			$violetTop.fadeIn(750);
		},250);
	}
}else{//canvas OK

	var ctx = document.querySelector(".drawingArea canvas").getContext("2d");

	//monitoring
		var $monitx = $(".monitor .x")
		,	$monity = $(".monitor .y");
		function monitorPos(e){
			pos = getCursorPos(e)
			$monitx.html(pos.x);
			$monity.html(pos.y);
		}

	//start drawing
		// $drawingArea.bind(down, startMoving);
		function startMoving(e){
			if(imgReady){
				$(".rejouer").unbind(triggerClick);
				e.preventDefault();
				state = "start";
				drawing.push(startPos = getCursorPos(e));
				ctx.beginPath();
		     	// drawCircle(startPos);
				ctx.lineWidth = 1;
				ctx.strokeStyle = grey;
				ctx.stroke();
				ctx.closePath()
				state = "moving";

				polygon = new Polygon(startPos);
				oldPos = startPos;
				endPos = startPos;
				// setGrid(oldPos);
		 		clearTimeout(timerEnd);
				timerEnd = setTimeout(function(){
					movingEnd();
				},500);
			}else{
				// console.log("notReady");
			}
		}

	//moving drawing 
		var lineDiag = []
		,	timerEnd;
		// $drawingArea.bind(move, moving);
		function moving(e){
			ga('send', {
				'hitType': 'event',	// Required.
				'eventCategory': 'XP DESSIN',	// Required.
				'eventAction': 'Dessin',	// Required.
				'eventLabel': 'Dessin',
				// 'eventValue': 4
			});
			e.preventDefault();
			if(state == "moving"){
				ctx.beginPath();
				ctx.moveTo(oldPos.x, oldPos.y);
				drawing.push(endPos = getCursorPos(e));
				ctx.lineTo(endPos.x, endPos.y);
				ctx.lineWidth = 1;
				ctx.strokeStyle = grey;
				ctx.stroke();
				ctx.closePath();
	     		if(polygon.push(endPos)){
					lineDiag.push(new Line(polygon.list[polygon.length()-1], endPos,true))
	     			ctx.globalAlpha = 0.5;
					// setGrid(endPos);
	     			linePolygon.push(drawLine(polygon.list[polygon.length()-2], endPos, true));
	     			ctx.globalAlpha = 1;
	     		}
	     		setPolygonPoint(polygon.list);
	     		clearTimeout(timerEnd);
				timerEnd = setTimeout(function(){
					movingEnd();
				},500);
			}
			monitorPos(e);
			ctx.lineWidth = 1;
			ctx.strokeStyle = grey;
			oldPos = endPos;
		}

	//end drawing
		// $drawingArea.on(out, movingEnd);
		// $drawingArea.on(up, movingEnd);
		function movingEnd(){
			clearTimeout(timerEnd);
			state = "";
			var $this = $(this);
			ctx.beginPath();
			ctx.moveTo(endPos.x, endPos.y);
			drawing.push(endPos);
	     	ctx.arc(endPos.x, endPos.y, 2, 0, 2 * Math.PI, false);
			ctx.lineWidth = 1;
			ctx.strokeStyle = grey;
			ctx.stroke();
			ctx.closePath();
			// polygon = drawing.makePolygon()

	     	if(polygon.push(endPos)){
				lineDiag.push(new Line(polygon.list[polygon.length()-1], endPos,true))
	     		ctx.globalAlpha = 0.5;
	     		// setGrid(endPos);
	     		ctx.globalAlpha = 1;
	     	}
		 		ctx.globalAlpha = 0.5;
		 		linePolygon.push(drawLine(polygon.list[polygon.length()-1], startPos, true));
		 		ctx.globalAlpha = 1;
				drawPolygon(polygon.list, greyBlack);
				// setGridPoints();
	     	// console.log(gridPoints);
			// console.log(polygon.length());
	     	// if(gridPoints != undefined && gridPoints.length >= 5 && gridPoints[0].length >= 5 
	     	// 	&& (!mainPolygonSide.diagLT.isPoint && !mainPolygonSide.diagRT.isPoint && !mainPolygonSide.diagRB.isPoint && !mainPolygonSide.diagLB.isPoint)
	     	// ){
			errorNbPoints = false;
			errorNbPointsInGuid = false;
			var nbInGuid = 0;
			for (var i = 0; i < polygon.list.length; i++) {
				if(isPointInPoly(rectGuidPolygon, polygon.list[i])){
					nbInGuid++;
				}
			};
			if(polygon.length() >= 4){
				if(true){
		     		setMainRectRepere();
		     		if(mainPolygon.length > 3){
						setRectRepere();
						drawFinalPolygons();
						$drawingArea.unbind(up);
						$drawingArea.unbind(down);
						// $drawingArea.unbind(move);
						// $drawingArea.bind(move, monitorPos);
						$drawingArea.bind(down, clickPolygon);
						$drawingArea.bind(move, hoverPolygon);
						$(".rejouer").bind(triggerClick, resetDrawing);
		     		}else{
		     			errorNbPoints = true;
		     		}					
				}else{
	     			errorNbPointsInGuid = true;
	     		}
			}else{
				errorNbPoints = true;
			}
			if (errorNbPoints) {
				throwErrorNbPoints();
			}
			if(errorNbPointsInGuid){
				throwEerrorNbPointsInGuid();
			}
		}
	
	//erreurs
		function throwErrorNbPoints(){
			alert("pas assez de points detectés, veuillez recommencer");
			resetDrawing();
		}
		function throwEerrorNbPointsInGuid(){
			alert("pas assez de points dans le rectangle gris, veuillez recommencer");
			resetDrawing();
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

	function imageLoaded(){
		imgReady = true;
		ltImage = new Image();
		ltImage.src = 'public/dist/images/lt.jpg';
		rtImage = new Image();
		rtImage.src = 'public/dist/images/rt.jpg';
		rbImage = new Image();
		rbImage.src = 'public/dist/images/rb.jpg';
		lbImage = new Image();
		lbImage.src = 'public/dist/images/lb.jpg';
		mainImage = new Image();
		mainImage.src = 'public/dist/images/main.jpg';
	}
	resources.load([
	    'public/dist/images/lt.jpg',
	    'public/dist/images/rt.jpg',
	    'public/dist/images/rb.jpg',
	    'public/dist/images/lb.jpg',
	    'public/dist/images/main.jpg'
	]);
	resources.onReady(imageLoaded);

	//init variables
		var ltImage
		,	rtImage
		,	rbImage
		,	lbImage
		,	mainImage;

		var startPos
		,	oldPos
		,	endPos 
		,	currentPos = new Coord()
		,	state = ""
		//canvas options
		,	canvasWidth = $(".drawingArea").width()
		,	canvasHeight = $(".drawingArea").height()
		,	canvasTopLine = new Line(new Coord(0,0),new Coord(canvasWidth,0))
		,	canvasRightLine = new Line(new Coord(canvasWidth, 0), new Coord(canvasWidth, canvasHeight))
		,	canvasBotLine = new Line(new Coord(0,canvasHeight),new Coord(canvasWidth,canvasHeight))
		,	canvasLeftLine = new Line(new Coord(0, 0), new Coord(0, canvasHeight))
		// the user drawings
		,	drawing = new ListCoord()
		// the polygon generated by the drawing
		,	polygon
		,	imgReady = false
		,	greyBlack = "#333333"
		,	grey = "#666666"
		,	violet = "#992457"
		,	violetLight = "#d2046c"
		,	red = "#c32126"
		,	yellow = "#ec9129"
		,	yellowLight = "#ffd000"
		,	blueViolet = "#9383b5"
		,	blue = "#009fe3"
		,	blueGreen = "#40969e"
		,	blueDark = "#1c71b8"
		,	blueLight = "#54c2f0"
		,	orange = "#f28e00"
		,	orangeDark = "#b8662a"
		,	green = "#769c3f"
		,	rose = "#f195bf";

	$(window).resize(function(){
		canvasWidth = $(".drawingArea").width();
		canvasHeight = $(".drawingArea").height();
		$canvas[0].width = canvasWidth;
		$canvas[0].height = canvasHeight;
		ctx = document.querySelector(".drawingArea canvas").getContext("2d");

		canvasTopLine = new Line(new Coord(0,0),new Coord(canvasWidth,0));
		canvasRightLine = new Line(new Coord(canvasWidth, 0), new Coord(canvasWidth, canvasHeight));
		canvasBotLine = new Line(new Coord(0,canvasHeight),new Coord(canvasWidth,canvasHeight));
		canvasLeftLine = new Line(new Coord(0, 0), new Coord(0, canvasHeight));
		resetDrawing();
	});

	rectGuid = [];
	rectGuidPolygon = [];
	function setRectGuid(){
		ctx.fillStyle = "#ffffff"
		ctx.strokeStyle = "#eeeeee";
	    ctx.lineWidth = 7;
	    ctx.beginPath();
		rectGuid = {
			lt : new Coord( (canvasWidth*0.15), (canvasHeight *0.15) ),
			rt : new Coord( (canvasWidth - canvasWidth*0.15), (canvasHeight *0.15) ),
			rb : new Coord( (canvasWidth - canvasWidth*0.15), (canvasHeight - canvasHeight *0.15) ),
			lb : new Coord( (canvasWidth*0.15), (canvasHeight - canvasHeight *0.15))
		}
		rectGuidPolygon = [
			new Coord( (canvasWidth*0.15), (canvasHeight *0.15) ),
			new Coord( (canvasWidth - canvasWidth*0.15), (canvasHeight *0.15) ),
			new Coord( (canvasWidth - canvasWidth*0.15), (canvasHeight - canvasHeight *0.15) ),
			new Coord( (canvasWidth*0.15), (canvasHeight - canvasHeight *0.15))
		]
		drawRect(
			rectGuid.lt,
			rectGuid.rt,
			rectGuid.rb,
			rectGuid.lb
		);
		ctx.stroke();
	    ctx.lineWidth = 1;

	      ctx.font = 'italic 40pt Calibri';
	      ctx.fillStyle = '#eeeeee';
	      ctx.textAlign = 'center';
	      ctx.textBaseline = 'middle';
	      ctx.fillText('Dessinez dans le rectangle gris', canvasWidth/2, canvasHeight/2);
	}


	function resetDrawing(e){
		try{
			e.preventDefault();
			e.stopPropagation();
		}catch(e){

		}
		try{
			stopAnim = true;
			setTimeout(function(){
				stopAnim = false;
			},50)
			animationsEnded = 5;
			// thisISMyFinalForme();
		}catch(e){/*console.log(e);*/}
		clearTimeout(idTimeoutAnim);
		drawing = new ListCoord();
		lineDiag = [];
		linePolygon = [];
		coordsX = [];
		coordsY = [];
		lineVertical = [];
		lineHorizontal = [];
		animationsEnded = 0;

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		setRectGuid();

		$drawingArea.unbind(down);
		$drawingArea.on(down, startMoving);
		$drawingArea.unbind(up);
		$drawingArea.on(up, movingEnd);
		$drawingArea.unbind(move);
		$drawingArea.removeClass("pointer");
		$drawingArea.bind(move, moving);

		ga('send', {
			'hitType': 'event',	// Required.
			'eventCategory': 'home',	// Required.
			'eventAction': 'Revivre l\'Xp',	// Required.
			'eventLabel': 'Re-chargement de la home',
			// 'eventValue': 4
		});
	}resetDrawing();

	//event polygon
		function clickPolygon(e){
			var pt = new Coord(e.clientX, e.clientY);
			// if(isPointInPoly(mainPolygon, pt)){
			// 	$("#video1").removeClass("hidden")
				setCroppedImage(mainPolygon, mainRect, mainImage, green, green, true);
			// }
			if(isPointInPoly(LTPolygon, pt)){
				$pageVideo = $("#video1");
				$pageVideo.removeClass("hidden")
				$pageVideo.find("video")
				$video = $pageVideo.find('video');
				$pageVideo.addClass("playing");
				$video[0].play();
				setCroppedImage(LTPolygon, LTRect, ltImage, violet, violet, false, true);
			}
			if(isPointInPoly(RTPolygon, pt)){
				$pageVideo = $("#video4");
				$pageVideo.removeClass("hidden")
				$pageVideo.find("video")
				$video = $pageVideo.find('video');
				$pageVideo.addClass("playing");
				$video[0].play();
				setCroppedImage(RTPolygon, RTRect, rtImage, red, red, false, true);
			}
			if(isPointInPoly(RBPolygon, pt)){
				$pageVideo = $("#video2");
				$pageVideo.removeClass("hidden")
				$pageVideo.find("video")
				$video = $pageVideo.find('video');
				$pageVideo.addClass("playing");
				$video[0].play();
				setCroppedImage(RBPolygon, RBRect, rbImage, yellow, yellow, false, true);
			}
			if(isPointInPoly(LBPolygon, pt)){
				$pageVideo = $("#video3");
				$pageVideo.removeClass("hidden")
				$pageVideo.find("video")
				$video = $pageVideo.find('video');
				$pageVideo.addClass("playing");
				$video[0].play();
				setCroppedImage(LBPolygon, LBRect, lbImage, blueViolet, blueViolet, false, true);
			}
		}

		function hoverPolygon(e){
			var pt = new Coord(e.clientX, e.clientY);
			// if(isPointInPoly(mainPolygon, pt)){
			// 	$("#video1").removeClass("hidden")
			// 	setCroppedImage(mainPolygon, mainRect, mainImage, green, green, true);
			// }
			$drawingArea.removeClass("pointer");
			if(isPointInPoly(LTPolygon, pt)){
				$drawingArea.addClass("pointer");
				// ctx.save();
				// setCroppedImage(LTPolygon, LTRect, ltImage, violet, violet);
				// drawRect(LTRect);
				// ctx.shadowColor = violet;	
				// ctx.shadowBlur = 20;
				// ctx.fill();
				// ctx.restore();
			}
			if(isPointInPoly(RTPolygon, pt)){
				$drawingArea.addClass("pointer");
				// setCroppedImage(RTPolygon, RTRect, rtImage, red, red);
			}
			if(isPointInPoly(RBPolygon, pt)){
				$drawingArea.addClass("pointer");
				// setCroppedImage(RBPolygon, RBRect, rbImage, yellow, yellow);
			}
			if(isPointInPoly(LBPolygon, pt)){
				$drawingArea.addClass("pointer");
				// setCroppedImage(LBPolygon, LBRect, lbImage, blueViolet, blueViolet);
			}
			// setCroppedImage(LTPolygon, LTRect, ltImage, violet, violet);
		}

	//grid
		var coordsX = []
		,	coordsY = []
		,	lineVertical = []
		,	lineHorizontal = [];
		function setGrid(coord){
			var lissage = 30; 
			coordsX.push(coord);
			coordsY.push(coord);
			coordsX.sort(compareCoordX);
			coordsY.sort(compareCoordY);
			// supprime les lignes trop proches
				var i = 1;
				while (i < coordsX.length) {
					if(getDelta(coordsX[i-1].x, coordsX[i].x) < lissage){
						coordsX.splice(i,1);
					}else{
						i++;
					}
				}
				i = 1;
				while (i < coordsY.length) {
					if(getDelta(coordsY[i-1].y, coordsY[i].y) < lissage){
						coordsY.splice(i,1);
					}else{
						i++;
					}
				}
			//trace les lignes et les stocke dans un tableau
			ctx.strokeStyle = "#ddd";
			for (var i = 0, len = coordsX.length; i < len; i++) {
				ctx.beginPath();
				ctx.moveTo(coordsX[i].x, 0);
				ctx.lineTo(coordsX[i].x, canvasHeight);
				ctx.stroke();
				ctx.closePath();
				lineVertical[i] = new Line(new Coord(coordsX[i].x, 0), new Coord(coordsX[i].x, canvasHeight));
			}
			for (var i = 0, len = coordsY.length; i < len; i++) {
				ctx.beginPath();
				ctx.moveTo(0, coordsY[i].y);
				ctx.lineTo(canvasWidth, coordsY[i].y);
				ctx.stroke();
				ctx.closePath();
				lineHorizontal[i] = new Line(new Coord(0, coordsY[i].y), new Coord(canvasWidth, coordsY[i].y));
			}
		}

		var gridPoints
		function setGridPoints(){
			gridPoints = [];
			lineVertical.unshift(new Line(new Coord(0,0), new Coord(0, canvasHeight)));
			lineHorizontal.unshift(new Line(new Coord(0, 0), new Coord(canvasWidth, 0)));
			lineVertical.push(new Line(new Coord(canvasWidth, 0), new Coord(canvasWidth, canvasHeight)));
			//ajout d'une ligne horizontale avant la dernière
			var newPreLastY = lineHorizontal[lineHorizontal.length-2].p1.y + (canvasHeight - lineHorizontal[lineHorizontal.length-2].p1.y) / 2;

			lineHorizontal.push(new Line(new Coord(0, newPreLastY), new Coord(canvasWidth, newPreLastY)));
			lineHorizontal.push(new Line(new Coord(0, canvasHeight), new Coord(canvasWidth, canvasHeight)));
			for (var i = 0; i < lineVertical.length; i++) {
				gridPoints[i] = [];
				for (var j = 0; j < lineHorizontal.length; j++) {
					p = checkLineIntersection(lineVertical[i], lineHorizontal[j])
					ctx.strokeStyle = "#ff0000";
					// drawCircle(p);
					gridPoints[i].push(p);
				}
			}
			gridPoints[0][0] = new Coord(0,0);
		}

	//repere rectangles
		var mainRect;
		function drawMainRect(){
			mainRect = [];
			// polygon
			var lt = new Coord(polygon.maxLeft, polygon.maxTop)
			,   rt = new Coord(polygon.maxRight, polygon.maxTop)
			,   rb = new Coord(polygon.maxRight, polygon.maxBot)
			,   lb = new Coord(polygon.maxLeft, polygon.maxBot);

			//recadrage par raport au rectGuid
			if(lt.x < rectGuid.lt.x) lt.x = rectGuid.lt.x;
			if(lt.y < rectGuid.lt.y) lt.y = rectGuid.lt.y;

			if(rt.x > rectGuid.rt.x) rt.x = rectGuid.rt.x;
			if(rt.y < rectGuid.rt.y) rt.y = rectGuid.rt.y;

			if(rb.x > rectGuid.rb.x) rb.x = rectGuid.rb.x;
			if(rb.y > rectGuid.rb.y) rb.y = rectGuid.rb.y;

			if(lb.x < rectGuid.lb.x) lb.x = rectGuid.lb.x;
			if(lb.y > rectGuid.lb.y) lb.y = rectGuid.lb.y;

	        ctx.globalAlpha = 0.1;
			ctx.fillStyle = '#8D8DE0';
			ctx.beginPath();
			drawRect(lt, rt, rb, lb);
	        ctx.fill();
	        ctx.lineWidth = 1;
	        ctx.stroke();
			ctx.closePath();
	        ctx.globalAlpha = 1;
	        mainRect = {
	        	lt : lt,
				rt : rt,
				rb : rb,
				lb : lb
			};
	    }

		var LTRect;
		function drawLTRect(fillStyle){
			LTRect = [];
			var lt = gridPoints[0][0]
			,	rt = gridPoints[2][0]
			,	rb = gridPoints[2][2]
			,	lb = gridPoints[0][2];
	        ctx.globalAlpha = 0;
			ctx.fillStyle = fillStyle;
			ctx.beginPath();
			drawRect(lt, rt, rb, lb);
	        ctx.fill();
	        ctx.lineWidth = 1;
	        ctx.stroke();
			ctx.closePath();
	        ctx.globalAlpha = 1;
	        LTRect = {
	        	lt : lt,
				rt : rt,
				rb : rb,
				lb : lb
			};
	    }

		var RTRect;
		function drawRTRect(fillStyle){
			RTRect = [];
			var lt = gridPoints[gridPoints.length-3][0]
			,	rt = gridPoints[gridPoints.length-1][0]
			,	rb = gridPoints[gridPoints.length-1][2]
			,	lb = gridPoints[gridPoints.length-3][2];
	        ctx.globalAlpha = 0;
			ctx.fillStyle = fillStyle;
			ctx.beginPath();
			drawRect(lt, rt, rb, lb);
	        ctx.fill();
	        ctx.lineWidth = 1;
	        ctx.stroke();
			ctx.closePath();
	        ctx.globalAlpha = 1;
	        RTRect = {
	        	lt : lt,
				rt : rt,
				rb : rb,
				lb : lb
	        }
		}

		var RBRect;
		function drawRBRect(fillStyle){
			RBRect = []
			var lt = gridPoints[gridPoints.length-3][gridPoints[0].length-3]
			,	rt = gridPoints[gridPoints.length-1][gridPoints[0].length-3]
			,	rb = gridPoints[gridPoints.length-1][gridPoints[0].length-1]
			,	lb = gridPoints[gridPoints.length-3][gridPoints[0].length-1];
	        ctx.globalAlpha = 0;
			ctx.fillStyle = fillStyle;
			ctx.beginPath();
			drawRect(lt, rt, rb, lb);
	        ctx.fill();
	        ctx.lineWidth = 1;
	        ctx.stroke();
			ctx.closePath();
	        ctx.globalAlpha = 1;
	        RBRect = {
	        	lt : lt,
				rt : rt,
				rb : rb,
				lb : lb
	        };
		}

		var LBRect;
		function drawLBRect(fillStyle){
			LBRect = []
			lt = gridPoints[0][gridPoints[0].length-4];
			rt = gridPoints[2][gridPoints[0].length-4];
			rb = gridPoints[2][gridPoints[0].length-1];
			lb = gridPoints[0][gridPoints[0].length-1];
	        ctx.globalAlpha = 0;
			ctx.fillStyle = fillStyle;
			ctx.beginPath();
			drawRect(lt, rt, rb, lb);
	        ctx.fill();
	        ctx.lineWidth = 1;
	        ctx.stroke();
			ctx.closePath();
	        ctx.globalAlpha = 1;
	        LBRect = {
	        	lt : lt,
				rt : rt,
				rb : rb,
				lb : lb
	        }
		}

	//polygon
		var mainPolygon
		,	mainPolygonSide;
		function makeMainPolygon(){
			mainPolygon = [];
			mainPolygonSide = {};
			var horTopLane = new Line(mainRect.lt, mainRect.rt)
			,	horTopSide = []
			,	vertRightLane = new Line(mainRect.rt, mainRect.rb)
			,	vertRightSide = []
			,	horBotLane = new Line(mainRect.lb, mainRect.rb)
			,	horBotSide = []
			,	vertLeftLane = new Line(mainRect.lb, mainRect.lt)
			,	vertLeftSide = [];

			for (var i = 0; i < linePolygon.length; i++) {
				pt = checkLineIntersection(horTopLane, linePolygon[i], true);
				if(checkPointOnLine(pt, horTopLane, false)){
					if(pt.isEqual(mainRect.lt)){
						p1 = new Coord(pt.x, pt.y+30);
						p2 = new Coord(pt.x+30, pt.y);
						vertLeftSide.push(p1);
						horTopSide.push(p2);
					}else{
						if(pt.isEqual(mainRect.rt)){
							p1 = new Coord(pt.x-30, pt.y);
							p2 = new Coord(pt.x, pt.y+30);
							horTopSide.push(p1);
							vertRightSide.push(p2);
						}else{
							horTopSide.push(pt);
						}
					}
					// drawCircle(pt);
				}
				pt = checkLineIntersection(vertRightLane, linePolygon[i], true);
				if(checkPointOnLine(pt, vertRightLane, false)){
					if(pt.isEqual(mainRect.rt)){
						p1 = new Coord(pt.x-30, pt.y)
						p2 = new Coord(pt.x, pt.y+30)
						horTopSide.push(p1);
						vertRightSide.push(p2);
					}else{
						if(pt.isEqual(mainRect.rb)){
							p1 = new Coord(pt.x-30, pt.y)
							p2 = new Coord(pt.x, pt.y-30)
							horBotSide.push(p1);
							vertRightSide.push(p2);
						}else{
							vertRightSide.push(pt);
						}
					}
					// drawCircle(pt);
				}
				pt = checkLineIntersection(horBotLane, linePolygon[i], true);
				if(checkPointOnLine(pt, horBotLane, false)){
					if(pt.isEqual(mainRect.lb)){
						p1 = new Coord(pt.x, pt.y-30);
						p2 = new Coord(pt.x+30, pt.y);
						vertLeftSide.push(p1);		
						horBotSide.push(p2);		
					}else{
						if(pt.isEqual(mainRect.rb)){
							p1 = new Coord(pt.x-30, pt.y);
							p2 = new Coord(pt.x, pt.y-30);
							horBotSide.push(p1);
							vertRightSide.push(p2);
						}else{
							horBotSide.push(pt);
						}
					}
					// drawCircle(pt);
				}
				pt = checkLineIntersection(vertLeftLane, linePolygon[i], true);
				if(checkPointOnLine(pt, vertLeftLane, false)){
					if(pt.isEqual(mainRect.lt)){
						p1 = new Coord(pt.x+30, pt.y);
						p2 = new Coord(pt.x, pt.y+30);
						vertLeftSide.push(p2);
						horBotSide.push(p1);
					}else{
						if(pt.isEqual(mainRect.lb)){
							p1 = new Coord(pt.x+30, pt.y);
							p2 = new Coord(pt.x, pt.y-30);
							vertLeftSide.push(p2);
							horBotSide.push(p1);
						}else{
							vertLeftSide.push(pt);
						}
					}
					// drawCircle(pt);
				}
			};

			//lignes
			horTopSide.sort(compareCoordX);
			vertRightSide.sort(compareCoordY);
			horBotSide.sort(compareCoordXDec);
			vertLeftSide.sort(compareCoordYDec);

			mainPolygonSide.horTopSide = horTopSide;
			mainPolygonSide.vertRightSide = vertRightSide;
			mainPolygonSide.horBotSide = horBotSide;
			mainPolygonSide.vertLeftSide = vertLeftSide;

			mainPolygon = mainPolygonSide.horTopSide.concat(mainPolygonSide.vertRightSide).concat(mainPolygonSide.horBotSide).concat(mainPolygonSide.vertLeftSide);
			mainPolygon.removeDoublonCoord();

			// fixPolygonSide(mainPolygon, mainPolygonSide);
			try{
				mainPolygonSide.diagLT = new Line(mainPolygonSide.horTopSide[0], mainPolygonSide.vertLeftSide[mainPolygonSide.vertLeftSide.length-1]);
				mainPolygonSide.diagRT = new Line(mainPolygonSide.horTopSide[mainPolygonSide.horTopSide.length-1], mainPolygonSide.vertRightSide[0]);
				mainPolygonSide.diagRB = new Line(mainPolygonSide.vertRightSide[mainPolygonSide.vertRightSide.length-1], mainPolygonSide.horBotSide[0]);
				mainPolygonSide.diagLB = new Line(mainPolygonSide.horBotSide[mainPolygonSide.horBotSide.length-1], mainPolygonSide.vertLeftSide[0]);
			}catch(e){
				fixPolygonSide(mainPolygon, mainPolygonSide);
				if(mainPolygon.length <= 3){
					throwErrorNbPoints();
					return;
				}else{
					mainPolygonSide.diagLT = new Line(mainPolygonSide.horTopSide[0], mainPolygonSide.vertLeftSide[mainPolygonSide.vertLeftSide.length-1]);
					mainPolygonSide.diagRT = new Line(mainPolygonSide.horTopSide[mainPolygonSide.horTopSide.length-1], mainPolygonSide.vertRightSide[0]);
					mainPolygonSide.diagRB = new Line(mainPolygonSide.vertRightSide[mainPolygonSide.vertRightSide.length-1], mainPolygonSide.horBotSide[0]);
					mainPolygonSide.diagLB = new Line(mainPolygonSide.horBotSide[mainPolygonSide.horBotSide.length-1], mainPolygonSide.vertLeftSide[0]);
				}
			}
			if(mainPolygonSide.diagLT.isPoint){
				mainPolygonSide.diagLT = new Line(mainPolygonSide.horTopSide[0], mainPolygonSide.vertLeftSide[0]);
			}
			if(mainPolygonSide.diagRT.isPoint){
				mainPolygonSide.diagRT = new Line(mainPolygonSide.horTopSide[0], mainPolygonSide.vertRightSide[0]);
			}
			if(mainPolygonSide.diagRB.isPoint){
				mainPolygonSide.diagRB = new Line(mainPolygonSide.vertRightSide[0], mainPolygonSide.horBotSide[0]);
			}
			if(mainPolygonSide.diagLB.isPoint){
				new Line(mainPolygonSide.horBotSide[0], mainPolygonSide.vertLeftSide[0]);
			}
		}

		//fixe les cas où un coté est "vide"
		function fixPolygonSide(polygon, polygonSide){
			//left
			if(polygonSide.vertLeftSide.length < 2){
				if(polygonSide.horBotSide.length > 0){
					polygonSide.vertLeftSide.unshift(polygonSide.horBotSide[polygonSide.horBotSide.length-1]);
				}
				if(polygonSide.horTopSide.length > 0){
					polygonSide.vertLeftSide.push(polygonSide.horTopSide[0]);
				}
			}
			//right
			if(polygonSide.vertRightSide.length < 2){
				if(polygonSide.horTopSide.length > 0){
					polygonSide.vertRightSide.unshift(polygonSide.horTopSide[polygonSide.horTopSide.length-1]);
				}
				if(polygonSide.horBotSide.length > 0){
					polygonSide.vertRightSide.push(polygonSide.horBotSide[0]);
				}
			}
			//top
			if(polygonSide.horTopSide.length < 2){
				if(polygonSide.vertLeftSide.length > 0){
					polygonSide.horTopSide.unshift(polygonSide.vertLeftSide[polygonSide.vertLeftSide.length-1]);
				}
				if(polygonSide.vertRightSide.length > 0){
					polygonSide.horTopSide.push(polygonSide.vertRightSide[0]);
				}
			}
			//bottom
			if(polygonSide.horBotSide.length < 2){
				if(polygonSide.vertRightSide.length > 0){
					polygonSide.horBotSide.unshift(polygonSide.vertRightSide[polygonSide.vertRightSide.length-1]);
				}
				if(polygonSide.vertLeftSide.length > 0){
					polygonSide.horBotSide.push(polygonSide.vertLeftSide[0]);
				}
			}

			polygonSide.vertRightSide.sort(compareCoordY);
			polygonSide.vertRightSide.removeDoublonCoord();
			polygonSide.horBotSide.sort(compareCoordXDec);
			polygonSide.horBotSide.removeDoublonCoord();
			polygonSide.vertLeftSide.sort(compareCoordYDec);
			polygonSide.vertLeftSide.removeDoublonCoord();
			polygonSide.horTopSide.sort(compareCoordX);
			polygonSide.horTopSide.removeDoublonCoord();
		}

		var LTPolygon
		,	LTPolygonSide;
		function makeLTPolygon(){
			LTPolygon = [];
			LTPolygonSide = {};
			var horTopLane = new Line(LTRect.lt, LTRect.rt)
			,	horTopSide = []
			,	vertRightLane = new Line(LTRect.rt, LTRect.rb)
			,	vertRightSide = []
			,	horBotLane = new Line(LTRect.lb, LTRect.rb)
			,	horBotSide = []
			,	vertLeftLane = new Line(LTRect.lb, LTRect.lt)
			,	vertLeftSide = [];

			//top
				ptT1 = checkLineIntersection(canvasTopLine, mainPolygonSide.diagLT);
				ptT1Bol = checkPointOnLine(ptT1, canvasTopLine);
				ptT2 = checkLineIntersection(canvasTopLine, mainPolygonSide.diagRT);
				ptT2Bol = checkPointOnLine(ptT2, canvasTopLine);
				ptT3 = checkLineIntersection(mainPolygonSide.diagLB, canvasTopLine);
				ptT3Bol = checkPointOnLine(ptT3, canvasTopLine);

			//right
				ptR1 = checkLineIntersection(mainPolygonSide.diagLT, mainPolygonSide.diagRT);

			//left
				ptL1 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagLT);
				ptL1Bol = checkPointOnLine(ptL1, canvasLeftLine);
				ptL2 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagLB);
				ptL2Bol = checkPointOnLine(ptL2, canvasLeftLine);
				ptL3 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagRT);
				ptL3Bol = checkPointOnLine(ptL3, canvasLeftLine);

			//bot
				ptB1 = checkLineIntersection(mainPolygonSide.diagLT, mainPolygonSide.diagLB);

				if(ptT1.x < ptT2.x && ptT1Bol){
					horTopSide.push(ptT1);
				}else{
					if(ptT2Bol) horTopSide.push(ptT2);
					if(ptL3Bol) vertLeftSide.push(ptL3);
					vertRightSide.push(ptR1);
				}

				if(ptL1.y < ptL2.y && ptL1){
					vertLeftSide.push(ptL1);
				}else{
					if(ptL2Bol) vertLeftSide.push(ptL2);
					horBotSide.push(ptB1);
					if(ptT3Bol) horTopSide.push(ptT3);
				}

				if(!ptL3Bol && !ptT3Bol){
					vertLeftSide.push(LTRect.lt);
				}

			vertRightSide.sort(compareCoordY);
			horBotSide.sort(compareCoordXDec);
			vertLeftSide.sort(compareCoordYDec);
			horTopSide.sort(compareCoordX);

			LTPolygonSide.horTopSide = horTopSide;
			LTPolygonSide.vertRightSide = vertRightSide;
			LTPolygonSide.horBotSide = horBotSide;
			LTPolygonSide.vertLeftSide = vertLeftSide;


			LTPolygon = LTPolygonSide.horTopSide.concat(LTPolygonSide.vertRightSide).concat(LTPolygonSide.horBotSide).concat(LTPolygonSide.vertLeftSide);
			LTPolygon.removeDoublonCoord();

			fixPolygonSide(LTPolygon, LTPolygonSide);

			leftX = LTPolygon.getMinX().x;
			rightX = LTPolygon.getMaxX().x;
			botY = LTPolygon.getMaxY().y;
			topY = LTPolygon.getMinY().y;
			LTRect = {
				lt: {x: leftX,  y: topY},
				rt: {x: rightX, y: topY},
				rb: {x: rightX, y: botY},
				lb: {x: leftX,  y: botY}
			}
		}

		var RTPolygon
		,	RTPolygonSide;
		function makeRTPolygon(){
			RTPolygon = [];
			RTPolygonSide = {}
			var horTopSide = []
			,	vertRightSide = []
			,	horBotSide = []
			,	vertLeftLane = new Line(RTRect.lb, RTRect.lt)
			,	vertLeftSide = [];

			//toplane
				ptT1 = checkLineIntersection(canvasTopLine, mainPolygonSide.diagLT, false);
				ptT1Bol = checkPointOnLine(ptT1, canvasTopLine, false);
				ptT2 = checkLineIntersection(canvasTopLine, mainPolygonSide.diagRT, false);
				ptT2Bol = checkPointOnLine(ptT2, canvasTopLine, false);
				ptT3 = checkLineIntersection(canvasTopLine, mainPolygonSide.diagRB, true);
				ptT3Bol = checkPointOnLine(ptT3, canvasTopLine, false);

			//left
				ptL1 = checkLineIntersection(mainPolygonSide.diagLT, mainPolygonSide.diagRT, false);

			//right
				ptR1 = checkLineIntersection(canvasRightLine, mainPolygonSide.diagRT, true);
				ptR1Bol = checkPointOnLine(ptR1, canvasRightLine, false) 
				ptR2 = checkLineIntersection(canvasRightLine, mainPolygonSide.diagRB, true);
				ptR2Bol = checkPointOnLine(ptR2, canvasRightLine, false) 
				ptR3 = checkLineIntersection(canvasRightLine, mainPolygonSide.diagLT, true);
				ptR3Bol = checkPointOnLine(ptR3, canvasRightLine, false) 

			//bot
				ptB1 = checkLineIntersection(mainPolygonSide.diagRT, mainPolygonSide.diagRB, false);

			if(ptT1.x < ptT2.x && ptT2Bol ){
				if(ptT2Bol) horTopSide.push(ptT2);
			}else{
				if(ptT1Bol) horTopSide.push(ptT1);
				vertLeftSide.push(ptL1);
				if(ptR3Bol) horTopSide.push(ptR3);
			}

			if(ptR1.y < ptR2.y && ptR1Bol){
				vertRightSide.push(ptR1);
			}else{
				if(ptR2Bol) vertRightSide.push(ptR2);
				horBotSide.push(ptB1);
				if(ptT3Bol) horTopSide.push(ptT3);
			}

			if(!ptT3Bol && !ptR3Bol){
				vertRightSide.push(RTRect.rt);
			}

			horTopSide.sort(compareCoordX);
			vertRightSide.sort(compareCoordY);
			vertLeftSide.sort(compareCoordYDec);
			horBotSide.sort(compareCoordXDec);

			RTPolygonSide.horTopSide = horTopSide;
			RTPolygonSide.vertRightSide = vertRightSide;
			RTPolygonSide.vertLeftSide = vertLeftSide;
			RTPolygonSide.horBotSide = horBotSide;

			RTPolygon = RTPolygonSide.horTopSide.concat(RTPolygonSide.vertRightSide).concat(RTPolygonSide.horBotSide).concat(RTPolygonSide.vertLeftSide);
			RTPolygon.removeDoublonCoord();

			fixPolygonSide(RTPolygon, RTPolygonSide);

			leftX = RTPolygon.getMinX().x;
			rightX = RTPolygon.getMaxX().x;
			botY = RTPolygon.getMaxY().y;
			topY = RTPolygon.getMinY().y;
			RTRect = {
				lt: {x: leftX,  y: topY},
				rt: {x: rightX, y: topY},
				rb: {x: rightX, y: botY},
				lb: {x: leftX,  y: botY}
			}
		}

		var RBPolygon
		,	RBPolygonSide;
		function makeRBPolygon(){
			RBPolygon = [];
			RBPolygonSide = {}
			//make main polygon
			var horTopLane = new Line(RBRect.lt, RBRect.rt)
			,	horTopSide = []
			,	vertRightLane = new Line(RBRect.rt, RBRect.rb)
			,	vertRightSide = []
			,	horBotLane = new Line(RBRect.lb, RBRect.rb)
			,	horBotSide = []
			,	vertLeftLane = new Line(RBRect.lb, RBRect.lt)
			,	vertLeftSide = [];

			//BOTLANE
				ptB1 = checkLineIntersection(canvasBotLine, mainPolygonSide.diagRT, true);
				ptB1Bol = checkPointOnLine(ptB1, canvasBotLine, false);
				ptB2 = checkLineIntersection(canvasBotLine, mainPolygonSide.diagRB, true);
				ptB2Bol = checkPointOnLine(ptB2, canvasBotLine, false);
				ptB3 = checkLineIntersection(canvasBotLine, mainPolygonSide.diagLB, true);
				ptB3Bol = checkPointOnLine(ptB3, canvasBotLine, false);
				ptB4 = checkLineIntersection(mainPolygonSide.diagRB, mainPolygonSide.diagLB, false);

			//RIGHT LANE
				ptR1 = checkLineIntersection(canvasRightLine, mainPolygonSide.diagRT, true);
				ptR1Bol = checkPointOnLine(ptR1, canvasRightLine, false);
				ptR2 = checkLineIntersection(canvasRightLine, mainPolygonSide.diagRB, true);
				ptR2Bol = checkPointOnLine(ptR2, canvasRightLine, false);
				ptR3 = checkLineIntersection(canvasRightLine, mainPolygonSide.diagLB, true);
				ptR3Bol = checkPointOnLine(ptR3, canvasRightLine, false);
				ptR4 = checkLineIntersection(mainPolygonSide.diagRT, mainPolygonSide.diagRB, false);


			if(ptB1Bol) horBotSide.push(ptB1);

			if(ptB2.x > ptB3.x && ptB2Bol){
				horBotSide.push(ptB2);
			}else{
				if(ptB3Bol){
					horBotSide.push(ptB3);
				}
				vertLeftSide.push(ptB4);
			}

			if(ptR1.y < ptR2.y && ptR2Bol){
				vertRightSide.push(ptR2);
			}else{
				if(ptR1Bol) vertRightSide.push(ptR1);
				horTopSide.push(ptR4);
			}

			if(ptR3Bol){
				vertRightSide.push(ptR3);
			}
			if(!ptB1Bol && ptB1Bol != undefined && !ptR3Bol && ptR3Bol != undefined){
				vertRightSide.push(RBRect.rb);
			}

			horTopSide.sort(compareCoordX);
			vertRightSide.sort(compareCoordY);
			vertLeftSide.sort(compareCoordYDec);
			horBotSide.sort(compareCoordXDec);


			RBPolygonSide.horTopSide = horTopSide;
			RBPolygonSide.vertRightSide = vertRightSide;
			RBPolygonSide.horBotSide = horBotSide;
			RBPolygonSide.vertLeftSide = vertLeftSide;

			RBPolygon = horTopSide.concat(vertRightSide).concat(horBotSide).concat(vertLeftSide);
			RBPolygon.removeDoublonCoord();

			fixPolygonSide(RBPolygon, RBPolygonSide);

			leftX = RBPolygon.getMinX().x;
			rightX = RBPolygon.getMaxX().x;
			botY = RBPolygon.getMaxY().y;
			topY = RBPolygon.getMinY().y;
			RBRect = {
				lt: {x: leftX,  y: topY},
				rt: {x: rightX, y: topY},
				rb: {x: rightX, y: botY},
				lb: {x: leftX,  y: botY}
			}
		}

		var LBPolygon
		,	LBPolygonSide;
		function makeLBPolygon(){
			LBPolygon = []
			LBPolygonSide = {}
			var horTopLane = new Line(LBRect.lt, LBRect.rt)
			,	horTopSide = []
			,	vertRightLane = new Line(LBRect.rt, LBRect.rb)
			,	vertRightSide = []
			,	horBotLane = new Line(LBRect.lb, LBRect.rb)
			,	horBotSide = []
			,	vertLeftLane = new Line(LBRect.lb, LBRect.lt)
			,	vertLeftSide = [];

			//bottom
				ptB1 = checkLineIntersection(canvasBotLine, mainPolygonSide.diagLB, false);
				ptB1Bol = checkPointOnLine(ptB1, canvasBotLine, false);
				ptB2 = checkLineIntersection(canvasBotLine, mainPolygonSide.diagRB, false);
				ptB2Bol = checkPointOnLine(ptB2, canvasBotLine, false);
				ptB3 = checkLineIntersection(mainPolygonSide.diagLT, canvasBotLine);
				ptB3Bol =checkPointOnLine(ptB3, canvasBotLine, false);

			//left
				ptL1 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagLT);
				ptL1Bol = checkPointOnLine(ptL1, canvasLeftLine);
				ptL2 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagLB);
				ptL2Bol = checkPointOnLine(ptL2, canvasLeftLine);
				ptL3 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagLB);
				ptL3Bol = checkPointOnLine(ptL3, canvasLeftLine, false);
				ptL4 = checkLineIntersection(canvasLeftLine, mainPolygonSide.diagRB);
				ptL4Bol = checkPointOnLine(ptL4, canvasLeftLine, false);

			//right
				ptR1 = checkLineIntersection(mainPolygonSide.diagLB, mainPolygonSide.diagRB);

			//top
				ptT1 = checkLineIntersection(mainPolygonSide.diagLT, mainPolygonSide.diagLB);

				if(ptB1.x < ptB2.x && ptB2Bol){
					horBotSide.push(ptB1);
				}else{
					if(ptB2Bol){
						horBotSide.push(ptB2);
					}else{
						if(ptL3Bol) vertLeftSide.push(ptL3);
					}
					vertRightSide.push(ptR1);
					if(ptL4Bol){
						vertLeftSide.push(ptL4);
					}
					if(ptB3Bol){
						vertLeftSide.push(ptB3);
					}
				}

				if(ptL1.y < ptL2.y && ptL2){
					vertLeftSide.push(ptL2);
				}else{
					if(ptL1Bol) vertLeftSide.push(ptL1);
					horTopSide.push(ptT1);

					if(ptB3Bol) horBotSide.push(ptB3);
					if(ptL4Bol) horBotSide.push(ptL4);
				}

				if(!ptB3Bol && ptL1Bol){
					vertLeftSide.push(LBRect.lb);
				}
			
			horTopSide.sort(compareCoordX);
			vertRightSide.sort(compareCoordY);
			vertLeftSide.sort(compareCoordYDec);
			horBotSide.sort(compareCoordXDec);

			LBPolygonSide.horTopSide = horTopSide;
			LBPolygonSide.vertRightSide = vertRightSide;
			LBPolygonSide.horBotSide = horBotSide;
			LBPolygonSide.vertLeftSide = vertLeftSide;

			LBPolygon = horTopSide.concat(vertRightSide).concat(horBotSide).concat(vertLeftSide);
			LBPolygon.removeDoublonCoord();

			fixPolygonSide(LBPolygon, LBPolygonSide);

			leftX = LBPolygon.getMinX().x;
			rightX = LBPolygon.getMaxX().x;
			botY = LBPolygon.getMaxY().y;
			topY = LBPolygon.getMinY().y;
			LBRect = {
				lt: {x: leftX,  y: topY},
				rt: {x: rightX, y: topY},
				rb: {x: rightX, y: botY},
				lb: {x: leftX,  y: botY}
			}
		}

	//triangles
		function drawTriangles(){

			if(LTPolygonSide.horTopSide.length > 0){
				LTPolygonTop = LTPolygonSide.horTopSide[LTPolygonSide.horTopSide.length-1];
			}else{
				LTPolygonTop = LTPolygonSide.vertLeftSide[LTPolygonSide.vertLeftSide.length-1];
			}
			// if(horBotSide)
			ctx.lineWidth = 1;
			triangle1 = [
				mainPolygonSide.horTopSide[0],
				LTPolygonTop,
				new Coord(0,0),
				new Coord(canvasWidth,0),
				RTPolygonSide.horTopSide[0],
				mainPolygonSide.horTopSide[mainPolygonSide.horTopSide.length-1]
			];
			drawPolygon(triangle1, blueGreen, blueGreen);

			// if(LBPolygonSide.horTopSide.length == 0){
			// 	LBtop = LBPolygonSide.vertLeftSide[LBPolygonSide.vertLeftSide.length-1];
			// }else{
			// 	LBtop = LBPolygonSide.horTopSide[0]
			// }
			// if(LTPolygonSide.horBotSide.length > 0 ){
			// 	LTBot = LTPolygonSide.horBotSide[LTPolygonSide.horBotSide.length-1]
			// }else{
			// 	LTBot = LTPolygonSide.vertLeftSide[0];
			// }
			// triangle2 = [
			// 	LTBot,
			// 	checkLineIntersection(mainPolygonSide.diagLB, canvasLeftLine,true),
			// 	checkLineIntersection(mainPolygonSide.diagLT, canvasLeftLine,true),
			// 	LBtop
			// ]
			// drawPolygon(triangle2, blue, blue);

			triangle4 = [
				checkLineIntersection(mainPolygonSide.diagLB, canvasBotLine,true),
				checkLineIntersection(mainPolygonSide.diagRB, canvasBotLine,true),
				checkLineIntersection(mainPolygonSide.diagRB, mainPolygonSide.diagLB,true),
			];
			drawPolygon(triangle4, blueDark, blueDark);


			triangle6 = [
				checkLineIntersection(mainPolygonSide.diagRT, canvasRightLine,true),
				checkLineIntersection(mainPolygonSide.diagRB, canvasRightLine,true),
				checkLineIntersection(mainPolygonSide.diagRB, mainPolygonSide.diagRT)
			];
			drawPolygon(triangle6, blueLight, blueLight);


			// triangle9 = [
			// 	mainPolygonSide.vertRightSide[0],
			// 	mainPolygonSide.vertRightSide[mainPolygonSide.vertRightSide.length-1],
			// 	checkLineIntersection(mainPolygonSide.diagRB, mainPolygonSide.diagRT)
			// ];
			// drawPolygon(triangle9,  violetLight, violetLight);


			// triangle8 = [
			// 	mainPolygonSide.horBotSide[0],
			// 	mainPolygonSide.horBotSide[mainPolygonSide.horBotSide.length-1],
			// 	checkLineIntersection(mainPolygonSide.diagRB, mainPolygonSide.diagLB,true)
			// ];
			// drawPolygon(triangle8, red, red);

			triangle10 = [
				checkLineIntersection(mainPolygonSide.diagLT, mainPolygonSide.diagLB,true),
				mainPolygonSide.vertLeftSide[0],
				mainPolygonSide.vertLeftSide[mainPolygonSide.vertLeftSide.length-1]
			];
			drawPolygon(triangle10, orange, orange);

			triangle11 = [
				checkLineIntersection(mainPolygonSide.diagLT, mainPolygonSide.diagRT),
				mainPolygonSide.horTopSide[0],
				mainPolygonSide.horTopSide[mainPolygonSide.horTopSide.length-1]
			];
			drawPolygon(triangle11, yellowLight, yellowLight);
		}

	//reperes
		function setMainRectRepere(){
			drawMainRect(green);
			makeMainPolygon();
			for(var i=0; i < mainPolygon.length-1; i++){
				setGrid(mainPolygon[i]);
			}
			setGridPoints();
		}
		function setRectRepere(){
			drawLTRect(violet);
			drawRTRect(red);
			drawRBRect(yellow);
			drawLBRect(blueViolet);
			// drawMainRect(green);
		}

	//dessins finaux
		var animationsEnded = 0
		,	idTimeoutAnim
		,	stopAnim = false;
		function drawFinalPolygons(){
			// makeMainPolygon();
			makeLTPolygon();
			makeRTPolygon();
			makeRBPolygon();
			makeLBPolygon();
			// makeMainPolygonFinal();

				// ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	        ctx.lineWidth = 2;
	        drawPolygon(mainPolygon, "#aaaaaa");
	        animationsEnded = 0;
			drawPolygonAnimated(LTPolygon, violet, "transparent", 100, function(){
				setCroppedImage(LTPolygon, LTRect, ltImage, violet, violet, false, true);
				animationsEnded++;
				thisISMyFinalForme();
			});
			drawPolygonAnimated(RTPolygon, red, "transparent", 100, function(){
				setCroppedImage(RTPolygon, RTRect, rtImage, red, red, false, true);
				animationsEnded++;
				thisISMyFinalForme();
			});
			drawPolygonAnimated(RBPolygon, yellow, "transparent", 100, function(){
				setCroppedImage(RBPolygon, RBRect, rbImage, yellow, yellow, false, true);
				animationsEnded++;
				thisISMyFinalForme();
			});
			drawPolygonAnimated(LBPolygon, blueViolet, "transparent", 100, function(){
				setCroppedImage(LBPolygon, LBRect, lbImage, blueViolet, blueViolet, false, true);
				animationsEnded++;
				thisISMyFinalForme();
			});
			drawPolygonAnimated(mainPolygon, green, "transparent", 1000, function(){
				setCroppedImage(mainPolygon, mainRect, mainImage, green, green, true);
				animationsEnded++;
				thisISMyFinalForme();
			});
			//cas ou les animations seraient trop lentes
			idTimeoutAnim = setTimeout(function(){
				if(!stopAnim){
					animationsEnded = 5;
					thisISMyFinalForme();
					stopAnim = true;
				}
			},6000)
		}

		function thisISMyFinalForme(){
			if(animationsEnded == 5){

				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				drawTriangles();

				ctx.lineWidth = 1;
				setCroppedImage(mainPolygon, mainRect, mainImage, green, green, true);
				setCroppedImage(LTPolygon, LTRect, ltImage, violet, violet, false, true);
				setCroppedImage(RTPolygon, RTRect, rtImage, red, red, false, true);
				setCroppedImage(LBPolygon, LBRect, lbImage, blueViolet, blueViolet, false, true);
				setCroppedImage(RBPolygon, RBRect, rbImage, yellow, yellow, false, true);
			}

			// for(var i = 0; i <= mainPolygon.length-1; i++){
			// 	if(i == mainPolygon.length-1){
			// 		p1 = mainPolygon[i];
			// 		p2 = mainPolygon[0];
			// 	}else{
			// 		p1 = mainPolygon[i];
			// 		p2 = mainPolygon[i+1];
			// 	}
			// 	line = new Line(p1, p2);
			// 	linePolygon.push(line);
			// 	drawLine(p1, p2, true);
			// }
		}



	//rendering loop
		// var idAnimFrame;
		// function render(){
		// 	idAnimFrame = requestAnimationFrame(function(){
		// 		//loop that

		// 		//recursive
		// 		render();
		// 	});
		// }
}