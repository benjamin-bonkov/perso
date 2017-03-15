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
		triggerClick = "touchstart";
		down = "touchstart";
		move = "touchmove";
		out = "touchleave";
		up = "touchend";
		$("html").addClass("touchingDevice");
	}

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
    // Object Particule
        //params {
        //     coordStart: Coord, 
        //     coorEnd: Coord,
        //     coorCurrent: Coord,
        //     speed: Coord,
        // }
        function Particule(params){
            this.coordStart = new Coord(
                getRandomInt( (0), (canvasWidth) ),
                getRandomInt( (0), (canvasHeight) )
            );
            this.coorEnd = new Coord(
                getRandomInt( (0), (canvasWidth) ),
                getRandomInt( (0), (canvasHeight) )
            );
            this.coorCurrent = this.coordStart
            this.ctx = params.ctx;
            this.startWidth = getRandomInt(0.01,0.5)
            this.endWidth = 0.1;
            this.currentWidth = this.startWidth || 5;

            this.distX = this.coorEnd.x - this.coordStart.x ;
            this.dirX = ( (this.distX)<0 )? -1 : 1;
            this.distY = this.coorEnd.y - this.coordStart.y ;
            this.dirY = ( (this.distY)<0 )? -1 : 1;
            this.actif = true;

            this.duration = getRandomInt( 500, 1000);
            this.vitX = this.distX / (this.duration);

            this.vitWidth = (this.endWidth - this.startWidth)  / (this.duration)
            this.vitY = this.distY / (this.duration);
        }

        function isPointInPoly(poly, pt){
            for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                && (c = !c);
            return c;
        }
        Particule.prototype.update = function(infinite){
            if(infinite){
                this.coorCurrent.x += this.vitX;
                this.coorCurrent.y += this.vitY;

                if(this.currentWidth >= this.endWidth){
                    this.currentWidth -= this.vitWidth;
                }
                if(!isPointInPoly(canvasPoly, this.coorCurrent)){
                    this.actif = false;
                }
            }else{
                if(
                    (
                        this.coorEnd.x == this.coorCurrent.x &&
                        this.coorEnd.y == this.coorCurrent.y
                    )
                ){
                    // console.log("end");
                    this.actif = false
                }
                if(
                    (this.dirX > 0 && this.coorEnd.x > this.coorCurrent.x) ||
                    (this.dirX < 0 && this.coorEnd.x < this.coorCurrent.x)
                ){
                    this.coorCurrent.x += this.vitX;
                }else{
                    this.coorCurrent.x = this.coorEnd.x;
                }
                if(
                    (this.dirY > 0 && this.coorEnd.y > this.coorCurrent.y) ||
                    (this.dirY < 0 && this.coorEnd.y < this.coorCurrent.y)
                ){
                    this.coorCurrent.y += this.vitY;
                }else{
                    this.coorCurrent.y = this.coorEnd.y;
                }
                if(this.currentWidth >= this.endWidth){
                    this.currentWidth -= this.vitWidth;
                }
            }
        }

        Particule.prototype.render = function(){
            // console.log(this.coorCurrent);
            this.ctx.save();

            this.ctx.strokeStyle = 'transparent';
            this.ctx.fillStyle = 'white';
            
            drawCircle(this.coorCurrent, this.currentWidth);

            this.ctx.restore();
        }


/**********************
**** TABLE CONTENT ****
***********************

Object 
    -Object coordonnées
    -Object Particule
    -Object liste de coordonnées
    -Object Polygon
    -Object LINE

tests/math

drawing

ARRAY UPPGRADE

***************************
**** END TABLE CONTENT ****
**************************/

// Objects
    // Object coordonnées
        function Coord(x,y){
            this.x = x || 0;
            this.y = y || 0;
        }

        Coord.prototype.set = function (x, y){
            this.x = x || 0;
            this.y = y || 0;
        }

        Coord.prototype.isEqual = function (coord, lissage){
            lissage = lissage || 0.5;
            if((this.x >= coord.x-lissage && this.x <= coord.x+lissage)
                &&
                (this.y >= coord.y-lissage && this.y <= coord.y+lissage)){
                return true;
            }else{
                return false;
            }
        }

    // Object liste de coordonnées 
        function ListCoord(table){
            this.list = table || [];
        }

        ListCoord.prototype.push = function (coord){
            this.list.push(coord);
        }
        ListCoord.prototype.length = function (){
            return this.list.length;
        }
        ListCoord.prototype.getFirst = function (){
           return this.list[0];
        }
        ListCoord.prototype.getLast = function (){
            return this.list[this.list.length-1];
        }

    // Object Polygon
        function Polygon(coord){
            this.list = [coord||0];

            this.maxLeft = coord.x;
            this.currentMaxLeft = coord.x;
            this.lastMaxLeft = coord.x;
            this.goingLeft = false;

            this.maxRight = coord.x;
            this.currentMaxRight = coord.x;
            this.lastMaxRight = coord.x;
            this.goingRight = false;

            this.maxTop = coord.y;
            this.currentMaxTop = coord.y;
            this.lastMaxTop = coord.y;
            this.goingTop = false;

            this.maxBot = coord.y;
            this.currentMaxBot = coord.y;
            this.lastMaxBot = coord.y;
            this.goingBot = false;

            this.x = 0;
            this.y = 0;
            this.lissage = 20;
        }
        Polygon.prototype.length = function (){
            return this.list.length;
        }
        Polygon.prototype.push = function(coord){
            last = this.list[this.list.length]
            this.x = coord.x;
            this.y = coord.y;
            if(this.x < this.maxLeft){
                this.maxLeft = this.x;
            }
            if(this.x < this.currentMaxLeft){
                this.goingLeft = true;
                this.currentMaxLeft = this.x;
            }else{
                if( this.goingLeft && getDelta(this.lastMaxLeft, this.currentMaxLeft) > this.lissage){
                    this.lastMaxLeft = this.currentMaxLeft;
                    this.list.push(coord);
                    this.goingLeft = false;
                    this.currentMaxRight = this.x;
                    return true;
                }else{
                    this.currentMaxLeft = this.x;
                }
            }
            if(this.x > this.maxRight){
                this.maxRight = this.x;
            }
            if(this.x > this.currentMaxRight){
                this.goingRight = true;
                this.currentMaxRight = this.x;
            }else{
                if( this.goingRight && getDelta(this.lastMaxRight, this.currentMaxRight) > this.lissage){
                    this.lastMaxRight = this.currentMaxRight;
                    this.list.push(coord);
                    this.goingRight = false;
                    this.currentMaxLeft = this.x;
                    return true;
                }else{
                    this.currentMaxRight = this.x;
                }
            }
            if(this.y < this.maxTop){
                this.maxTop = this.y;
            }
            if(this.y < this.currentMaxTop){
                this.goingTop = true;
                this.currentMaxTop = this.y;
            }else{
                if( this.goingTop && getDelta(this.lastMaxTop, this.currentMaxTop) > this.lissage){
                    this.lastMaxTop = this.currentMaxTop;
                    this.list.push(coord);
                    this.goingTop = false;
                    return true;
                }else{
                    this.currentMaxTop = this.y;
                }
            }
            if(this.y > this.maxBot){
                this.maxBot = this.y;
            }
            if(this.y > this.currentMaxBot){
                this.goingBot = true;
                this.currentMaxBot = this.y;
            }else{
                if( this.goingBot && getDelta(this.lastMaxBot, this.currentMaxBot) > this.lissage){
                    this.lastMaxBot = this.currentMaxBot;
                    this.list.push(coord);
                    this.goingBot = false;
                    return true;
                }else{
                    this.currentMaxBot = this.y;
                }
            }
            return false;
        }

    // Object LINE
        function Line(coord1, coord2, isInfinite){
            this.p1 = new Coord(coord1.x, coord1.y) || 0;
            this.p2 = new Coord(coord2.x, coord2.y) || 0;
            this.isInfinite = isInfinite || false;
            this.isPoint = false;
            if(this.p1.x == this.p2.x && this.p1.y == this.p1.y){
                this.isPoint = true;
            }

            this.a = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x)
            this.b = this.p1.y - this.a * this.p1.x;

            if(this.isInfinite){
                var newP1
                this.p1 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(0, 0),new Coord(0, canvasHeight)));
                this.p2 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(0, 0),new Coord(canvasWidth, 0)));
                if((this.p1.x <= 0 || this.p1 >= canvasWidth) && (this.p1.y <= 0 || this.p1.y >= canvasHeight) ){
                    this.p1 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(canvasWidth, 0),new Coord(canvasWidth, canvasHeight)));
                }
                if((this.p2.x <= 0 || this.p2 >= canvasWidth) && (this.p2.y <= 0 || this.p2.y >= canvasHeight) ){
                    this.p2 = checkLineIntersection(new Line(new Coord(coord1.x, coord1.y),new Coord(coord2.x, coord2.y)), new Line(new Coord(0, canvasHeight),new Coord(canvasWidth, canvasHeight)));
                }
                //todo : autres directions (?)
            }
        }


// tests/math

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


// drawing
    function drawCircle(coord, rayon){
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, rayon || 1, 0, 2 * Math.PI, false);
        ctx.moveTo(coord.x, coord.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function drawRect(lt, rt, rb, lb){
        //strokeRect(float x, float y, float w, float h)
        var w = rt.x -lt.x
        ,   h = lb.y - lt.y;
        ctx.rect(lt.x, lt.y, w, h);
    }

    function setCenterText(rect, text){
        fontSize = 20
        if($(window).height() < 830){
            fontSize = 15
        }
        if($drawingArea.width() < 1100){
            fontSize = 15
        }
        if($drawingArea.width() < 825){
            fontSize = 12
        }
        if($drawingArea.width() < 650){
            fontSize = 9
        }
        if($drawingArea.width() < 520){
            fontSize = 9
        }
        // fontSize = (rect.rb.x-rect.lb.x)/10 /1.8
        // console.log(fontSize);
        ctx.font = fontSize+'pt knockouthtf28-juniorfeatherwt';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if(typeof text == "string"){
            ctx.moveTo(rect.lb.x, rect.lb.y);
            ctx.fillText(text, rect.lb.x + (rect.rb.x-rect.lb.x)/2, rect.lb.y - (rect.lb.y -rect.lt.y)/3);
        }else{
            for (var i = 0; i < text.length; i++) {
                ctx.moveTo(rect.lb.x, rect.lb.y);
                ctx.fillText(text[i], rect.lb.x + (rect.rb.x-rect.lb.x)/2, rect.lb.y+10+i*fontSize*1.25 - (rect.lb.y -rect.lt.y)/3);
            };
        }
    }


var supportCanvas = true
try{
	document.createElement("canvas").getContext("2d");
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
			particules.push( new Particule({ ctx: ctx, canvasPoly: canvasPoly }) );
		}
		// TODO : start render
		render();
	}init();

	var particuleInactive = []
	//rendering loop
		var idAnimFrame;
		function render(){
			idAnimFrame = requestAnimationFrame(function(){
				//loop that

				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				for (var i =  0; i < particules.length; i++) {
					particules[i].render();
					if(particules[i].actif) {
						particules[i].update(infinite=true);
					}else{
						particules[i] = new Particule({ ctx: ctx, canvasPoly: canvasPoly })
					}
				}
				render();

				//recursive
			});
		}
}
$(document).ready(function(){
	$("html").removeClass("no-js");

	
	var $parallaxMouse = $("#parallaxMouse")
	,	$layer1 = $(".layer1")
	,	$layer2 = $(".layer2")
	,	offset = $parallaxMouse.offset()
	,	pmw = $parallaxMouse.width()
	,	pmh = $parallaxMouse.height();

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
	$("#parallaxMouse").bind(move, moving);


});