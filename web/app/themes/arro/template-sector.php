<?php
/*
 * Template Name: Sectors
*/
$context = Timber::get_context();
$post = new TimberPost();

$context['post'] = $post;
$context['catSlug'] = null;

$context['catSlug'] = get_field('sidebar_sector_type');

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

$context['catPosts'] = Timber::get_posts($catargs);

Timber::render( 'page-templates/sector.twig', $context );
