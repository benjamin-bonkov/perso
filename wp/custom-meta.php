<!-- dans head  -->
	<title><?php setTitle(); ?></title>
	<meta name="description" content="<?php setDescription(); ?>" />

<!-- Ajouter champs persos "title" et "description" dans la page -->

<?php
// dans function.php \\
	function setDescription(){
		$customDescription = get_post_meta(get_the_ID(), 'description', true);
		if(isset($customDescription) && $customDescription != ""){
			echo $customDescription;
		}else{
			bloginfo('description');
		}
	}
	function setTitle(){
		$title = get_post_meta(get_the_ID(), 'title', true);
		if(isset($title) && $title != ""){
			echo $title." | ".get_bloginfo( 'name', 'display' );
		}else{
			wp_title( '|', true, 'right' );
		}
	}