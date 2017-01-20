<?php /* dans function.php */
    require get_template_directory() . '/inc/acf.php';
?>

<?php /* dans /inc/acf.php */

if( function_exists("acf_add_options_page")){

  $homeOptionsPage = array(
  
    /* (string) The title displayed on the options page. Required. */
    'page_title' => 'Bannière home',
    /* (string) The title displayed in the wp-admin sidebar. Defaults to page_title */
    'menu_title' => 'Bannière home',
    /* (string) The slug name to refer to this menu by (should be unique for this menu). 
    Defaults to a url friendly version of menu_slug */
    'menu_slug' => 'home_page',
    /* (string) The capability required for this menu to be displayed to the user. Defaults to edit_posts.
    Read more about capability here: http://codex.wordpress.org/Roles_and_Capabilities */
    'capability' => 'edit_posts', 
    /* (int|string) The position in the menu order this menu should appear. 
    WARNING: if two menu items use the same position attribute, one of the items may be overwritten so that only one item displays!
    Risk of conflict can be reduced by using decimal instead of integer values, e.g. '63.3' instead of 63 (must use quotes).
    Defaults to bottom of utility menu items */
    'position' => ('2.2222'), 
    /* (string) The slug of another WP admin page. if set, this will become a child page. */
    'parent_slug' => '',  
    /* (string) The icon url for this menu. Defaults to default WordPress gear */
    'icon_url' => 'dashicons-admin-home',
    /* (boolean) If set to true, this options page will redirect to the first child page (if a child page exists). 
    If set to false, this parent page will appear alongside any child pages. Defaults to true */
    'redirect' => true,
    /* (int|string) The '$post_id' to save/load data to/from. Can be set to a numeric post ID (123), or a string ('user_2'). 
    Defaults to 'options'. Added in v5.2.7 */
    'post_id' => 'home_page', // 64 home ?
    /* (boolean)  Whether to load the option (values saved from this options page) when WordPress starts up. 
    Defaults to false. Added in v5.2.8. */
    'autoload' => false,
    
  );
  acf_add_options_page( $homeOptionsPage );

}

/* custom css/js dans l'admin pour acf */
function admin_enqueue_acf() {
    wp_enqueue_script( 'my_custom_script', get_template_directory_uri() . '/public/js/admin/admin-acf.js' );
    // wp_enqueue_style( 'style-name', get_template_directory_uri(). '/public/css/block.css' );
    wp_enqueue_style( 'style-name', get_template_directory_uri(). '/public/css/admin-row.css' );
}
add_action( 'admin_enqueue_scripts', 'admin_enqueue_acf' );
?>

<?php /* dans la page du site (pour recup un champ de la page option) */
    
    $banner_image = get_field('banner_image', 'home_page');

?>