<?php
	// pas apple ni android
	$urlUSNAP = "http://www.u-snap.net/";
	//apple
	if(strstr($_SERVER['HTTP_USER_AGENT'],'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'],'iPod') || strstr($_SERVER['HTTP_USER_AGENT'],'iPad')){
		$urlUSNAP = "https://itunes.apple.com/fr/app/u-snap/id391083745?mt=8#";
	}
	//android
	$ua = strtolower($_SERVER['HTTP_USER_AGENT']);
	if(stripos($ua,'android') !== false) {
		$urlUSNAP = "https://play.google.com/store/apps/details?id=com.telequid.usnap";
	}
?>