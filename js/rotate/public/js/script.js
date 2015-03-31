$(document).ready(function(){

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

	window.imagesList = [];
	window.playAnims = false;
	$(".product__medias .menuTab .action").bind(triggerClick, function(e){
		e.preventDefault();
		var $this = $(this)
		,	$product = $this.closest(".product")
		,	$tab = $product.find(".product__medias .tab")
		,	$target = $($product.find($this.attr("data-target")))
		,	ref = $product.attr("data-reference")
		,	src = $target.attr("data-src")
		,	qty = $target.attr("data-qty")
		,	action = $target.attr("data-action")
		,	tabId = ref+action;
		
		$(".menuTab .action").removeClass("active")
		$this.addClass("active")

		playAnims = false;
		$tab.hide();
		$target.fadeIn();
		//stop here if already loading
		if($target.hasClass("loading")){return;}
		console.log(src);
		console.log(imagesList);
		if(src != null && src != undefined){
			console.log(imagesList);
			if(imagesList[ref+action] == null){
				console.log(ref+action);
				var imgToLoad = [];
				for (var i = 1; i <= qty; i++) {
					imgToLoad.push(src+i+".png");
				};
				for (var i = 0; i < imgToLoad.length; i++) {
					$("<img src="+imgToLoad[i]+" class='"+((i==0)? 'active' : '')+"' >").appendTo($target);
				};
				$target.addClass("loading")
				var resources = new Resources();
				resources.load(imgToLoad);
				resources.onReady(function(){
					imagesList[ref+action] = {
						"imgToLoad":imgToLoad,
						"qty":qty,
						"src":src,
						"state":0,
					};
					console.log($target);
					imagesList[ref+action].imgs = $target.find("img")
					$target.removeClass("loading")
					if($target.hasClass("anim")){
						window.anim = imagesList[ref+action]
						playAnims = false;
						playAnims = true;
						animProduct();
					}
					if($target.hasClass("rotate")){
						window.rotateList = imagesList[ref+action]
						$target.bind(down, handleRotate);
					}
				});
			}else{
				if($target.hasClass("anim")){
					window.anim = imagesList[ref+action]
					playAnims = true;
					animProduct();
				}
				if($target.hasClass("rotate")){
					window.rotateList = imagesList[ref+action]
					$target.bind(down, handleRotate);
				}
			}
		}
	});

	var pOrigin
	,	pDelta
	,	pState;

	function getCursorPos(e, coord){
		if(isTouch){
			var touch = e.originalEvent.touches[0];
			return touch.clientX;
		}else{
			return e.clientX;
		}
	}
	var slowFactor = 3; //to reduce the delta amount, because it move to fast otherwise
	function rotate(e){
		pNew = getCursorPos(e);
		pDelta = pOrigin - pNew;
		if(pDelta != 0){
			if(pDelta > 0){
				rotateList.state = (rotateList.state-1) %rotateList.qty;
			}else{
				rotateList.state = (rotateList.state+1) %rotateList.qty;
			}
			rotateList.imgs.removeClass("active");
			rotateList.imgs.eq(rotateList.state).addClass("active");
			pOrigin = pNew;
		} 
	}
	function handleRotate(e){
		pOrigin = getCursorPos(e);
		$(this).bind(move, rotate)
	}

	function animProduct(){
		var num = anim.state%anim.qty;
		anim.imgs.eq(num-1).removeClass("active");
		anim.imgs.eq(num).addClass("active");
		anim.state++;
		if(playAnims){
			setTimeout(animProduct,42);
		}
	}
})
