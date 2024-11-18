<?php
/**
 * Export Helper
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Helper
 *
 * @package gutenverse-themes-builder
 */
class Export_Helper {
	/**
	 * Create helper
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_helper( $system, $data ) {
		$theme_data  = maybe_unserialize( $data['theme_data'] );
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/helper-class.txt' );
		$placeholder = ! empty( $theme_data['author_name'] ) ? str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder ) : $placeholder;
		$placeholder = ! empty( $theme_data['slug'] ) ? str_replace( '{{slug}}', $theme_data['slug'], $placeholder ) : $placeholder;
		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/inc/class/class-helper.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
