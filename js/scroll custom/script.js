/*** custom scroll ****/
		if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = document.onmousewheel = wheel;

		var velocity = 4
		,	blockScroll = false
		,	disableWheel = false;
		function wheel(event) {
			// console.log("wheel");
			if(!disableWheel){
			    var delta = 0
			    ,	wheelDelta = 0;
				if (event.wheelDelta) {
					delta = event.wheelDelta / 120;
					wheelDelta = event.wheelDelta;
				}
				else if (event.detail){
					delta = -event.detail / 3;
					wheelDelta = -event.detail;
				}
				// console.log(wheelDelta);
				if(Math.abs(event.wheelDelta) > 50){
					handle(delta);
					if (event.preventDefault) event.preventDefault();
					event.returnValue = false;
				}else{//pour les mac, on laisse le comportement normal
					disableWheel = true;
				}
			}
		}
		function handle(delta) {
			console.log(delta);
			// console.log(blockScroll);
			if(!blockScroll){
				blockScroll = true;
			    var time = 300;
				var distance = 500*(velocity*0.25);
			    $('html, body').stop().animate({
			        scrollTop: $(window).scrollTop() - (distance * delta)
			    }, time, function(){
			    	// console.log("?");
			    	blockScroll = false;
			    });
			}
		}