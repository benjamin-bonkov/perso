<?php
// get id page on https://findmyfbid.com
function display_latest_facebook(
	$facebookPageId = "116455261255",
	$cache_file  = './facebook.json',
	$count = 50
){
	$facebookAppId = "129971684293963";
	$facebookAppSecret = "7580c7757d95697c644b1b2591217665";

	// Seconds to cache feed (Default : 3 minutes).
	$cachetime           = 6*3;

	// Time that the cache was last updtaed.
	$cache_file_created  = ((file_exists($cache_file))) ? filemtime($cache_file) : 0;

	// Show cached version of tweets, if it's less than $cachetime.
	if (time() - $cachetime < $cache_file_created) {
		$tweet_found = true;
		// Display tweets from the cache.
		readfile($cache_file);
	} else {
		// Cache file not found, or old. 
		$json_link = 'https://graph.facebook.com/'.$facebookPageId.'/posts?fields=';
		$json_link .=	'message,';
		$json_link .=	'link,';
		$json_link .=	'picture,';
		$json_link .=	'description,';
		$json_link .=	'created_time,';
		$json_link .=	'comments.summary(total_count).limit(0).as(comments),';
		$json_link .=	'reactions.type(LIKE).summary(total_count).limit(0).as(like),';
		$json_link .=    'reactions.type(LOVE).summary(total_count).limit(0).as(love),';
		$json_link .=    'reactions.type(WOW).summary(total_count).limit(0).as(wow),';
		$json_link .=    'reactions.type(HAHA).summary(total_count).limit(0).as(haha),';
		$json_link .=    'reactions.type(SAD).summary(total_count).limit(0).as(sad),';
		$json_link .=    'reactions.type(ANGRY).summary(total_count).limit(0).as(angry)';
		$json_link .=    '&limit='.$count;
		$json_link .=    '&access_token='.$facebookAppId.'|'.$facebookAppSecret;
		// echo $json_link;
		$json = file_get_contents($json_link);

		// Start output buffering.
		ob_start();
		echo $json;

		// Generate a new cache file.
		$file = fopen($cache_file, 'w');

		// Save the contents of output buffer to the file, and flush the buffer. 
		fwrite($file, ob_get_contents()); 
		fclose($file); 
		ob_end_flush();
	}

}
display_latest_facebook(
	$facebookPageId = "116455261255",
	$cache_file  = './facebook.json',
	$count = 50
);