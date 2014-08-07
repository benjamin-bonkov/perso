<?php /** dans la page du theme **/
		wp_reset_postdata();
		$posts = query_posts('posts_per_page=3&post_type=agenda');
		foreach ($posts as $key => $post) :
			var_dump($post)
	?>
		<div class="post clearfix">
		<?php $dateEvent = new DateTime(get_post_meta($post->ID, "agenda_date_field", true)); ?>
		<?php $j = date_format($dateEvent, 'd'); ?>
		<?php $m = date_format($dateEvent, 'M'); ?>
		<?php $y = date_format($dateEvent, 'Y'); ?>

			<a href="<?php echo $post->guid; ?>" class="date left">
				<span class="day"><?php  echo $j ?></span>
				<span class="month"><?php  echo $m ?></span>
				<span class="month"><?php  echo $y ?></span>
			</a>
			<div class="content">								
				<a href="<?php echo $post->guid; ?>" class="title "><?php the_title(); ?></a> <br>
				<a href="<?php echo $post->guid; ?>" class="excerpt "><?php echo the_excerpt(); ?></a>
			</div>
		</div>
	<?php endforeach; ?>

<?php /** dans fonction.php **/

/**
*	custom post type
**/
add_action('init', 'my_custom_init');
function my_custom_init()
{
	register_post_type('agenda', array(
		'label' => __('Agendas'),
		'singular_label' => __('Agenda'),
		'public' => true,
		'show_ui' => true,
		'capability_type' => 'page',
		'hierarchical' => true,
		'supports' => array('title', 'excerpt')
	));
}

/**
 * Adds a box to the main column on the Post and Page edit screens.
 */
function agenda_add_meta_box() {
	// in what type (post/page/custom) to show
	$screens = array( 'agenda' );
	foreach ( $screens as $screen ) {
		add_meta_box(
			'agenda_sectionid',
			__( 'The date', 'agenda_textdomain' ),
			'agenda_meta_box_callback',
			$screen
		);
	}
}
add_action( 'add_meta_boxes', 'agenda_add_meta_box' );

/**
 * Prints the box content.
 * 
 * @param WP_Post $post The object for the current post/page.
 */
function agenda_meta_box_callback( $post ) {

	// Add an nonce field so we can check for it later.
	wp_nonce_field( 'agenda_meta_box', 'agenda_meta_box_nonce' );
	/*
	 * Use get_post_meta() to retrieve an existing value
	 * from the database and use the value for the form.
	 */
	$value = get_post_meta( $post->ID, 'agenda_date_field', true );

	echo '<label for="agenda_date_field">';
	_e( 'Date de l\'évenement', 'agenda_textdomain' );
	echo '</label> ';
	echo '<input type="text" id="agenda_date_field" name="agenda_date_field" value="' . esc_attr( $value ) . '" size="25" class="datepicker" />';
}


/**
 * Enqueue the datepicker
 */
function enqueue_date_picker(){
    wp_enqueue_script(
		'field-date-js', 
		get_template_directory_uri().'/js/Field_Date.js', 
		array('jquery', 'jquery-ui-core', 'jquery-ui-datepicker'),
		time(),
		true
	);
	wp_enqueue_style( 'jquery-ui-datepicker' );
}
add_action( 'admin_enqueue_scripts', 'enqueue_date_picker' );

/**
 * Enqueue the css of datepicker
 */
function admin_css() {
	$admin_handle = 'admin_css';
	$admin_stylesheet = get_template_directory_uri() . '/css/jquery-ui.css';
	wp_enqueue_style( $admin_handle, $admin_stylesheet );
	$admin_stylesheet = get_template_directory_uri() . '/css/jquery-ui.theme.min.css';
	wp_enqueue_style( $admin_handle, $admin_stylesheet );
}
add_action('admin_print_styles', 'admin_css', 11 );

/**
 * When the post is saved, saves our custom data.
 *
 * @param int $post_id The ID of the post being saved.
 */
function agenda_save_meta_box_data( $post_id ) {

	/*
	 * We need to verify this came from our screen and with proper authorization,
	 * because the save_post action can be triggered at other times.
	 */

	// Check if our nonce is set.
	if ( ! isset( $_POST['agenda_meta_box_nonce'] ) ) {
		return;
	}

	// Verify that the nonce is valid.
	if ( ! wp_verify_nonce( $_POST['agenda_meta_box_nonce'], 'agenda_meta_box' ) ) {
		return;
	}

	// If this is an autosave, our form has not been submitted, so we don't want to do anything.
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	// Check the user's permissions.
	if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] ) {

		if ( ! current_user_can( 'edit_page', $post_id ) ) {
			return;
		}

	} else {

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
	}

	/* OK, it's safe for us to save the data now. */
	
	// Make sure that it is set.
	if ( ! isset( $_POST['agenda_date_field'] ) ) {
		return;
	}

	// Sanitize user input.
	$my_data = sanitize_text_field( $_POST['agenda_date_field'] );

	// Update the meta field in the database.
	update_post_meta( $post_id, 'agenda_date_field', $my_data );
}
add_action( 'save_post', 'agenda_save_meta_box_data' );