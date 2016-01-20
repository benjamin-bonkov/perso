
$(".selectMenu-list a").bind("click", function(e){
	if(e.which == 2){return;}//keep middle mouse deffault behaviour
	e.preventDefault()
});