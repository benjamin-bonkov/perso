<?php
function check_values($data){
    // echo 'Post ID:';
    // echo "<pre>";
    // var_dump($data);
    // echo "</pre>";
    unset($data["post_modified"]);
    unset($data["post_modified_gmt"]);
    
	return $data;
}

add_filter( 'wp_insert_post_data', 'check_values');
