function Bezier(){
	this.coords = [];
	this.length = arguments.length;
	for(var i = 0; i < this.length; i++){	
		this.coords.push(arguments[i]);
	}
	this.state = 0;
		// this.c1 = coords.c1 || 0;
		// this.c2 = coords.c2 || 0;
		// this.c3 = coords.c3 || 0;
		// this.c4 = coords.c4 || 0;

	// 13thParallel.org Beziér Curve Code  by Dan Pupius (www.pupius.net)
	this.B1 = function(t) { return t*t*t }
	this.B2 = function(t) { return 3*t*t*(1-t) }
	this.B3 = function(t) { return 3*t*(1-t)*(1-t) }
	this.B4 = function(t) { return (1-t)*(1-t)*(1-t) }

	// 13thParallel.org Beziér Curve Code  by Dan Pupius (www.pupius.net)
	this.getBezier = function(percent){
		var pos = new Coord();
		pos.x = this.coords[this.state].c1.x*this.B1(percent) + this.coords[this.state].c2.x*this.B2(percent) + this.coords[this.state].c3.x*this.B3(percent) + this.coords[this.state].c4.x*this.B4(percent);
		pos.y = this.coords[this.state].c1.y*this.B1(percent) + this.coords[this.state].c2.y*this.B2(percent) + this.coords[this.state].c3.y*this.B3(percent) + this.coords[this.state].c4.y*this.B4(percent);
		return pos;
	}

	this.bezierDrawed = function (context){
		for(var i = 0, len = this.coords.length; i < len; i++){
			context.beginPath();
			//bezier commence ici
			context.moveTo(this.coords[i].c1.x, this.coords[i].c1.y);
			context.bezierCurveTo(this.coords[i].c2.x, this.coords[i].c2.y, this.coords[i].c3.x, this.coords[i].c3.y, this.coords[i].c4.x, this.coords[i].c4.y);
			context.lineWidth = 5;
			// line color
			context.strokeStyle = 'black';
			context.stroke();

			context.beginPath();
			context.moveTo(this.coords[i].c1.x, this.coords[i].c1.y);
			context.arc(this.coords[i].c1.x, this.coords[i].c1.y, 5, 0, 100, true);

			context.moveTo(this.coords[i].c1.x, this.coords[i].c1.y);
			context.lineTo(this.coords[i].c2.x, this.coords[i].c2.y);

			context.moveTo(this.coords[i].c2.x, this.coords[i].c2.y);
			context.arc(this.coords[i].c2.x, this.coords[i].c2.y, 5, 0, 100, true);

			context.moveTo(this.coords[i].c3.x, this.coords[i].c3.y);
			context.arc(this.coords[i].c3.x, this.coords[i].c3.y, 5, 0, 100, true);

			context.moveTo(this.coords[i].c3.x, this.coords[i].c3.y);
			context.lineTo(this.coords[i].c4.x, this.coords[i].c4.y);
			context.moveTo(this.coords[i].c4.x, this.coords[i].c4.y);
			context.arc(this.coords[i].c4.x, this.coords[i].c4.y, 5, 0, 100, true);
			context.lineWidth = 1;
			// line color
			context.strokeStyle = 'red';
			context.stroke();
			context.fillStyle = 'red';
			context.fill();
		}
	}

	this.drawBezier = function(context){
		if(this.state < this.length){
			var percent = 0.01*t;
			if(percent <= 1){
				point.push(new Particule(context, this.getBezier(percent)));
			}else{
				this.state++;
				t = 0;
			}
		}else{
			this.state = 0;
		}
	}
}