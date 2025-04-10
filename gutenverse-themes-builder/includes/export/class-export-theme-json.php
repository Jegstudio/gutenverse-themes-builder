<?php
/**
 * Export Theme Json
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

use Gutenverse_Themes_Builder\Database\Database;

/**
 * Class Export Theme Json
 *
 * @package gutenverse-themes-builder
 */
class Export_Theme_Json {

	/**
	 * Create Theme Json File
	 *
	 * @param object $system .
	 * @param array  $data .
	 * @param bool   $include_global_import .
	 */
	public static function create_theme_json( $system, $data, $include_global_import ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/theme-json.txt' );
		/**
		 * Generate Color Settings.
		 */
		$colors     = Misc::get_color_settings();
		$fix_colors = array();

		// change colors slug into lowercase to prevent errors.
		$idx = 0;
		foreach ( $colors as $color ) {
			$slug         = 'theme-' . $idx;
			$fix_colors[] = array(
				'slug'  => $include_global_import ? Misc::sluggify( $color->slug ) : $slug,
				'name'  => $color->name,
				'color' => $color->color,
			);
			++$idx;
		}

		$theme_id        = get_option( 'gtb_active_theme_id' );
		$theme_db        = Database::instance()->theme_info;
		$theme_info      = $theme_db->get_theme_data( $theme_id );
		$theme_slug      = $theme_info[0]['slug'];
		$imported_colors = get_option( 'gutenverse-global-color-import-' . $theme_slug );
		if ( $imported_colors ) {
			/** Create an associative array to store the color of colors */
			$color_index = array();
			foreach ( $colors as $color ) {
				$color_index[ strtolower( $color->color ) ] = true;
			}
			$import_filtered = array_filter(
				$imported_colors,
				function ( $import ) use ( $color_index ) {
					return ! isset( $color_index[ strtolower( $import->color ) ] );
				}
			);
			/** Loop through imported colors to find duplicate colors */
			foreach ( $import_filtered as $color ) {
				$fix_colors[] = array(
					'slug'  => $color->slug,
					'name'  => $color->name,
					'color' => $color->color,
				);
			}
		}

		$placeholder = str_replace( '{{theme_color_settings}}', wp_json_encode( $fix_colors ), $placeholder );

		$styles     = Misc::get_style_settings();
		$fix_styles = array(
			'spacing' => array(
				'blockGap' => 0,
			),
		);

		foreach ( $styles as $index => $style ) {
			$fix_styles[ $index ] = $style;
		}

		$fix_styles = Misc::fix_colors( wp_json_encode( $fix_styles ), $include_global_import );

		$placeholder = str_replace( '{{theme_color_styles}}', $fix_styles, $placeholder );

		/**
		 * Generate Font Settings.
		 */
		$fonts_db = Database::instance()->theme_fonts;
		$active   = get_option( 'gtb_active_theme_id' );
		$fonts    = $fonts_db->get_all_fonts( $active );
		$families = array();

		foreach ( $fonts as &$item ) {
			$item['style']   = maybe_unserialize( $item['style'] );
			$item['weights'] = maybe_unserialize( $item['weights'] );
		}

		if ( ! empty( $fonts ) ) {
			$folder = gutenverse_themes_builder_theme_folder_path() . 'assets/fonts/';
			$src    = gutenverse_themes_builder_theme_built_path() . 'assets/fonts/';

			if ( ! is_dir( $src ) ) {
				wp_mkdir_p( $src );
			}

			foreach ( $fonts as $font ) {
				$slug        = strtolower( str_replace( ' ', '-', $font['family'] ) );
				$types       = array();
				$font_folder = $folder . $slug;
				$src_path    = $src . $slug;

				if ( ! is_dir( $src_path ) ) {
					wp_mkdir_p( $src_path );
				}

				if ( is_array( $font['style'] ) ) {
					foreach ( $font['weights'] as $weight ) {
						$font_weight = '400' === $weight ? 'regular' : $weight;
						$files       = scandir( $font_folder );

						if ( in_array( 'normal', $font['style'], true ) ) {
							$regular = '';

							foreach ( $files as $file ) {
								if ( strpos( $file, "{$font_weight}." ) !== false ) {
									$regular = $file;
								}
							}

							copy( "{$font_folder}/{$regular}", "{$src_path}/{$regular}" );

							$types[] = '{
								"fontFamily": "' . $font['family'] . '",
								"fontStretch": "normal",
								"fontStyle": "normal",
								"fontWeight": "' . $weight . '",
								"src": [
									"file:./assets/fonts/' . $slug . '/' . $regular . '"
								]
							}';
						}

						if ( in_array( 'italic', $font['style'], true ) ) {
							$italic = '';

							foreach ( $files as $file ) {
								$convert = 'regular' === $font_weight ? '' : $font_weight;
								if ( strpos( $file, "{$convert}italic." ) !== false ) {
									$italic = $file;
								}
							}

							copy( "{$font_folder}/{$italic}", "{$src_path}/{$italic}" );

							$types[] = '{
								"fontFamily": "' . $font['family'] . '",
								"fontStretch": "normal",
								"fontStyle": "italic",
								"fontWeight": "' . $weight . '",
								"src": [
									"file:./assets/fonts/' . $slug . '/' . $italic . '"
								]
							}';
						}
					}
				}

				$families[] = '{
					"fontFace": [
						' . join( ',', $types ) . '
					],
					"fontFamily": "' . $font['family'] . '",
					"name": "' . $font['family'] . '",
					"slug": "' . $slug . '"
				}';

			}
		}

		$placeholder = str_replace( '{{font_families}}', join( ',', $families ), $placeholder );

		/**
		 * Get font sizes
		 */
		$sizes_db  = Database::instance()->theme_fontsizes;
		$active    = get_option( 'gtb_active_theme_id' );
		$size_data = $sizes_db->get_all_fonts( $active );
		$sizes     = array();

		if ( ! empty( $size_data ) ) {
			foreach ( $size_data as $font ) {
				$sizes[] = '{
					"size": "' . $font['size'] . '",
					"slug": "' . $font['slug'] . '"
				}';
			}
		}

		$placeholder = ! empty( $sizes ) ? str_replace( '{{font_sizes}}', ",\n\t\t\t\t" . join( ",\n\t\t\t\t", $sizes ), $placeholder ) : str_replace( '{{font_sizes}}', '', $placeholder );

		/**
		 * Update Layout Size
		 */
		if ( ! empty( $data ) ) {
			$theme_data = maybe_unserialize( $data['theme_data'] );

			$layout = array(
				'contentSize' => $theme_data['core_content_width'],
				'wideSize'    => $theme_data['core_wide_width'],
			);
		}

		$placeholder = str_replace( '{{layout_sizes}}', wp_json_encode( $layout ), $placeholder );

		/**
		 * Put content into file
		 */
		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . 'theme.json',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
