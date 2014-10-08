function Particule(context, pos, r){
	this.pos = pos || {x:0, y:0};
	this.r = r || 4;

	this.draw = function(){
		context.beginPath();
		context.moveTo(this.pos.x, this.pos.y);
		context.arc(this.pos.x, this.pos.y, this.r, 0, 100, true)

		context.strokeStyle = 'green';
		context.stroke();
		context.fillStyle = 'green';
		context.fill()
		this.r -= 0.04;
	}
}