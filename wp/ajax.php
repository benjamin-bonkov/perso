<?php 
//dans function.php
	add_action( 'wp_ajax_mon_action', 'ajax_mon_action' );
	add_action( 'wp_ajax_nopriv_mon_action', 'ajax_mon_action' );
	function ajax_mon_action() {
		$param = $_POST['param'];
		echo $param;
		die();
	}
?>
<!-- dans le theme header.php -->
<script type="text/javascript">
    var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
</script>

<!-- dans  le script.js -->
<script>
$(document).ready(function(){
    $.post(
        window.ajaxurl,
       {
            'action': 'mon_action',
            'param': {
                "cadeauID" : cadeauID,
                "isAjax" : true
            }
        },
        function(response){
            console.log(response);
        }
    );
});
</script>