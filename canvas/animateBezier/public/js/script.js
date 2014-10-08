
function render(){
	//reset le canvas
	context.clearRect(0, 0, 1000, 1000);

	beziers[0].bezierDrawed(context);
	// beziers[1].bezierDrawed(context);

	beziers[0].drawBezier(context);
	// beziers[1].drawBezier(context);

	for(var i = 0, len = point.length; i < len; i++){
		if(point[i].r > 0){
			point[i].draw();
		}
	}
	t++;
}

var t = 0
,	point = []
,	beziers = []
,	frameRate = 1000/60
,	canvas = document.getElementById('myCanvas')
,	context = canvas.getContext('2d')
,	start = true;

canvas.width = 1000;
canvas.height = 1000;

var c1 = new Coord( 43, 53)
,	c2 = new Coord(174, 179)
,	c3 = new Coord(213, 45)
,	c4 = new Coord(372, 131);

var c5 = new Coord(372, 131)
,	c6 = new Coord(513, 218)
,	c7 = new Coord(600, 193)
,	c8 = new Coord(744, 111);

beziers.push(new Bezier({c1:c5, c2:c6, c3:c7, c4:c8},{c1:c1, c2:c2, c3:c3, c4:c4}));
// beziers.push(new Bezier({c1:c5, c2:c6, c3:c7, c4:c8}));

function play(){
	gameLoop = setInterval(render, 1);
}
play();