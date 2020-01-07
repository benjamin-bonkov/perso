// current tag actif (0 = aucun)
var indexLink = 0;
// appelé quand touche fleche haut/bas
// $scope => le conteneur de tes tags
// addIndex 
//		=> -1 on monte
//		=> 1 on descends
function focusPartLink($scope,addIndex){
	var $targets = $scope.find(".js-item_a_parcourir")
	,	targetsLengths = $targets.length;
	indexLink += addIndex;
	if(indexLink-1 < 0){
		indexLink = targetsLengths;
	}
	if(indexLink-1 >= targetsLengths){
		indexLink = 1;
	}
	var index = indexLink-1;
	$targets.removeClass("focus");
	$targets.eq(index).addClass("focus");
}
// appelé touche Entrée
function clickPartLink($scope){
	var index = indexLink-1;
	var $item_a_actionner = $scope.find(".js-item_a_parcourir").eq(index);
	// lien ou action JS (selon besoin)
	var href = $item_a_actionner.attr("href");
	if(href){
		window.location = href;
	}else{
		$item_a_actionner.click();
	}
}

$(".js-tonInput").keyup(function(e){
	switch (e.keyCode) {
        case 13: // enter 
        	e.stopPropagation();
        	clickPartLink($(".js-tag_conteneur"));
        	return;
        case 37: // leftArrowPressed
        	return;
        break;
        case 39: // rightArrowPressed
        	return;
        break;
        case 38: // upArrowPressed
			focusPartLink($(".js-tag_conteneur"), -1);
        	return;
        break;
        case 40: // downArrowPressed
			focusPartLink($(".js-tag_conteneur"), 1);
        	return;
        break;
    }
});