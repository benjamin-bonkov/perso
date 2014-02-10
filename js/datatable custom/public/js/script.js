/*permet l'activation des scrollbar custom*/
$(document).ready(function(){
	$("html").removeClass("no-js");

	if(isTouchDevice()){ //if touch events exist...
		$('.dropdown-toggle.to').hide();
		$('.toTactile').removeClass("hide").show();
	}else{
		$(".dropdown-toggle.to").click();
		$('.customScrollbar').tinyscrollbar();
		var h = $(".overview").height();
		$(".dropdown-toggle.to").click();
		if(h < 200){
			$(".viewport").css({"height": h});
		}
	}
});
function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}


$(document).ready(function() {
	/* Show Tooltips */
	$('.toolTip').tooltip();		
	$('.toolTip').click(function(e){
		var $this = $(this);
		e.stopPropagation();
		$this.addClass("DONTHIDEME");
		setTimeout(function(){
			$this.removeClass("DONTHIDEME");
		},1000);
	});
	/* Hide Tooltips */
	$('*').click(function(){ setTimeout(function(){$('.toolTip').not(".DONTHIDEME").tooltip('hide');},50); });
	window.onscroll = function() { $('.toolTip').tooltip('hide'); };

	/*add keyword*/
	$("form.addKeyword").submit(function(e){
		e.preventDefault();
		var $this = $(this)
		, $inputTxT = $this.find("input[type='text']")
		, txt = $inputTxT.attr("value")
		, $listKeyword = $(".listKeyword");
		if(txt != ""){
			$listKeyword.append("<a href='#' class='keyword'>"+txt+"<i class='icon-closeKeyword'></i></a>");
			$this.find("input[type='text']").attr("value", "");
		}
	})

	/*Gestion des onglets*/
	$(".manageOnglet").each(function(){
		var $this = $(this)
		,	target = $this.find(".target").html()
		,	a = $this.find("a");

		a.click(function(e){
			e.preventDefault();
			var href = $(this).attr("href");
			a.removeClass("active");
			$(this).addClass("active");
			$("."+target).removeClass("active");
			$(href).addClass("active");
		})
	});


	$(".contentTableMore").each(function(){
		var $this = $(this);
		$("#snapshot").addClass("active");
		var h = $this.height();
		$("#snapshot").removeClass("active");
		if(h > 150){
			$this.height(150);
			var $more = $this.find(".more");
			$more.css("display","block");
			$more.click(function(e){
				e.preventDefault();
				$(this).toggleClass("showed");
				if($this.height() > 150){
					 $this.animate({"height":"150"},500);
				}else{
					$this.animate({"height":h+30},500);
				}
			});
		}
	});


	$(".contentLink").each(function(){
		var $this = $(this);
		$("#acmsReport").addClass("active");
		var h = $this.outerHeight(true);
		$("#acmsReport").removeClass("active");
		console.log("height"+ h);
		if(h > 190){
			$this.height(190);
			var $more = $this.find(".more");
			$more.css("display","block");
			$more.click(function(e){
				e.preventDefault();
				$(this).toggleClass("showed");
				if($this.height() > 190){
					 $this.animate({"height":"190"},500);
				}else{
					$this.height("");
					h = $this.height();
					$this.animate({"height":h+30},500);
				}
			});
		}
	});

	$("#email").hide();
	$("#addMail").click(function(){
		$("#email").toggle();
	});
});

$(document).ready(function() {
	/*
	*	Déplace le tableau principal si on est en "taille tablette",
	*	le remet à ça position initiale quand on est en "taille desktop"
	*/
	$moveTo2 = $("#moveTo2");
	if(window.addEventListener){
		window.addEventListener('resize', moveDash, false);
	}else{
		window.attachEvent ('onresize', moveDash);
	}
	function moveDash(){
		if($(window).width() < 865){
			$moveTo2.insertAfter(".whatNews");
		}else{
			$moveTo2.prependTo("#OriginMoveTo2");
		}
	}
	moveDash();
});

//lorsqu'on change la taille de la fenêtre, on appelle la fonction resize
if(window.addEventListener){
	window.addEventListener('resize', resizeChart, false);
}else{
	window.attachEvent ('onresize', resizeChart);
}
//	Change la hauteur des graphiques si on est en mode tablette/Desktop
function resizeChart(){
	var num;
	if($(window).width() < 865){
		for(var i in charts){
			charts[i].setSize(charts[i]["containerWidth"], 250, false);
		}
	}else{
		for(var i in charts){
			charts[i].setSize(charts[i]["containerWidth"], 350, false);
		}
	}
}

//alert(navigator.userAgent)
//	ajoute une class si on est sur un MAC 
if(navigator.userAgent.indexOf('Macintosh') > 0)
    $('body').addClass('mac-os');