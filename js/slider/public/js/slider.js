$(document).ready(function(){

	var $slider = $("#slider"),
		$slides = $slider.find(".slide"),
		nbSlide = $slides.length,
		sizeSlide = $slides.width(),
		$contentSlides = $("<div class='contentSlides' />"),
		$control,
		numActif = 1;

	$("html").removeClass("no-js");

	$slider.data("lock", false);

	$slides.wrapAll($contentSlides);//on entoure les slide par un conteneur
	$contentSlides = $slider.find(".contentSlides");


	$slides.eq(0).clone().appendTo($contentSlides);	//on clone le 1er slide et le place en fin,
	$slides.eq(nbSlide-1).clone().prependTo($contentSlides);// on clone le dernier slide et le place au début du slide,
	$slides = $slider.find(".slide");//MAJ de la liste des slides
	nbSlide = $slides.length;//MAJ du nombre de slides
	$contentSlides.css({// on donne au conteneur une largeur
		"width" : nbSlide*sizeSlide,
		"left" : -sizeSlide
	});
	// $prev.insertBefore($slider);
	// $next.insertAfter($slider);
	
	$control = $slider.find(".control");
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
		});
	}

});






