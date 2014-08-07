$(document).ready(function(){

	$(".write").click(writeAjax);

	function writeAjax(){
		$.ajax({
			url: "/ajax/write/"+$("input").val(),
			cache: false
		}).done(function( data ) {
			// console.log(data);
		});
	}

	var timeout = setInterval(readAjax,500)
	,	focusOn = true
	,	start = $("#results").text().length;

	function readAjax(){
		// console.log(timeout);
		// if(focusOn){
			// console.log("readAjax");
			$.ajax({
				url: "/ajax/read/"+start,
				cache: false
			}).done(function( data ) {
				console.log(start);
				if(data != ""){
					$("#results").append(data);
					// start = $("#results").text().length;
					start += data.length;
				}
			});
		// }
	}

	// var window_focus;

	// $(window).focus(function() {
	// 	focusOn = true;
	//     	// console.log("focusIN");
	//     start = $("#results").text().length;
	// 	timeout = setInterval(readAjax,500);
	// })
	//     .blur(function() {
	// 		focusOn = false;
	//     	// console.log("focusOUT");
	// 		clearInterval(timeout);
	//     });

// Request Animation Frame
// courtesy of @paul_irish
	requestAnimationFrame = (function() {
	    var prefixed = (window.requestAnimationFrame       || 
	                    window.webkitRequestAnimationFrame || 
	                    window.mozRequestAnimationFrame    || 
	                    window.oRequestAnimationFrame      || 
	                    window.msRequestAnimationFrame     || 
	                    function( callback ){
	                        window.setTimeout(callback, 1000 / 60);
	                    });

	    var requestAnimationFrame = function() {
	        prefixed.apply(window, arguments);
	    };

	    return requestAnimationFrame;
	})();

	function startRender(){
		return requestAnimationFrame(readAjax)
	}


});