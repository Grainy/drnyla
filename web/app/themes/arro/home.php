<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */
if ( ! class_exists( 'Timber' ) ) {
	echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
	return;
}
$context = Timber::get_context();

$templates = array( 'index.twig' );

if ( is_home() ) {
	array_unshift( $templates, 'archive.twig' );
}

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$args = array(
	'post_type' => 'post',
	'posts_per_page' => 6,
	'paged' => $paged
);

query_posts($args);
wp_reset_query();

$libArgs = array(
	'post_type' => 'videos',
	'posts_per_page' => 3,
	'tax_query' => array(
	    array(
	    'taxonomy' => 'video_categories',
	    'field' => 'slug',
	    'terms' => array('library'))
	)
);

$libraryPosts = Timber::get_posts($libArgs);

$context['libraryPosts'] = [];

foreach ($libraryPosts as $libraryPost) {
	array_push($context['libraryPosts'], $libraryPost);
}

$globalArgs = array(
	'post_type' => 'videos',
	'posts_per_page' => 3,
	'tax_query' => array(
	    array(
	    'taxonomy' => 'video_categories',
	    'field' => 'slug',
	    'terms' => array('our-global-world'))
	)
);

$globalPosts = Timber::get_posts($globalArgs);

$context['globalPosts'] = [];

foreach ($globalPosts as $globalPost) {
	array_push($context['globalPosts'], $globalPost);
}

$socialArgs = array(
	'post_type' => 'videos',
	'posts_per_page' => 4,
	'tax_query' => array(
	    array(
	    'taxonomy' => 'video_categories',
	    'field' => 'slug',
	    'terms' => array('social-responsibility'))
	)
);

$socialPosts = Timber::get_posts($socialArgs);

$context['socialPosts'] = [];

foreach ($socialPosts as $socialPost) {
	array_push($context['socialPosts'], $socialPost);
}

$storyArgs = array(
	'post_type' => 'videos',
	'posts_per_page' => 4,
	'tax_query' => array(
	    array(
	    'taxonomy' => 'video_categories',
	    'field' => 'slug',
	    'terms' => array('stories-from-our-people'))
	)
);

$storyPosts = Timber::get_posts($storyArgs);

$context['storyPosts'] = [];

foreach ($storyPosts as $storyPost) {
	array_push($context['storyPosts'], $storyPost);
}

$context['postType'] = 'news';
$context['posts'] = Timber::get_posts($args);
$context['categories'] = Timber::get_terms('category', array('orderby' => 'count','hide_empty' => 0,));
$context['pagination'] = Timber::get_pagination();

Timber::render( $templates, $context );
