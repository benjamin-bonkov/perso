//load js
	$(document).ready(function(){
		function init(){
			if (
				$(window).width() >= 960) {
				var script = document.createElement('script');
				script.src = "public/js/parallax.js";
			   document.head.appendChild(script);
			}
		}
		init()
		$(window).resize(function(){
			init();
		})
	});