<?php //in function.php
/*remove post-type slug in url*/
function remove_parent_in_child_url( $post_link, $post ) {
    if ( 'event' != $post->post_type || 'publish' != $post->post_status ) {
        return $post_link;
    }
    $post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );
    return $post_link;
}
add_filter( 'post_type_link', 'remove_parent_in_child_url', 10, 2 );
function cpt_event_parse_request( $query ) {
    if ( ! $query->is_main_query() || 2 != count( $query->query ) || ! isset( $query->query['page'] ) ) {
        return;
    }
    if ( ! empty( $query->query['name'] ) ) {
        $query->set( 'post_type', array( 'post', 'event', 'page' ) );
    }
}
add_action( 'pre_get_posts', 'cpt_event_parse_request' );