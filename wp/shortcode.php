add_shortcode('traduction', function($atts, $content='') {
	global $sitepress;
	if(isset($sitepress) === true) {
		$lang = $sitepress->get_current_language();
	} else {
		$lang = 'fr';
	}
	
	$atts = shortcode_atts(array('lang' => 'fr'), $atts);
	
	if($atts['lang'] == $lang) {
		return $content;
	} else {
		return '';
	}
});
