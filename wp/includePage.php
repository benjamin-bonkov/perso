// $tab : array
function includePage($tab){
    $pages = get_posts($tab);
    $count = 0;
    foreach($pages as $page)
    {
        $content = $page->post_content;
        if(!$content)
            continue;
        if($count >= 2)
            break;
        $count++;
        $content = apply_filters('the_content', $content);
    	echo $content;
    }
}