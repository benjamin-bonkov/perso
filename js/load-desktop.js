function loadDesktop(){
	console.log(loadDesktop);
	var $loadDesktop = $(".load-desktop");
	if($(window).width() > 768){
		console.log("> 768");
		$loadDesktop.each(function(){
			var $this = $(this)
			,	$content = $($this.attr("data-content"))
			console.log($content);
			$this.append($content).show();
			$this.attr("data-content","")
		});
	}else{
		$loadDesktop.hide();
	}
}loadDesktop();
$(window).resize(loadDesktop);