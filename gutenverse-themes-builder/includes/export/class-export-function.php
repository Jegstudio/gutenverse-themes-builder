<?php
/**
 * Export Function
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Function
 *
 * @package gutenverse-themes-builder
 */
class Export_Function {
	/**
	 * Create Functions.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_function_php( $system, $data ) {
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/functions.txt' );

		$theme_data = maybe_unserialize( $data['theme_data'] );

		$placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{theme_version}}', $theme_data['theme_version'], $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . 'functions.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
