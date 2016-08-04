<?php
function enqueue_custom_scripts(){
	remove_action('wp_head', 'rsd_link'); // remove really simple discovery link
	remove_action('wp_head', 'wp_generator'); // remove wordpress version

	remove_action('wp_head', 'feed_links', 2); // remove rss feed links (make sure you add them in yourself if youre using feedblitz or an rss service)
	remove_action('wp_head', 'feed_links_extra', 3); // removes all extra rss feed links

	remove_action('wp_head', 'index_rel_link'); // remove link to index page
	remove_action('wp_head', 'wlwmanifest_link'); // remove wlwmanifest.xml (needed to support windows live writer)

	remove_action('wp_head', 'start_post_rel_link', 10, 0); // remove random post link
	remove_action('wp_head', 'parent_post_rel_link', 10, 0); // remove parent post link
	remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // remove the next and previous post links
	remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );

	remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );

	remove_action('admin_print_scripts',	'print_emoji_detection_script');
	remove_action('admin_print_styles',	'print_emoji_styles');
	remove_action('wp_head',		'print_emoji_detection_script',	7);
	remove_action('wp_print_styles',	'print_emoji_styles');
	remove_action('embed_head',		'print_emoji_detection_script');
	remove_filter('the_content_feed',	'wp_staticize_emoji');
	remove_filter('comment_text_rss',	'wp_staticize_emoji');
	remove_filter('wp_mail',		'wp_staticize_emoji_for_email');



	add_filter('the_generator', '__return_false');            // #6
	add_filter('show_admin_bar','__return_false');            // #7


	if( !is_admin() ){
		wp_deregister_script('jquery');
		wp_register_script('scriptTheme', (get_template_directory_uri()."/public/dist/js/all.min.js"), array(), '', false);
		wp_enqueue_script('scriptTheme');

		remove_action('wp_head', '_admin_bar_bump_cb');
		wp_deregister_style('dashicons');
		wp_deregister_style('admin-bar');


		wp_register_style( 'styleTheme', get_template_directory_uri()."/public/dist/css/style.min.css", null, false, false );
		wp_enqueue_style('styleTheme');

	}
}

add_action( 'wp_enqueue_scripts', 'enqueue_custom_scripts' );