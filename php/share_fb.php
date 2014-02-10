<?php
	// pas apple ni android
	$urlShareFb = "http://www.facebook.com/sharer.php?s=100&p[url]=http://h.sooyoos.com/usnap-voeux/&p[images][0]=http://h.sooyoos.com/usnap-voeux/public/images/boite-a-voeux.png&p[title]=Avec la boite à voeux, découvre toi aussi plein de façons différentes de souhaiter la bonne année...&p[summary]=u SNAP VOUS SOUHAITE UNE BONNE ANNÉE. En 2013, les publicités nationales de votre journal s'enrichissent avec U SNAP. Vous pouvez désormais flasher votre page afin d'y retrouver des promotions, informations, offres privilégiées...&display=popup";
	//apple
	if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPod') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad')){
		$urlShareFb = "http://m.facebook.com/sharer.php?u=http://h.sooyoos.com/usnap-voeux/";
	}
	//android
	$ua = strtolower($_SERVER['HTTP_USER_AGENT']);
	if(stripos($ua,'android') !== false) {
		$urlShareFb = "http://m.facebook.com/sharer.php?u=http://h.sooyoos.com/usnap-voeux";
	}
?>
<a class="facebook-btn" href="<?php echo $urlShareFb; ?>" target="_blank" title="Partager sur Facebook">
	<img src="public/images/facebook.png" alt="" width="61"/>
</a>