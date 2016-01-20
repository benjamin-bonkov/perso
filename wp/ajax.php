<?php 
//dans function.php
	add_action( 'wp_ajax_mon_action', 'mon_action' );
	add_action( 'wp_ajax_nopriv_mon_action', 'mon_action' );
	function mon_action() {
		$param = $_POST['param'];
		echo $param;
		die();
	}
?>
<!-- dans le theme -->
<script type="text/javascript">
    var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
</script>