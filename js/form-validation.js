$(document).ready(function(){
	$("[required]").focusout(function(){
		var $this = $(this)
		,	$form__group = $this.closest(".form__group")
		,	$form__error = $form__group.find(".form__error");
		if($.trim($this.val()) == ""){
			$form__group.addClass("errors");
			$form__error.show();
		}else{
			$form__group.removeClass("errors");
			$form__error.hide();
		}
	});

	$(".js-valid-email").focusout(function(){
		var $this = $(this)
		,	$form__group = $this.closest(".form__group")
		,	$form__error = $form__group.find(".form__error");
        if( /^[a-zA-Z0-9_\.\-\+]+@[a-zA-Z0-9_\.-]+\.[a-zA-Z]{2,6}$/.test($this.val()) ){
			$form__group.removeClass("errors");
			$form__error.hide();
		}else{
			$form__group.addClass("errors");
			$form__error.show().text("Email invalide");
		}
	});

	$(".js-valid-email-confirm").focusout(function(){
		var $this = $(this)
		,	$form__group = $this.closest(".form__group")
		,	$form__error = $form__group.find(".form__error");
		if($this.val()== $(".js-valid-email-to-confirm").val()){
			$form__group.removeClass("errors");
			$form__error.hide();
		}else{
			$form__group.addClass("errors");
			$form__error.show().text("La confirmation de l'adresse email ne correspond pas.");
		}
	});

	$(".js-date-day").keyup(function(){
		var $this = $(this)
		if($this.val().length == 2){
			$(".js-date-month").focus();
		}
	})
	$(".js-date-month").keyup(function(){
		var $this = $(this)
		if($this.val().length == 2){
			$(".js-date-year").focus();
		}
	})
});