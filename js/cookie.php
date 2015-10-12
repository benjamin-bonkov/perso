<style>
/********************* cookie disclaimer *********************/
	.cookie{padding: 10px; text-align: center; font-size: 11px; text-shadow: 1px 1px 1px #000; color: #fff; background: #A3AFB3;}
	.cookie *{display: inline-block; vertical-align: middle;}
	.cookie p{text-align: left; margin-left: 30px; padding-bottom: 0;}
	.cookie a{color: #fff; text-decoration: underline; /* font-weight: bold;*/}
	.cookie .btn {width: 35px; min-width: 0; margin: 0 0 0 30px; color: #000; text-decoration: none; text-shadow: none; font-size: 18px; vertical-align: middle; display: inline-block;}
</style>
<?php if(!isset($_COOKIE['cookie-babybel']) || !$_COOKIE['cookie-babybel']): ?>
    <div class="cookie">
        <p>
	        Les cookies assurent le bon fonctionnement de notre site. En utilisant ce dernier, vous acceptez l'utilisation des cookies. 
	        <a href="<?php echo $this->baseUrl('/vie-privee#cookies'); ?>">En savoir +</a>
	        <button class="btn red close">OK</button>
        </p>
    </div>
<?php endif; ?>
<script>
// cookie disclaimer
	$(".cookie .close").click(function(){
		$(".cookie").fadeOut().remove();
		var date = new Date();
		date.setYear(date.getUTCFullYear() + 1);
		document.cookie="cookie-babybel=true; expires="+ date.toUTCString() +"; path=/";
	});
</script>