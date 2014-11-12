$(document).ready(function(){
	$(".exemple").each(function(){
		var $this = $(this)
		,	$canvas = $('<canvas width="500" height="500"></canvas>');
			
		$this.append($canvas);
		id = $this.attr("id");
		$canvas = $("#"+id).find("canvas");
		switch(id){
			case "detectClick":
				detectClick($canvas);
			break;

			case "draw":
				drawing($canvas);
			break;

			case "exempleLine1":
				exempleLine1($canvas);
			break;

			case "exempleLine2":
				exempleLine2($canvas);
			break;

			case "":
			break;

			default:
			break;
		}
	});

	function exempleLine1(){
		$canvas[0].ctx = $canvas[0].getContext("2d");
		$canvas[0].state = "waiting";
		$canvas[0].timerEnd = "";
		$canvas[0].$canvas= $canvas;
		$canvas[0].startPos = new Coord();
		$canvas[0].oldPos = new Coord();
		$canvas[0].endPos = new Coord();

		//start drawing
			function startMoving(e){
				e.preventDefault();
				var $canvas = $(this)
				,	ctx = $canvas[0].ctx;

				$canvas[0].state = "start";
				$canvas[0].startPos = getCursorPos($canvas, e);
				ctx.beginPath();
		     	ctx.drawCircle($canvas[0].startPos);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#666666";
				ctx.stroke();
				ctx.closePath()
				$canvas[0].state  = "moving";

				$canvas[0].oldPos = $canvas[0].startPos;
				$canvas[0].endPos = $canvas[0].startPos;

		 		clearTimeout($canvas[0].timerEnd);
				$canvas[0].timerEnd = setTimeout(function(){
					console.log("timeout");
					$canvas[0].movingEnd();
				},500);
			}$canvas.bind(down, startMoving);

		//moving drawing 
			function moving(e){
				e.preventDefault();
				var $canvas = $(this)
				,	ctx = $canvas[0].ctx;

		 		clearTimeout($canvas[0].timerEnd);
				if($canvas[0].state == "moving"){
					$canvas[0].timerEnd = setTimeout(function(){
						console.log("timeout");
						$canvas[0].movingEnd();
					},500);
				}
				$canvas[0].oldPos = $canvas[0].endPos;
			}$canvas.bind(move, moving);

		//end drawing
			$canvas[0].movingEnd = function(){
				var $canvas = this.$canvas
				,	ctx = $canvas[0].ctx;
				// $canvas = $(this)
				clearTimeout($canvas[0].timerEnd);
				endPos = $canvas[0].endPos;
				$canvas[0].state = "waiting";
				var $this = $(this);
				ctx.beginPath();
				ctx.moveTo(endPos.x, endPos.y);
		     	ctx.arc(endPos.x, endPos.y, 2, 0, 2 * Math.PI, false);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#666666";
				ctx.stroke();
				ctx.closePath();
			}
			$canvas.bind(out, $canvas[0].movingEnd);
			$canvas.bind(up, $canvas[0].movingEnd);
	}

	function exempleLine2(){

	}

	function detectClick($canvas){
		$canvas.on(down, function(e){
			var $canvas = $(this)
			,	ctx = $canvas[0].getContext("2d")
			,	p = getCursorPos($canvas, e);

			ctx.drawCircle(p);
		});
	}

	function drawing($canvas){
		$canvas[0].ctx = $canvas[0].getContext("2d");
		$canvas[0].state = "waiting";
		$canvas[0].timerEnd = "";
		$canvas[0].$canvas= $canvas;
		$canvas[0].startPos = new Coord();
		$canvas[0].oldPos = new Coord();
		$canvas[0].endPos = new Coord();
		//start drawing
			function startMoving(e){
				e.preventDefault();
				var $canvas = $(this)
				,	ctx = $canvas[0].ctx;

				$canvas[0].state = "start";
				$canvas[0].startPos = getCursorPos($canvas, e);
				ctx.beginPath();
		     	ctx.drawCircle($canvas[0].startPos);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#666666";
				ctx.stroke();
				ctx.closePath()
				$canvas[0].state  = "moving";

				$canvas[0].oldPos = $canvas[0].startPos;
				$canvas[0].endPos = $canvas[0].startPos;

		 		clearTimeout($canvas[0].timerEnd);
				$canvas[0].timerEnd = setTimeout(function(){
					console.log("timeout");
					$canvas[0].movingEnd();
				},500);
			}$canvas.bind(down, startMoving);

		//moving drawing 
			function moving(e){
				e.preventDefault();
				var $canvas = $(this)
				,	ctx = $canvas[0].ctx;

		 		clearTimeout($canvas[0].timerEnd);
				if($canvas[0].state == "moving"){
					ctx.beginPath();
					ctx.moveTo($canvas[0].oldPos.x, $canvas[0].oldPos.y);
					$canvas[0].endPos = getCursorPos($canvas, e);
					ctx.lineTo($canvas[0].endPos.x, $canvas[0].endPos.y);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#666666";
					ctx.stroke();
					ctx.closePath();
					$canvas[0].timerEnd = setTimeout(function(){
						console.log("timeout");
						$canvas[0].movingEnd();
					},500);
				}
				$canvas[0].oldPos = $canvas[0].endPos;
			}$canvas.bind(move, moving);

		//end drawing
			$canvas[0].movingEnd = function(){
				var $canvas = this.$canvas
				,	ctx = $canvas[0].ctx;
				// $canvas = $(this)
				clearTimeout($canvas[0].timerEnd);
				endPos = $canvas[0].endPos;
				$canvas[0].state = "waiting";
				var $this = $(this);
				ctx.beginPath();
				ctx.moveTo(endPos.x, endPos.y);
		     	ctx.arc(endPos.x, endPos.y, 2, 0, 2 * Math.PI, false);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#666666";
				ctx.stroke();
				ctx.closePath();
			}
			$canvas.bind(out, $canvas[0].movingEnd);
			$canvas.bind(up, $canvas[0].movingEnd);
	}


});