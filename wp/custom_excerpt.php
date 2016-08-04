<!-- /** dans le template **/ -->
			<div class="entry-summary">
				<?php global $customLength; $customLength = 50; echo get_the_excerpt(); $customLength = 30;?>
			</div><!-- .entry-summary -->

<?php /* dans function.php */ 
/*custom excerpt*/
function new_excerpt_length() { 
	global $customLength; 
	if($customLength) { 
		return $customLength;
	} 
	else {
		return 30;
	} 
}
add_filter('excerpt_length', 'new_excerpt_length');


/** read more **/
function new_excerpt_more( $more ) {
	return ' <a class="read-more" href="'. get_permalink( get_the_ID() ) . '">' . __('Read More', 'your-text-domain') . '</a>';
}
add_filter( 'excerpt_more', 'new_excerpt_more' );