<!-- dans html -->
<?php the_breadcrumb(); ?>

<?php /*dans function.php*/
function getListCatBreadcrumb($cat){
    if($cat->name != ""){
        $listCat = "<span class='separator'> > </span><a href='".get_category_link( $cat->cat_ID )."'>".$cat->name."</a>";
    }
    // var_dump($listCat);
    while($cat->parent != 0){
        $cat = get_category($cat->parent);
        $listCat = "<span class='separator'> > </span><a href='".get_category_link( $cat->cat_ID )."'>".$cat->name.'</a> '.$listCat;
    }
    return $listCat;
}
function the_breadcrumb() {
    global $post;
    echo '<div id="breadcrumbs">';
    if (!is_home()) {
        echo '<a href="'.get_option('home').'">'.'Home</a>';
        // echo '<span class="separator"> > </span>';
        if (is_category()) {
            $cat = get_category(get_query_var('cat'));          
            $listCat = getListCatBreadcrumb($cat);
            echo $listCat;
            // the_category('<span class="separator"> > </span> ');
            if (is_single()) {
                echo '<span class="separator"> > </span>';
                echo the_title();
            }
        } elseif (is_single()) {
            $cats = get_the_category();
            foreach ($cats as $key => $cat) {
                if($key == 0){
                    $listCat = getListCatBreadcrumb($cat);
                }else{
                    $listCat2 = getListCatBreadcrumb($cat);
                    if ($listCat < $listCat2) {
                        $listCat = $listCat2;
                    }
                }
            }   
            echo $listCat;
            // the_category('<span class="separator"> > </span> ');
            if (is_single()) {
                echo '<span class="separator"> > </span>';
                echo the_title();
            }

        } elseif (is_page()) {
            if($post->post_parent){
                $anc = get_post_ancestors( $post->ID );
                $title = get_the_title();
                foreach ( $anc as $ancestor ) {
                    $output = '<span class="separator"> > </span><a href="'.get_permalink($ancestor).'" title="'.get_the_title($ancestor).'">'.get_the_title($ancestor).'</a>';
                }
                echo $output;
                echo '<span title="'.$title.'"> '.$title.'</span>';
            } else {
                echo '<span class="separator"> > </span><span> '.get_the_title().'</span>';
            }
        }
    }
    elseif (is_tag()) {single_tag_title();}
    elseif (is_day()) {echo"<span>Archive for "; the_time('F jS, Y'); echo'</span>';}
    elseif (is_month()) {echo"<span>Archive for "; the_time('F, Y'); echo'</span>';}
    elseif (is_year()) {echo"<span>Archive for "; the_time('Y'); echo'</span>';}
    elseif (is_author()) {echo"<span>Author Archive"; echo'</span>';}
    elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {echo "<span>Blog Archives"; echo'</span>';}
    elseif (is_search()) {echo"<span>Search Results"; echo'</span>';}
    echo '</div>';
}