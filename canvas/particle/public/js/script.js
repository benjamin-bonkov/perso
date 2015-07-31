$(document).ready(function(){
	$("html").removeClass("no-js");
	// target ie10
		if (Function('/*@cc_on return document.documentMode===10@*/')()){
		    document.documentElement.className+=' lt-ie10 ie10 ';
		}
	// target ie11
	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf('MSIE ');
	    var trident = ua.indexOf('Trident/');
	    if (trident > 0) {
		    // IE 11 (or newer) => return version number
		    var rv = ua.indexOf('rv:');
		   document.documentElement.className+= " lt-ie11 ie+ua.substring(rv + 3, ua.indexOf('.', rv))";
	    }

    // mobile menu toggle
        $(".nav-mobile-btn").on("click", function(){
            if($(this).hasClass("expanded")){
                $(this).siblings(".nav-mobile-dropdown").slideUp().removeClass("expanded");
                $(this).removeClass("expanded");
            } else {
                $(this).siblings(".nav-mobile-dropdown").slideDown().addClass("expanded");
                $(this).addClass("expanded");
            }
        });
        $(".nav-mobile-dropdown a").on("click", function(){
            var $navBtn = $(".nav-mobile-btn");
            if($navBtn.hasClass("expanded")){
                $navBtn.siblings(".nav-mobile-dropdown").slideUp().removeClass("expanded");
                $navBtn.removeClass("expanded");
            }
        });

    
    function init(){

        // twitter follow
            $(".twitter-follow").bind("click", function(e){
                e.preventDefault();
                var width  = 680,
                height = 575,
                // left   = ($(window).width()  - width)  / 2,
                // top    = ($(window).height() - height) / 2,
                url    = "https://twitter.com/intent/follow/?screen_name=@_SOOYOOS_",
                opts   = 'status=1' +
                ',width='  + width  +
                ',height=' + height //+
                // ',top='    + top    +
                // ',left='   + left
                ;

                window.open(url, 'twitter', opts);

                return false;
             });

        // insta feed
            if($("#instafeed").length > 0){
                var userFeed = new Instafeed({
                    get: 'user',
                    userId: 1711451541,
                    accessToken: '1711451541.467ede5.c1f0784d144b4fdf9ce8a539fdc9319b',
                    sortBy: "none",
                    links: true,
                    limit: 9,
                    resolution: 'standard_resolution',
                });
                userFeed.run();
            }

        // tab système
            $(".tab").each(function(){
                var $tab = $(this)
                ,	$tabButtons = $tab.find(".tab-buttons a")
                ,	$tabContent = $(".tab-content");
                $tabButtons.click(function(e){
                    e.preventDefault();
                    var $this = $(this)
                    ,	$target = $($this.attr("href"));
                    $tabButtons.removeClass("active");
                    $this.addClass("active");
                    $tabContent.hide();
                    $target.show();
                });
                $tabButtons.eq(0).click();
            });
    }
    init();

    // url change
        function processAjaxData(response, urlPath){
            document.getElementById("content").innerHTML = response.html;
            document.title = response.pageTitle;
            window.history.pushState({"php":response.php,"pageTitle":response.pageTitle},"", urlPath);
        }

	// ajax menu
		$(".menu a").click(function(e){
			e.preventDefault();
			var $this = $(this)
			,	target = $this.attr("data-target");
            $this.addClass("active").parents("li").siblings().find("a").removeClass("active");
			jQuery.ajax({
				url: target+"-content.php",
				contentType: "html",
				success : function(data){
					$(".page-content").html($(data)).prop("id", target);
                    init();
                    var stateObj = {target : target};
                    window.history.pushState(stateObj, target+" - Sooyoos", target+".php");
				}
			})
		});

});