(function($) {
    $.fn.animateScroll = function() {
    	$thisPluginTarget = this;

		function ElemToAnim($this){
			this.elem = $this;
			try{
				this.option = JSON.parse(this.elem.attr("data-animScroll"));
			}catch(e){
				console.log(this.elem.attr("data-animScroll"));
				console.error("json parse fail");
				this.elem.css({"opacity":"1"});
				return "ERROR";
			}
			this.animate = this.option.animate;
			this.animateTime = this.option.animateTime || 500;
			this.delay = this.option.delay || 0;
			this.elem.css({"backface-visibility": "hidden","perspective": 1000});//GPU POWER ACTIVATE !
			this.hideBeforeAnim();
		}
		ElemToAnim.prototype = {
			mustAnimate : function(sTop){
				var yTop =this.elem.offset()["top"]
				if(sTop + $(window).height()*0.8 > yTop){
					this.triggerAnim();
				}
				if(sTop + $(window).height()*0.9 <= yTop){
					this.hideBeforeAnim();
				}
			},
			hideBeforeAnim : function(){
				var css = {"position":"relative", "opacity":0}
				if(this.animate.transform != null){
					css.transform = "scale(0)";
				}
				if(this.animate.left != null){
					css.left = -this.elem.outerWidth();
				}
				if(this.animate.top != null){
					css.top = -this.elem.outerHeight()*2;
				}
				if(this.animate.bottom != null){
					css.bottom = -this.elem.outerHeight()*2;
				}
				if(this.animate.right != null){
					css.right = -this.elem.outerWidth();
				}
				this.elem.stop(true); 
				this.elem.css(css);
			},
			triggerAnim : function(customTime){
				var customTime = customTime || this.animateTime;
				if(this.animate.transform != null){//anim css3
					this.elem.css({"transition-duration":this.animateTime/1000+"s"});
					this.elem.css({"transition-delay":this.delay/1000+"s"});
					this.elem.css(this.animate);
				}else{
					this.elem.delay(this.delay).animate(this.animate,this.animateTime);
				}
			}
		};

		function ElemsToAnim(){
			this.list = [];
			this.doResize();
		}
		ElemsToAnim.prototype = {
			push : function(el){
				this.list.push(el);
			},
			checkAnim : function(sTop){
				if(this.isEnable){
					for (var i = 0, len = this.list.length; i < len; i++) {
						this.list[i].mustAnimate(sTop);
					}
				}
			},
			doResize : function(){
				if($(window).width()<960){
					this.disable()
				}else{
					this.enable()
				}
			},
			disable : function(){
				this.isEnable = false;
				for (var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].triggerAnim(0);
				}
			},
			enable : function(){
				this.isEnable = true;
				this.checkAnim();
			}
		};

		var listElem = new ElemsToAnim()
		,   wH = $(window).height();
		function init(){
			if($(window).width()>960){
				$thisPluginTarget.each(function(){
					var $this = $(this)
					,	anim = $this.attr("data-animScroll")
					,	animateTime = $this.attr("data-animateTime")
					,	delay = $this.attr("data-delay");
					var newElem = new ElemToAnim($this);
					if(newElem != "ERROR") listElem.push(newElem);
				});
				listElem.checkAnim($(window).scrollTop());

				$(window).resize(function(){
					wH = $(window).height();
					listElem.doResize();
				});
				$(window).scroll(function(){
					var sTop = $(this).scrollTop(); //la hauteur du scroll actuellement
					listElem.checkAnim(sTop);
				});
			}else{
				$thisPluginTarget.css({"opacity":1});
			}
		}
		$(window).load(function() {
			setTimeout(init(),500);
		});
	};
})(jQuery);

$(document).ready(function() {
	$(".animateScroll").animateScroll();
});