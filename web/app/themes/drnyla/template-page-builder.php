<?php
	/*
	Template Name: Builder
	*/

	if (!class_exists('Timber')){
		echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
		return;
	}

	$context = Timber::get_context();
	$post = new TimberPost();

	$context['args'] = array (
		'container'       => 'nav',
		'before'          => '',
		'after'           => '',
		'show_on_front'   => true,
		'network'         => false,
		'show_title'      => true,
		'show_browse'     => false,
		'echo'            => true
	);

	$postargs = array(
	    'post_type' => 'post',
	    'posts_per_page' => 3
	);

	$context['catSlug'] = null;

	if( have_rows('fc_page_sections') ):
		while ( have_rows('fc_page_sections') ) : the_row();
		    if( get_row_layout() == 'latest_articles_category' ):
		    	$catFilter = get_sub_field('category');
		    	$context['catSlug'] = $catFilter->slug;
		    endif;
		endwhile;
	endif;

	$tax = 'category';
	$term = $context['catSlug'];

	$catargs = array(
		'post_type' => 'post',
		'posts_per_page' => 2,
		'paged' => $paged,

		'tax_query' => array(
			array(
				'taxonomy' => $tax,
				'field' => 'slug',
				'terms' => $term
			)
		)
	);

	$context['post'] = $post;
	$context['posts'] = Timber::get_posts($postargs);
	$context['catPosts'] = Timber::get_posts($catargs);



	$templates = array('page-templates/page-builder.twig');
	Timber::render($templates, $context);
