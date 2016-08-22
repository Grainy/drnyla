<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array( 'archive.twig', 'index.twig' );
$context = Timber::get_context();
$context['title'] = 'Archive';
if ( is_day() ) {
	$context['title'] = 'Archive: '.get_the_date( 'D M Y' );
} else if ( is_month() ) {
	$context['title'] = 'Archive: '.get_the_date( 'M Y' );
} else if ( is_year() ) {
	$context['title'] = 'Archive: '.get_the_date( 'Y' );
} else if ( is_tag() ) {
	$context['title'] = single_tag_title( '', false );
} else if ( is_author() ) {

	$author = get_userdata( get_query_var('author'));
	//print_r($author);
	//$context['authorMeta'] = $author;
	$context['authorImage'] = get_avatar($author->ID, 46);

} else if ( is_category() ) {
	$context['title'] = single_cat_title( '', false );
	$cat = get_category( get_query_var( 'cat' ) );
	$cat_id = $cat->cat_ID;
	$cat_name = $cat->name;
	$context['cat_slug'] = $cat->slug;
	$context['pagination'] = Timber::get_pagination();
	array_unshift( $templates, 'archive-' . get_query_var( 'cat' ) . '.twig' );
} else if ( is_post_type_archive() ) {
	$context['title'] = post_type_archive_title( '', false );
	//$context['archive_intro_text'] = get_field( get_post_type() . '_intro_text', 'option');
	array_unshift( $templates, 'archive-' . get_post_type() . '.twig' );
}


$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

$args = array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'paged' => $paged,
);

if ( is_category() ) {
	$category = get_the_category();

	$tax = 'category';
	$term = $category[0]->slug;

	$context['postType'] = $term;

	$args = array(
		'post_type' => 'post',
		'posts_per_page' => 12,
		'paged' => $paged,

		'tax_query' => array(
			array(
				'taxonomy' => $tax,
				'field' => 'slug',
				'terms' => $term
			)
		)
	);
} else if ( is_post_type_archive('brands') ) {
	query_posts($brandargs);
	$context['postType'] = 'brands';
	$context['posts'] = Timber::get_posts($brandargs);
} else if ( is_post_type_archive('sponsorships') ) {
	query_posts($sponsorargs);
	$context['postType'] = 'sponsorships';
	$context['posts'] = Timber::get_posts($sponsorargs);
} else if ( is_post_type_archive('careers') ) {
	query_posts($sponsorargs);
	$context['postType'] = 'careers';
	$context['posts'] = Timber::get_posts($careerargs);
} else {
	query_posts($args);
	$context['postType'] = 'news';
	$context['posts'] = Timber::get_posts($args);
	$context['categories'] = Timber::get_terms('category', array('orderby' => 'count','hide_empty' => 0,));
}

$context['pagination'] = Timber::get_pagination();

Timber::render( $templates, $context );
