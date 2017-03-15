
<?php 

function parseIntoDateTime($datetime){
	echo ucfirst(date_i18n('l j F, G\hi', strtotime($datetime)));
}
function parseIntoDate($date){
	echo ucfirst(date_i18n('l j F', strtotime($date)));
}
function parseIntoDateFR($date){
	echo ucfirst(date_i18n('d/m/Y', strtotime($date)));
}

$currentFilter = isset($_GET['filterBy']) ? $_GET['filterBy'] : '';

$filterPastClass = '';
$filterFutureClass = '';
$dateFilterArray = array();

if($currentFilter == 'future'){
	$filterFutureClass = 'active';
	$dateFilterArray = array(
		'relation' => 'AND',
		array(
			// 'relation' => 'OR',
			array(
				'key'		=> 'date_debut',
				'value'		=> date( "Y-m-d H:i" ),
				'compare'	=> '>='
			),
		),
		array(
			'key'     => 'date_debut',
			'compare' => 'EXISTS'
		)
	);
} else if($currentFilter == 'past'){
	$filterPastClass = 'active';
	$dateFilterArray = array(
		'relation' => 'AND',
		array(
			// 'relation' => 'OR',
			array(
				'key'		=> 'date_fin',
				'value'		=> date( "Y-m-d H:i" ),
				'compare'	=> '<'
			),
		),
		array(
			'key'     => 'date_fin',
			'compare' => 'EXISTS'
		)
	);
}else if($currentFilter == 'current'){
	$filterCurrentClass = 'active';
	$dateFilterArray = array(
		'relation' => 'AND',
		array(
			'relation' => 'AND',
			array(
				'key'		=> 'date_debut',
				'value'		=> date( "Y-m-d H:i" ),
				'compare'	=> '<'
			),
			array(
				'key'		=> 'date_fin',
				'value'		=> date( "Y-m-d H:i" ),
				'compare'	=> '>'
			),
		),
		array(
			'key'     => 'date_fin',
			'compare' => 'EXISTS'
		)
	);
} else {
	$filterFutureClass = 'active';
	$dateFilterArray = array(
		'relation' => 'AND',
		array(
			'relation' => 'OR',
			array(
				'key'		=> 'date_debut',
				'value'		=> date( "Y-m-d H:i" ),
				'compare'	=> '>='
			),
		),
		array(
			'key'     => 'date_debut',
			'compare' => 'EXISTS'
		)
	);
}
?>
<div class="titleZone">
	<div class="titleZone__title"><?php echo get_the_title(); ?></div>
	<div class="titleZone__text">
		<?php the_field("subtitle_text"); ?>
	</div>
</div>

<div class="promotions__list inner">
	<div class="promotionsList__filters">
		<span class="promotionsList__filtersTitle">Afficher les promotions :</span>
		<a href="<?php echo esc_url(get_permalink()); ?>?filterBy=past" class="btn btn-blue eventListFilters-btn btn-transparent <?php echo $filterPastClass; ?>">
			Passé
		</a>
		<a href="<?php echo esc_url(get_permalink()); ?>?filterBy=current" class="btn btn-blue eventListFilters-btn btn-transparent <?php echo $filterCurrentClass; ?>">
			en cours
		</a>
		<a href="<?php echo esc_url(get_permalink()); ?>?filterBy=future" class="btn btn-blue eventListFilters-btn btn-transparent <?php echo $filterFutureClass; ?>">
			Futur
		</a>
	</div>

	<div class="grid grid__withPadding-15">

		<?php 
			$args = array(
				'post_type' => 'promos',
				'posts_per_page' => -1,
				'meta_query' => $dateFilterArray,
				'meta_key' => 'date_debut',
				'orderby' => array(
					'date_debut' => 'ASC'
				)
			);

			$post_query = new WP_Query($args);

			if( $post_query->have_posts() ) :
				while ($post_query->have_posts()) : $post_query->the_post();
				$promoID = get_the_ID();
		?>

		<div class="col-lg-33 col-sm-50">
			<div class="promotionItem">
				<div class="promotionItem__inner verticalCenter transition-2">
					<div class="promotionItem__imageBackground transition-2" style="background-image: url('<?php echo get_field('visuel',$promoID)['sizes']['promotion_thumb']; ?>');"></div>
					<div>
						<div class="promotionItem__reduction"><?php echo get_field('reduction',$promoID) ?> %</div>
					</div>
				</div>
				<div class="promotionItem__text">
					<?php the_title(); ?> - du <?php echo parseIntoDateFR( get_field('date_debut',$promoID) ); ?> au <?php echo parseIntoDateFR( get_field('date_fin',$promoID) ); ?> <br>
					<?php echo get_field('points',$promoID) ?> points rapportés
				</div>
			</div>
		</div>
		<?php
			endwhile;
		else: ?>
			<div class="actuList__noPost actuList__title tac">
				Aucun article n'a été trouvé.
			</div>
		<?php
		endif;
		wp_reset_postdata();
		?>
	</div><!-- grid -->
</div><!-- promotions__list -->
