// FORM MATERIAL HANDLER
    function toggleHasValueClass($this){
        if($this.val().length > 0){
            $this.addClass("has-value");
        } else {
            $this.removeClass("has-value");
        }
    }
    if($(".materialForm").length > 0){
        $("input, textarea").each(function(){
            toggleHasValueClass($(this));
        }).on( "focusout", function(){
            toggleHasValueClass($(this));
        });
    }