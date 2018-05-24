<?php
// use this instagram access token generator http://instagram.pixelunion.net/
function display_latest_instagram(
	$access_token="3045581.3a81a9f.c6ee1f39614749caae724110409f6108",
	$count = 9,
	$cache_file  = './instagram.json'
){

	// Seconds to cache feed (Default : 3 minutes).
	$cachetime           = 6*3;

	// Time that the cache was last updtaed.
	$cache_file_created  = ((file_exists($cache_file))) ? filemtime($cache_file) : 0;

	// Show cached version of tweets, if it's less than $cachetime.
	if (time() - $cachetime < $cache_file_created) {
		// Display tweets from the cache.
		readfile($cache_file);
	} else {
		// Cache file not found, or old. 
		$json_link="https://api.instagram.com/v1/users/self/media/recent/?";
		$json_link.="access_token={$access_token}&count={$count}";

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
display_latest_instagram(
	$access_token="1711451541.1677ed0.df910bc1495a4885b61a573261c30688",
	$count = 9,
	$cache_file = './instagram.json'
);