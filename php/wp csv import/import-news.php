<?php

add_action( 'admin_menu', 'ss_add_import_news_page' );
function ss_add_import_news_page() {
	add_menu_page( 'Import News', 'Import News', 'manage_network', 'ss-import-news', 'ss_import_news_page', 'dashicons-external', 2 );
}

function ss_import_news_page(){ ?>

	<div class="wrap" id="importNewsPage">
		<h2>Import news</h2>
        <p>This is only meant to be used to import news on spanish website.</p>
        <p>And this page with its features must be used by an aware developer.</p>
        <p>When starting the import it is forbidden to close or refresh the page, if you do so errors may occurs.</p>
        
        <form enctype="multipart/form-data" id="form_import_news" method="post" action="">
            <label for="import_news_file" style="font-weight: bold; display: block;">Chose a <code>.csv</code> file on your computer&nbsp;:</label>
            <input type="file" id="import_news_file" name="import_news_file">
            
            <p class="submit">
                <?php wp_nonce_field('ss_import_news_nonce', 'ssajaxsecurity'); ?>
                <input type="button" value="Start import" class="button button-primary button-large" id="start_import_news" name="start_import_news">
                <span class="spinner spinner-disabled js-import-news-spinner" style="float: none;"></span>
            </p>
        </form>
        
        <pre class="js-import-news-result">
        </pre>
        
        <script>
			var $spinner = jQuery(".js-import-news-spinner");
			var $result = jQuery(".js-import-news-result");

			jQuery('#start_import_news').on('click', function(){
				var $that = jQuery(this);
				var file_data = jQuery('#import_news_file').prop('files')[0];
				var ajaxsecurity = jQuery('input[name=ssajaxsecurity]').val();

				if(!$that.hasClass('currentlyRunning')){

					$that.addClass('currentlyRunning disabled').attr('disabled', true);
					$spinner.removeClass('spinner-disabled').css('visibility', 'visible');
					$result.html('');

					var form_data = new FormData();
					form_data.append('file', file_data);
					form_data.append('action', 'ss_import_news');
					form_data.append('ajaxsecurity', ajaxsecurity);

					jQuery.ajax({
						url: '<?php echo admin_url( 'admin-ajax.php' ); ?>',
						type: 'POST',
						contentType: false,
						processData: false,
						data: form_data,
						success: function(data){
							$that.removeClass('currentlyRunning disabled').attr('disabled', false);
							$spinner.addClass('spinner-disabled').css('visibility', 'hidden');

							$result.html(data);
						},
						error: function(data){
							$that.removeClass('currentlyRunning disabled').attr('disabled', false);
							$spinner.addClass('spinner-disabled').css('visibility', 'hidden');

							$result.html(data);
						}
					});
				}
			});
        </script>
	</div>

<?php }

add_action( 'wp_ajax_ss_import_news', 'ss_import_news' );
function ss_import_news() {
	$nonce = isset($_POST['ajaxsecurity']) ? $_POST['ajaxsecurity'] : '';
	$file = isset($_FILES['file']) ? $_FILES['file'] : '';

	if ( $nonce && wp_verify_nonce($nonce, 'ss_import_news_nonce') ) {
        // Download the file then get its path to get it afterward
		$result = download_file($file);
        
		// Read the csv et get each lines
        // The csv file must be UTF-8 encoded or every accents will bug
		$row = 1;
		$news_list = array();
		if (($handle = fopen($result, "r")) !== false) {
			while (($line = fgetcsv($handle, 1000000, ';')) !== false) {
				// control the lines to use
				if($row>1){
					$news_list[] = $line;
				}
				$row++;
			}
			fclose($handle);
		}
		
		foreach ($news_list as $key => $news) {
            $display_post_type  = $news[7] == 'yes' ? 1 : 0;
			$display_post_date  = $news[8] == 'yes' ? 1 : 0;
			$display_toolbox    = $news[9] == 'yes' ? 1 : 0;
			
			$market = get_page_by_title( $news[4], 'OBJECT', 'market' );

			$post_arr = array(
				'post_title'    => $news[0],
				'post_date'     => $news[1],
				'post_type'     => 'news',
				'post_status'   => 'publish',
				'post_author'   => get_current_user_id()
			);
			$news_post_id = wp_insert_post( $post_arr );

			wp_set_object_terms( $news_post_id, $news[5], 'news-category' ); // Insert new category
			
			update_field( 'field_5be413b505aae', array($market->ID)  , $news_post_id ); // markets
			update_field( 'field_5be45573a68d2', $news[3]            , $news_post_id ); // description
			update_field( 'field_5be310fd718e2', $display_post_type  , $news_post_id ); // display_post_type
			update_field( 'field_5be31142718e3', $display_post_date  , $news_post_id ); // display_post_date

			// Save to the flexible content
			$flexible_content_key = "field_5be31a6cb0e22";
			$value = array(
				array(
					'acf_fc_layout'     => "free_text_zone", 
                    'display_toolbox'   => $display_toolbox,
                    'title'             => $news[10],
                    'free_text_zone'    => $news[11]
                )
			);
			update_field( $flexible_content_key, $value, $news_post_id );
            
            echo '- News Key : '.$key. ' -> inserted -> ' .$news_post_id . '<br>';
		}
		
	} else {
		echo 'An error occured. Please try again later or contact a developer.';
	}

	die();
}

function download_file($file) {
    // Must allow right 777 to the folder 'import-news'
    // ssh on the server and go to the folder containing 'import-news/' and do the following cmd
    // `sudo -s`
    // `chown apache:apache import-news/`
    // `chmod 777 import-news/`
    // Now it's all good !
	$uploads_dir = WP_CONTENT_DIR.'/uploads';
	$uploadFile = $uploads_dir.'/import-news/import-news-'.time().'.csv';
	move_uploaded_file($file['tmp_name'], $uploadFile);
	return $uploadFile;
}
    



