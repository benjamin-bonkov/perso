<?php if(!isset($_COOKIE['cookie-babybel']) || !$_COOKIE['cookie-babybel']): ?>
    <div id="cookie">
        <p>
	        Les cookies assurent le bon fonctionnement de notre site. En utilisant ce dernier, vous acceptez l'utilisation des cookies. 
	        <a href="<?php echo $this->baseUrl('/vie-privee#cookies'); ?>">En savoir +</a>
	        <button class="btn red close">OK</button>
        </p>
    </div>
<?php endif; ?>
<script>
	$("#cookie .close").click(function(){
		$("#cookie").fadeOut().remove();
		var date = new Date();
		date.setYear(date.getUTCFullYear() + 1);
		document.cookie="cookie-babybel=true; expires="+ date.toUTCString() +"; path=/";
	});
</script>