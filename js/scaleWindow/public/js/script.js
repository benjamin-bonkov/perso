$(document).ready(function(){
	var s = document.body.style
	,	supportScale =  'transition' 		in s ||
                    	'WebkitTransition'  in s ||
                    	'MozTransition' 	in s ||
                    	'msTransition' 		in s ||
                    	'OTransition' 		in s;

	// fonction pour garder le ratio hauteur/largeur de la fenêtre
	//!\ Le conteneur doit etre en overflow hidden /!\
	function ratioWindow(){
		var w = $(window).width()
		,	h = $(window).height()
		,	mw = 1920 //ratio a garder
		,	mh = 1200 //ratio a garder
		,	ratioH = 1
		,	ratioW = 1
		,	ratio  = 1;

		if(h < mh){
			ratioH = h/mh;
		}
		if(h > mh){
			ratioH = h/mh;
		}

		if(w < mw){
			ratioW = w/mw;
		}

		if(w > mw){
			ratioW = w/mw;
		}

		//on récupère le ratio le plus bas
		if(ratioH <= ratioW){
			ratio = ratioH;
		}else{
			ratio = ratioW;
		}

		//si IE < 9 ou si browser detect = safari on utilise le zoom, sinon le scale
		// if($("html").hasClass("lt-ie9") || $("html").hasClass("Safari")){
		if(!supportScale){
			$(".toScale").css({"zoom": ratio});
		}else{
			$(".toScale").css({
				"transform-origin": "0 0",
				"transform": "scale("+ratio+")"
			});
		}


		$(".toScale").delay(50).animate({"opacity":1},50);
	}
	$(window).resize(ratioWindow);
	ratioWindow();
	ratioWindow();//sur chrome, on a un espace qui se forme a cause des barres de défilement

});