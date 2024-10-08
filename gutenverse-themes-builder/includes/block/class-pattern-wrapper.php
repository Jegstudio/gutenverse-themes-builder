<?php
/**
 * Pattern Wrapper
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Block;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Pattern Wrapper
 *
 * @package gutenverse-themes-builder
 */
class Pattern_Wrapper extends Block_Abstract {
	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$mode    = $this->attributes['mode'];
		$pattern = $this->attributes['pattern'];

		if ( 'use' === $mode ) {
			$slug    = $pattern['value'];
			$post    = get_page_by_path( $slug, OBJECT, 'gutenverse-pattern' );
			$content = ! empty( $post->post_content ) ? $post->post_content : '';
			$blocks  = parse_blocks( $content );
			$content = '';

			// removed because some HTML tags styling became broken.
			remove_filter( 'the_content', 'wpautop' );

			if ( ! empty( $blocks ) ) {
				foreach ( $blocks as $block ) {
					if ( 'core/post-content' !== $block['blockName'] && 'gutenverse/post-content' !== $block['blockName'] ) {
						$content .= apply_filters( 'the_content', render_block( $block ) );
					}
				}
			}

			return $content;
		}
	}
}
