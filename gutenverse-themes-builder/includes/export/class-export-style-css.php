<?php
/**
 * Export Style Css
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Style Css
 *
 * @package gutenverse-themes-builder
 */
class Export_Style_Css {
	/**
	 * Create Style.css File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_style_css( $system, $data ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/style.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );
		$theme_tags = ! empty( $theme_data['tags'] ) ? join( ',', $theme_data['tags'] ) : '';

		$placeholder = ! empty( $theme_data['title'] ) ? str_replace( '{{title}}', $theme_data['title'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['description'] ) ? str_replace( '{{description}}', $theme_data['description'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_name'] ) ? str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_uri'] ) ? str_replace( '{{author_uri}}', $theme_data['author_uri'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['theme_uri'] ) ? str_replace( '{{theme_uri}}', $theme_data['theme_uri'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['theme_version'] ) ? str_replace( '{{theme_version}}', $theme_data['theme_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_min_version'] ) ? str_replace( '{{wp_min_version}}', $theme_data['wp_min_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_tested_version'] ) ? str_replace( '{{wp_tested_version}}', $theme_data['wp_tested_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['php_version'] ) ? str_replace( '{{php_version}}', $theme_data['php_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['slug'] ) ? str_replace( '{{slug}}', $theme_data['slug'], $placeholder ) : $placeholder;
		$placeholder = str_replace( '{{tags}}', $theme_tags, $placeholder );

		$colors          = Misc::get_color_settings();
		$imported_colors = get_option( 'gutenverse-global-color-import-' . $theme_data['slug'] );
		if ( $imported_colors ) {
			$add_css = '';
			/** Loop through imported colors to find duplicate colors */
			foreach ( $imported_colors as $import ) {
				foreach ( $colors as $idx => $color ) {
					if ( strtolower( $color->color ) === strtolower( $import->color ) ) {
						$add_css .= '--wp--preset--color--' . strtolower( $import->slug ) . ': var(--wp--preset--color--theme-' . $idx . ');';
						$add_css .= '--wp--preset--color--theme-' . $idx . ': var(--wp--preset--color--' . strtolower( $import->slug ) . ');';
					}
				}
			}
		}
		$placeholder = ! empty( $add_css ) ? str_replace( '{{additional_css}}', $add_css, $placeholder ) : str_replace( '{{additional_css}}', '', $placeholder );
		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . 'style.css',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
