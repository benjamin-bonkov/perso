<?php
/*
	init post-type "landing pages" with meta "row-blocs" from "landing-default"
*/
add_action('save_post', function ($postId)
{
    if (get_post_type($postId) == "landing_pages") {
        if ( $post = get_page_by_path( 'landing-default', OBJECT, 'landing_pages' ) ){
            $idDefault = $post->ID;
        }else{
            return; // pas de default landing on arrete là
        }
        $postMeta = get_post_meta($postId); 
        $defaultMeta = get_post_meta($idDefault);
        if (array_key_exists('row-blocs', $postMeta) === false) {
            foreach ($defaultMeta as $key => $meta) {
                if (preg_match('#row-blocs#', $key)) {
                    update_post_meta($postId, $key, $meta[0], false);
                }
            }
        }
    }
});