<?php

function add_theme_caps() {
    // gets the author role
    $role = get_role( 'editor' );
    
    $role->add_cap( 'create_users' ); 
    $role->add_cap( 'list_users' ); 
    $role->add_cap( 'add_users' ); 
    $role->add_cap( 'edit_users' ); 
    $role->add_cap( 'delete_users' ); 
    $role->add_cap( 'remove_users' ); 
    $role->add_cap( 'promote_users' ); 
}
add_action( 'admin_init', 'add_theme_caps');