<?php
/**
 * Misc
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

use Gutenverse_Themes_Builder\Database\Database;
use WP_Theme_JSON_Resolver;

/**
 * Class Misc
 *
 * @package gutenverse-themes-builder
 */
class Misc {
	/**
	 * Get Colors settings
	 */
	public static function get_color_settings() {
		$theme  = wp_get_theme();
		$data   = WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( $theme );
		$data   = json_decode( $data['post_content'] );
		$colors = array();

		if ( ! empty( $data->settings->color->palette->custom ) ) {
			$colors = $data->settings->color->palette->custom;
		}

		return $colors;
	}

	/**
	 * Get Style settings
	 */
	public static function get_style_settings() {
		$theme  = wp_get_theme();
		$data   = WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( $theme );
		$data   = json_decode( $data['post_content'] );
		$styles = array();

		if ( ! empty( $data->styles ) ) {
			$styles = $data->styles;
		}

		return $styles;
	}

	/**
	 * Fix colors names
	 *
	 * @param string $content template content .
	 */
	public static function fix_colors( $content ) {
		$colors          = self::get_color_settings();
		$theme_id        = get_option( 'gtb_active_theme_id' );
		$theme_db        = Database::instance()->theme_info;
		$theme_info      = $theme_db->get_theme_data( $theme_id );
		$theme_slug      = $theme_info[0]['slug'];
		$imported_colors = get_option( 'gutenverse-global-color-import-' . $theme_slug );
		// change colors slug into lowercase to prevent errors.
		foreach ( $colors as $index => $color ) {
			$new_slug = 'theme-' . $index;
			$content  = str_replace( $color->slug, $new_slug, $content );
			$content  = str_replace( _wp_to_kebab_case( $color->slug ), $new_slug, $content );
		}

		return $content;
	}


	/**
	 * Export Core Navigation blocks
	 *
	 * @param string $html_content .
	 */
	public static function fix_core_navigation( $html_content ) {
		$html_blocks = parse_blocks( $html_content );
		$blocks      = _flatten_blocks( $html_blocks );

		foreach ( $blocks as $block ) {
			if ( 'core/navigation' === $block['blockName'] && ! empty( $block['attrs']['ref'] ) ) {
				$block_before = serialize_block( $block );
				$navigation   = get_post( $block['attrs']['ref'] );
				$attributes   = $block['attrs'];

				unset( $attributes['ref'] );

				$attributes  = wp_json_encode( $attributes );
				$content     = $navigation->post_content;
				$block_after = "<!-- wp:navigation {$attributes} -->{$content}<!-- /wp:navigation -->";

				$html_content = str_replace( $block_before, $block_after, $html_content );
			}
		}

		return $html_content;
	}

	/**
	 * Get Constant Name
	 *
	 * @param string $data .
	 *
	 * @return string
	 */
	public static function get_constant_name( $data ) {
		if ( ! is_string( $data ) ) {
			return 'CONVERT_FAILED';
		}

		$namespace = preg_replace( '/[^a-zA-Z0-9\s]/', '_', $data );
		$parts     = explode( '_', $namespace );

		foreach ( $parts as &$part ) {
			$part = strtoupper( $part );
		}

		$namespace = implode( '_', $parts );

		return $namespace;
	}

	/**
	 * Get Namespace
	 *
	 * @param string $data .
	 *
	 * @return string
	 */
	public static function get_namespace( $data ) {
		if ( ! is_string( $data ) ) {
			return 'Convert_Failed';
		}

		$namespace = preg_replace( '/[^a-zA-Z0-9\s]/', '_', $data );
		$parts     = explode( '_', $namespace );

		foreach ( $parts as &$part ) {
			$part = ucfirst( $part );
		}

		$namespace = implode( '_', $parts );

		return $namespace;
	}
	/**
	 * Copy Dir
	 *
	 * @param string $source .
	 * @param string $destination .
	 * @param array  $exception array of exception .
	 */
	public static function copy_dir( $source, $destination, $exception = array() ) {
		if ( ! is_dir( $source ) ) {
			return;
		}

		if ( ! is_dir( $destination ) ) {
			wp_mkdir_p( $destination );
		}

		$items = scandir( $source );

		foreach ( $items as $item ) {
			if ( '.' === $item || '..' === $item || in_array( $item, $exception ) ) {
				continue;
			}

			$src_path  = $source . DIRECTORY_SEPARATOR . $item;
			$dest_path = $destination . DIRECTORY_SEPARATOR . $item;

			if ( is_dir( $src_path ) ) {
				self::copy_dir( $src_path, $dest_path );
			} else {
				copy( $src_path, $dest_path );
			}
		}
	}

	/**
	 * Check if block empty
	 *
	 * @param string $content .
	 */
	public static function is_serialized_block_empty( $content ) {
		if ( has_blocks( $content ) ) {
			$blocks = parse_blocks( $content );
			foreach ( $blocks as $block ) {
				if ( ! empty( trim( strip_tags( $block['innerHTML'] ) ) ) ) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Create Enqueue String
	 *
	 * @param string $handler script handler name.
	 * @param string $type script type.
	 * @param string $media media path.
	 * @param string $theme_data theme data.
	 */
	public static function create_enqueue_string( $handler, $type, $media = null, $theme_data ) {
		$theme_version = self::get_constant_name( $theme_data['slug'] ) . '_VERSION';
		if ( 'null' === $media ) {
			if ( 'css' === $type ) {
				return "wp_enqueue_style( '{$handler}' );";
			} else {
				return "wp_enqueue_script( '{$handler}' );";
			}
		} elseif ( 'css' === $type ) {
				return "wp_enqueue_style( '{$handler}', {$media}, array(), {$theme_version} );";
		} else {
			return "wp_enqueue_script( '{$handler}', {$media}, array(), {$theme_version}, true );";
		}
	}
}
