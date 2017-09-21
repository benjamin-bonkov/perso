$(document).ready(function(){
	$("html").removeClass("no-js");

	if($('.js-storyDates').length >0){
		if( document.documentElement.scrollTop > ($(".page--header").height()||0) || document.body.scrollTop > ($(".page--header").height()||0) ){
			$('.js-storyDates').addClass('sticky');
		}
		$(window).on('scroll', function(){
			var currentOffset = document.documentElement.scrollTop || document.body.scrollTop,
				bottomOffset = currentOffset + $(window).outerHeight();
			if( currentOffset > ($(".page--header").height()||0) ){
				$('.js-storyDates').addClass('sticky');	
			} else {
				$('.js-storyDates').removeClass('sticky');
			}
		});
	}

	if($(".js-storyItem").length>0){
		var $storyItem = $(".js-storyItem")
		,	nbStoryItem = $storyItem.length
		,	$storyLink = $(".js-storyScrollTo")
		,	hScroll = new Array()
	    ,   numActif = 0
	    ,   y = 0
	    ,   hashtag = "";


	    $(".js-storyDates__TranslateWrap").css({"width":$storyLink.outerWidth(true)*nbStoryItem})

	    function update_hScroll(){
			for (var i = 0; i < nbStoryItem; i++){
		        hScroll[i] = new Array(2);
		        hScroll[i][0] = $storyItem.eq(i); 
		        hScroll[i][1] = hScroll[i][0].offset()["top"];
		    }
	    }
		for (var i = 0; i < nbStoryItem; i++){
	        $storyItem.eq(i).data("num", i);
	        $storyLink.eq(i).data("num", i);
	        if(i==nbStoryItem-1){
	            getHashInit();
	        }
	    }

		function setItemStory(){
			var $storyItemLength = $(".js-storyItem").length;
			$(".js-storyItem").css({"margin-top":0+"px"});
			if($(window).width() > 767){
				$(".storyContainer").removeClass("storyContainer--mobile");
				for (var i = 1; i < $storyItemLength; i++) {
					diff = $('.js-storyItem').eq(i).offset()['top'] - $('.js-storyItem').eq(i-1).offset()['top'];
					if(diff <= 100){
						$('.js-storyItem').eq(i).css({"margin-top":200+(-diff)+"px"});
					}
				}
			}else{
				$(".storyContainer").addClass("storyContainer--mobile");
			}
			update_hScroll();
		}setItemStory();
		$(window).resize(function(){
			setItemStory();
		});

	    function getHashInit(){
	        if(window.location.hash != ""){//si on a une ancre d'active
	            $linkInit =  $(".js-storyDates").find("[href='"+window.location.hash+"']");
	            numActif = $linkInit.addClass("active").data("num");//on récupere l'ancre active
	            setTimeout(function(){
	                $linkInit.click()
	            }, 200);
	        }
	        centerWrap(numActif);
	    }
	    /*
	    *   Lorsqu'on scroll :
	    *       -on récupere la position actuelle du scroll,
	    *      -on la compare avec l'ancienne hauteur et la position des sections,
	    *      -on change la section active selon le test
	    *      -on modifie l'url, et ajoute une entrée dans l'historique
	    */
		var scrollLocked = false;
	    $(window).scroll(function(){
			if(!scrollLocked){
				var wpAdminBArHeight = $("#wpadminbar").height()||0;
				if($(".js-storyDates").hasClass("sticky")){
					var headersHeight = ($(".header--main").height()||0)+$(".js-storyDates").height()+wpAdminBArHeight;
				}else{
					var headersHeight = ($(".header--main").height()||0)+$(".js-storyDates").height()*2+wpAdminBArHeight;
				}
		        var sTop = $(this).scrollTop(); //la hauteur du scroll actuellement

		        if(sTop > y && numActif+1 < nbStoryItem){//scrollDown => on descend
		            if(hScroll[numActif+1][1] <= sTop+headersHeight+20){//on passe a la catégorie suivante
		                numActif++;
		                updateActif(numActif);// MAJ liens/sections active
		            }
		        }
		        if(sTop < y && numActif-1 >= 0){//scrollUp => on monte
		            if(hScroll[numActif][1] > sTop+headersHeight+20){//on passe a la catégorie precedente
		                numActif--;
		                updateActif(numActif);// MAJ liens/sections active
		            }
		        }
		        y=sTop;//MAJ hauteur active
		    }
	    });


	    /*modifie l'url, et ajoute une entrée dans l'historique*/
	    function updateHistory(){
	        if(history && history.pushState){//on vérifie si le navigateur supporte la navigation par historique
	            var newHashtag = $storyLink.eq(numActif).attr("href");//le # du lien actif
	            if(newHashtag != hashtag){//si on change de #
	                history.pushState({page: newHashtag}, newHashtag, newHashtag);//on écrit dans l'historique, on modifie l'url
	                hashtag = newHashtag;
	            }
	        }
	    }

	    /*
	    *   change les liens/sections actives en fonction du numéro donné
	    */
	    function updateActif(num){
			numActif = num;
	        $storyLink.removeClass("active");//on retire l'ancien actif
	        $storyLink.eq(numActif).addClass("active");//lien correspondant à l'élément actif NOW
	        $storyItem.removeClass("active");//on retire l'ancien actif
	        $storyItem.eq(numActif).addClass("active");//storyItem correspondant à l'élément actif NOW
	        updateHistory();//modifie l'url, et ajoute une entrée dans l'historique
	        centerWrap(numActif);
	    }

		function centerWrap(num){
	        var translate = num*$storyLink.eq(1).outerWidth(true)+$storyLink.outerWidth(true)/2
	        $(".js-storyDates__TranslateWrap").css({"transform":"translateX(-"+translate+"px)"});
	    }

		$(".js-storyScrollTo").click(function(){
			var $this = $(this)
			,	$target = $($this.attr("href"))
			,	wpAdminBArHeight = $("#wpadminbar").height()||0
			,	firstItemModifier = 0
			,	newNum = $this.index();
			if($this.index()==0 ){
				firstItemModifier = 20;
			}
			if($(".js-storyDates").hasClass("sticky")){
				var headersHeight = ($(".header--main").height()||0)+$(".js-storyDates").height()+wpAdminBArHeight-firstItemModifier;
			}else{
				var headersHeight = ($(".header--main").height()||0)+$(".js-storyDates").height()*2+wpAdminBArHeight-firstItemModifier;
			}
			// $(".js-storyScrollTo").removeClass("active");
			// $this.addClass("active");

			if(!scrollLocked){
				scrollLocked = true;
		        $('html,body').stop(true).animate({
		            "scrollTop":($target.offset()["top"]-headersHeight)
		        },500,function(){
		        	updateActif(newNum);
				    scrollLocked = false;
		        });
		    }
		});
	}

});