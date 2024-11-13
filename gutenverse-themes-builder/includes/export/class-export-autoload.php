<?php
/**
 * Export Autoload
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Autoload
 *
 * @package gutenverse-themes-builder
 */
class Export_Autoload {
	/**
	 * Create autoload.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_autoload_php( $system, $data ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/autoload.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );

		$inc_dir = gutenverse_themes_builder_theme_built_path() . 'inc';

		if ( ! is_dir( $inc_dir ) ) {
			wp_mkdir_p( $inc_dir );
		}

		$system->put_contents(
			$inc_dir . '/autoload.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
