// baseUrl/#numactif
	// peut-etre utile pour recupe les infos du hash (decoupe en tableau)
	//var regExpSplit = new RegExp("[#/ ,;]+", "g");
    function getHashInit(){
        if(window.location.hash != ""){//si on a une ancre d'active
            var hash =  window.location.hash
            ,	hashSplit =  hash.split(regExpSplit);
        }
    }
    getHashInit();

//au changement de l'historique
    window.onpopstate = function(e){
    	//penser a parfois reinit les variables
    	getHashInit();
    }

// modifie l'url, et ajoute une entrée dans l'historique
    var hashtag = "";
    function updateHistory(){
        if(history && history.pushState){//on vérifie si le navigateur supporte la navigation par historique
            var newHashtag = "#"+numActif;
            if(newHashtag != hashtag){//si on change de #
                history.pushState({page: newHashtag}, newHashtag, newHashtag);//on écrit dans l'historique, on modifie l'url
                hashtag = newHashtag;
            }
        }
    }