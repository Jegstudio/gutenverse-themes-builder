<?php
/**
 * Export Readme
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Readme
 *
 * @package gutenverse-themes-builder
 */
class Export_ReadMe {

	/**
	 * Create Readme File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_readme( $system, $data ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/readme.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );

		if ( ! empty( $other['readme'] ) ) {
			$placeholder = $other['readme'];
		}

		$placeholder = ! empty( $theme_data['title'] ) ? str_replace( '{{title}}', $theme_data['title'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['author_name'] ) ? str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_min_version'] ) ? str_replace( '{{wp_min_version}}', $theme_data['wp_min_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['wp_tested_version'] ) ? str_replace( '{{wp_tested_version}}', $theme_data['wp_tested_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['php_version'] ) ? str_replace( '{{php_version}}', $theme_data['php_version'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['description'] ) ? str_replace( '{{description}}', $theme_data['description'], $placeholder ) : $placeholder;

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . 'readme.txt',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
