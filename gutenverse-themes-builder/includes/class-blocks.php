<?php
/**
 * Blocks
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Init
 *
 * @package gutenverse-themes-builder
 */
class Blocks {
	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ), 99 );
		add_filter( 'gutenverse_block_categories', array( $this, 'block_category' ) );
	}

	/**
	 * Block Category
	 *
	 * @param array $categories Block Categories.
	 *
	 * @return array
	 */
	public function block_category( $categories ) {
		$categories['gutenverse-theme-builder'] = __( 'Gutenverse Themes Builder', 'gutenverse-themes-builder' );
		return $categories;
	}

	/**
	 * Register All Blocks
	 */
	public function register_blocks() {
		// Static block.
		$this->register_dynamic_block( GUTENVERSE_THEMES_BUILDER_DIR . './block/pattern-wrapper/block.json' );
	}

	/**
	 * Register dynamic block.
	 *
	 * @param string $json .
	 */
	private function register_dynamic_block( $json ) {
		if ( ! file_exists( $json ) ) {
			return;
		}

		$block_json = gutenverse_get_json( $json );

		if ( isset( $block_json['class_callback'] ) ) {
			$instance = new $block_json['class_callback']();

			register_block_type(
				$json,
				array(
					'render_callback' => array( $instance, 'render' ),
				)
			);
		}
	}
}
