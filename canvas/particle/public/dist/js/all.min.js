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
            this.fixed = params.fixed || false;
            this.w = getRandomInt(0.1,0.3);

            this.distX = this.coorEnd.x - this.coordStart.x ;
            this.dirX = ( (this.distX)<0 )? -1 : 1;
            this.distY = this.coorEnd.y - this.coordStart.y ;
            this.dirY = ( (this.distY)<0 )? -1 : 1;
            this.actif = true;

            this.duration = getRandomInt( 500, 1000);
            this.vitX = this.distX / (this.duration);
            this.vitY = this.distY / (this.duration);
        }

        function isPointInPoly(poly, pt){
            for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                && (c = !c);
            return c;
        }
        Particule.prototype.update = function(){
            this.bounce();

            this.coorCurrent.x += this.vitX;
            this.coorCurrent.y += this.vitY;
        }


        Particule.prototype.bounce = function(){
            if (this.coorCurrent.y < 0 || this.coorCurrent.y > canvasHeight) {
                this.vitX = this.vitX;
                this.vitY = - this.vitY;
            } else if (this.coorCurrent.x < 0 || this.coorCurrent.x > canvasWidth) {
                this.vitX = - this.vitX;
                this.vitY = this.vitY;
            }
        }

        Particule.prototype.followMouse = function(){
            this.bounce();
            this.coorCurrent.x = this.coordStart.x + (mousePosDelta.x*this.vitX/this.duration)*this.vitX + this.vitX;
            this.coorCurrent.y = this.coordStart.y + (mousePosDelta.y*this.vitY/this.duration)*this.vitY + this.vitY;
            // console.log(this.coorCurrent);
            // console.log(this.coorCurrent.y);
        }

        Particule.prototype.render = function(){
            // console.log(this.coorCurrent);
            this.ctx.save();

            this.ctx.strokeStyle = 'white';
            this.ctx.fillStyle = 'white';
            
            drawCircle(this.coorCurrent, this.w);

            this.ctx.restore();
        }


/**********************
**** TABLE CONTENT ****
***********************

getCursorPos

Object 
    -Object coordonnées
    -Object Particule

tests/math

drawing

ARRAY UPPGRADE

***************************
**** END TABLE CONTENT ****
**************************/

//recup position client, update l'objet coord fournis
    function getCursorPos(e, pos){
        currentPos = pos || new Coord();
        if(isTouch){
            var touch = e.originalEvent.touches[0];
            currentPos.set(touch.clientX, touch.clientY);
            return (currentPos);
        }else{
            currentPos.set(e.clientX, e.clientY);
            return (currentPos);
        }
    }
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

$(document).ready(function(){
	$("html").removeClass("no-js");
	// target ie10
		if (Function('/*@cc_on return document.documentMode===10@*/')()){
		    document.documentElement.className+=' lt-ie10 ie10 ';
		}
	// target ie11
	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf('MSIE ');
	    var trident = ua.indexOf('Trident/');
	    if (trident > 0) {
		    // IE 11 (or newer) => return version number
		    var rv = ua.indexOf('rv:');
		   document.documentElement.className+= " lt-ie11 ie+ua.substring(rv + 3, ua.indexOf('.', rv))";
	    }

    // mobile menu toggle
        $(".nav-mobile-btn").on("click", function(){
            if($(this).hasClass("expanded")){
                $(this).siblings(".nav-mobile-dropdown").slideUp().removeClass("expanded");
                $(this).removeClass("expanded");
            } else {
                $(this).siblings(".nav-mobile-dropdown").slideDown().addClass("expanded");
                $(this).addClass("expanded");
            }
        });
        $(".nav-mobile-dropdown a").on("click", function(){
            var $navBtn = $(".nav-mobile-btn");
            if($navBtn.hasClass("expanded")){
                $navBtn.siblings(".nav-mobile-dropdown").slideUp().removeClass("expanded");
                $navBtn.removeClass("expanded");
            }
        });

    
    function init(){

        // twitter follow
            $(".twitter-follow").bind("click", function(e){
                e.preventDefault();
                var width  = 680,
                height = 575,
                // left   = ($(window).width()  - width)  / 2,
                // top    = ($(window).height() - height) / 2,
                url    = "https://twitter.com/intent/follow/?screen_name=@_SOOYOOS_",
                opts   = 'status=1' +
                ',width='  + width  +
                ',height=' + height //+
                // ',top='    + top    +
                // ',left='   + left
                ;

                window.open(url, 'twitter', opts);

                return false;
             });

        // insta feed
            if($("#instafeed").length > 0){
                var userFeed = new Instafeed({
                    get: 'user',
                    userId: 1711451541,
                    accessToken: '1711451541.467ede5.c1f0784d144b4fdf9ce8a539fdc9319b',
                    sortBy: "none",
                    links: true,
                    limit: 9,
                    resolution: 'standard_resolution',
                });
                userFeed.run();
            }

        // tab système
            $(".tab").each(function(){
                var $tab = $(this)
                ,	$tabButtons = $tab.find(".tab-buttons a")
                ,	$tabContent = $(".tab-content");
                $tabButtons.click(function(e){
                    e.preventDefault();
                    var $this = $(this)
                    ,	$target = $($this.attr("href"));
                    $tabButtons.removeClass("active");
                    $this.addClass("active");
                    $tabContent.hide();
                    $target.show();
                });
                $tabButtons.eq(0).click();
            });
    }
    init();

    // url change
        function processAjaxData(response, urlPath){
            document.getElementById("content").innerHTML = response.html;
            document.title = response.pageTitle;
            window.history.pushState({"php":response.php,"pageTitle":response.pageTitle},"", urlPath);
        }

	// ajax menu
		$(".menu a").click(function(e){
			e.preventDefault();
			var $this = $(this)
			,	target = $this.attr("data-target");
            $this.addClass("active").parents("li").siblings().find("a").removeClass("active");
			jQuery.ajax({
				url: target+"-content.php",
				contentType: "html",
				success : function(data){
					$(".page-content").html($(data)).prop("id", target);
                    init();
                    var stateObj = {target : target};
                    window.history.pushState(stateObj, target+" - Sooyoos", target+".php");
				}
			})
		});

});