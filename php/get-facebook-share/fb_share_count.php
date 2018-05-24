<?php

// requis pour l'api FB qui recupère les compteur de partage
require_once __DIR__ . '/vendor/autoload.php'; 

function helper_get_share_count_by_url($source_url){
	if($source_url == "") return;
	$total = 0;
	/* OK, mais TRES limité*/

	$facebookAppId = "129971684293963";
	$facebookAppSecret = "7580c7757d95697c644b1b2591217665";
	try {
		$fb = new \Facebook\Facebook([
		  'app_id' => '129971684293963',
		  'app_secret' => '7580c7757d95697c644b1b2591217665',
		  'default_graph_version' => 'v2.10',
		  'default_access_token' => '129971684293963|7580c7757d95697c644b1b2591217665', // optional
		]);
		$request = $fb->get('?id='.urlencode($source_url).'&fields=og_object{engagement}');
		// var_dump($request);

		// var_dump($request->getBody());
		if($request->getBody()){
			$jsonBody = json_decode($request->getBody());
			if(isset($jsonBody->og_object)){

				$total = $jsonBody->og_object->engagement->count;
			}
		}

	} catch (Exception $e) {}
	return $total;
}
echo "http://sooyoos.com : ";
echo helper_get_share_count_by_url("http://sooyoos.com");
echo "partages";