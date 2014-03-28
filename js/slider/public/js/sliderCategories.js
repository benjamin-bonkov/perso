$(document).ready(function(){

	var $sliders = $(".slider");
	$sliders.each(function(){
		var $slider= $(this),
			$slides = $slider.find(".slide"),
			nbSlide = $slides.length,
			sizeSlide = $slides.width(),
			$contentSlides = $slider.find(".contentSlides"),
			$control,
			numActif = 1,
			$navSlider = $("#navSlider"),
			$navLink = $navSlider.find("a");
		$("html").removeClass("no-js");

		$navLink.eq(0).addClass("active")
		$slider.css({"height" :370});
		$slider.data("lock", false);

		$slides.eq(0).clone().appendTo($contentSlides);	//on clone le 1er slide et le place en fin,
		$slides.eq(nbSlide-1).clone().prependTo($contentSlides);// on clone le dernier slide et le place au début du slide,
		
	    function init(){
	    	if(!$slides.find("img")[0].complete && $slides.find("img") != undefined && !$slides.find("img").outerHeight(true) < 100){
	    		setTimeout(init,500)
	    	}else{
	    		$slides = $slider.find(".slide");//MAJ de la liste des slides
				nbSlide = $slides.length;//MAJ du nombre de slides
		        sizeSlide = $slider.width()
		        $slides.css({"width" :sizeSlide});
		        $slider.css({"height" :$slides.find("img").outerHeight(true)});
		        $contentSlides.css({
					"width" : nbSlide*sizeSlide,
					"left" : -sizeSlide*numActif
				});
	    	}
		}

	    $(window).resize(function(){
	    	init();
	    });
	    setTimeout(init,50)
	    // init();
	    
	    if ($slider.hasClass("auto-slide")) {
	    	setInterval(function(){$slider.find(".next").click()},4000)
	    }
		$control = $slider.find(".control");
		
		//fix chrome un peu sale
			$control.css({"position":"relative"});
			setTimeout(function(){$control.css({"position":"absolute"});},5)
			$navSlider.css({"position":"relative"});
			setTimeout(function(){$navSlider.css({"position":"absolute"});},5)

		/*
		*	Au click sur un bouton suivant/précédent
		*/
		$control.click(function(){
			var $this = $(this);
			if(!$slider.data("lock")){//si pas d'animation en cours
				$slider.data("lock", true);//on indique qu'une animation est en cours
				if($this.hasClass("prev")){//click sur precedant
					numActif--;
					slideOne(1);

				}else{//click sur suivant
					numActif++;
					slideOne(-1);
				}
			}
		});

		/*
		*	Décale d'un slide,
		*		1 => vers la gauche
		*		-1 => vers la droite 
		*/
		function slideOne(sens){
			$contentSlides.animate({
				"left" : "+="+sizeSlide*sens
			},500, 
			function(){
				if(numActif <= 0){
					$contentSlides.css({
						"left" : -sizeSlide*(nbSlide-2)
					});
					numActif = nbSlide-2;
				}
				if(numActif >= nbSlide-1){
					$contentSlides.css({
						"left" : -sizeSlide
					});
					numActif = 1;
				}
				$slider.data("lock", false);//il n'y a plus d'animation en cours
				$navLink.removeClass("active");
				$navSlider.find("."+$slides.eq(numActif).closest(".part").attr("id")).addClass("active");//MAJ navSlider
			});
		}

		/*
		*	Au click sur un lien de la nav du slider
		*/
		$navLink.click(function(e){
			e.preventDefault();//empêche l'execution du lien
			if ($slider.attr("id") == undefined){
				$slider.attr("id", "currentSliderInPartMove");
				var id = "currentSliderInPartMove";
			}else{
				var id = $slider.attr("id");
			}
			var $this = $(this),
				$target = $slider.find($this.attr("href")),//on recup' la partie vers laquel pointe le lien
				num = $target.find(".slide").eq(0).index("#"+id+" .slide");//on recup l'index du premier slide de cette catégorie
console.log($target);
console.log(num);
console.log($("#"+id).find(".slide"));
			//on slide jusqu'à ce slide
			$contentSlides.animate({
				"left" : -sizeSlide*num
			},500);
			numActif = num;
			$navLink.removeClass("active");
			$this.addClass("active");
		});
	});
});