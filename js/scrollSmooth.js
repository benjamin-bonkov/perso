    // ***** ANCHOR SCROLLING ***** \\  
        $(".anchorSmooth").click(function(e){
            e.preventDefault();
            var $this = $(this)
            ,   href = $this.attr("href")
            , $target = $(href);

            $("html, body").animate({'scrollTop': $target.offset().top+2},500);
        });
