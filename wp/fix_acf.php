<?php
/* dans function.php */

add_action('init', "initHook", 0);  // We use the 0 to bypass priority

function initHook() {
    if(function_exists('acf')) {
        acf()->settings["dir"] = WP_CONTENT_URL."/plugins/advanced-custom-fields/";
    }
}