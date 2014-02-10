$(document).ready(function(){
    /*  
    *   Permet de modifier des elements au scroll, 
    *   ajoute une entrée dans l'historique
    */

    var $section = $(".section"),//element à modifier quand on scroll dessus
        nbSection = $section.length,//nombre d'element
        hScroll = new Array,//tableau contenant l'élément et sa hauteur de scroll
        numActif = 0,//par deffaut, le premier element est actif
        y = 0,//hauteur active par deffaut a 0
        $link = $("#navTop a"),//lien de navigation au scroll
        hashtag = "";//le # actif, de base rien

    for (var i = 0; i < nbSection; i++){
        $section.eq(i).data("num", i);
        $link.eq(i).data("num", i);
        hScroll[i] = new Array(2);
        hScroll[i][0] = $section.eq(i); 
        hScroll[i][1] = hScroll[i][0].offset()["top"];
        if(i==nbSection-1){
            getHashInit();
        }
    }

    function getHashInit(){
        if(window.location.hash != ""){//si on a une ancre d'active
            $linkInit =  $("#navTop").find("[href='"+window.location.hash+"']");
            numActif = $linkInit.addClass("active").data("num");//on récupere l'ancre active
            setTimeout(function(){
                $linkInit.click()
            }, 200);
        }
    }

    /*
    *   Lorsqu'on scroll :
    *       -on récupere la position actuelle du scroll,
    *      -on la compare avec l'ancienne hauteur et la position des sections,
    *      -on change la section active selon le test
    *      -on modifie l'url, et ajoute une entrée dans l'historique
    */
    $(window).scroll(function(){
        var sTop = $(this).scrollTop(); //la hauteur du scroll actuellement

        if(sTop > y && numActif+1 < nbSection){//scrollDown => on descend
            if(hScroll[numActif+1][1] <= sTop+100){//on passe a la catégorie suivante
                numActif++;
                updateActif(numActif);// MAJ liens/sections active
            }
        }
        if(sTop < y && numActif-1 >= 0){//scrollUp => on monte
            if(hScroll[numActif][1] > sTop+100){//on passe a la catégorie precedente
                numActif--;
                updateActif(numActif);// MAJ liens/sections active
            }
        }
        y=sTop;//MAJ hauteur active
    });


    /*modifie l'url, et ajoute une entrée dans l'historique*/
    function updateHistory(){
        if(history && history.pushState){//on vérifie si le navigateur supporte la navigation par historique
            var newHashtag = $link.eq(numActif).attr("href");//le # du lien actif
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
        $link.removeClass("active");//on retire l'ancien actif
        $link.eq(num).addClass("active");//lien correspondant à l'élément actif NOW
        $section.removeClass("active");//on retire l'ancien actif
        $section.eq(num).addClass("active");//section correspondant à l'élément actif NOW
        updateHistory();//modifie l'url, et ajoute une entrée dans l'historique
    }

    /*
    *   Au click sur un lien :
    *       -vérifie si pas d'animation en cours,
    *       -verouille l'animation au scroll pour empecher les monkeys click,
    *       -animation du scroll jusqu'a la cible,
    *       -effet de bounce-out final,
    *       -on déverrouille l'animation
    */
    $link.click(function(e){
        var $thisLink = $(this),//le lien sur lequel on a clické
            target = $thisLink.attr("href"),//href du lien clické
            sTop = $(window).scrollTop(),//la hauteur du scroll actuellement
            scroll = $(target).offset()["top"]-80,
            bounce = 0,
            num =  $thisLink.data("num");
        if(sTop < scroll){//le scroll+le bounce
            scrollBounce($thisLink, scroll, bounce, 700, 200, num);
        }
        if(sTop > scroll){//le scroll-le bounce
            scrollBounce($thisLink, scroll, -bounce, 700, 200, num);
        }
        y=sTop;//MAJ hauteur active
    });

    /*
    *   gere l'animation scroll
    */
    function scrollBounce($element, scroll, bounce, timeScroll, timeBounce, num){
        //stop l'animation en cours, commence une nouvelle animation

        $('html,body').stop(true).animate({
                "scrollTop":(scroll+bounce)
        },
        timeScroll,
        function(){//le bounce-out
            if(bounce != 0){
                $('html,body').animate({
                    "scrollTop":scroll
                }, timeBounce, 
                function(){
                    setTimeout(function(){
                        numActif = num;
                        updateActif(num);
                    },500);
                });
            }
        });
        setTimeout(function(){
            numActif = num;
            updateActif(num);
        },500);
    }
});