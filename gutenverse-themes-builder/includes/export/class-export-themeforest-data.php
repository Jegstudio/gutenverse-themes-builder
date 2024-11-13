<?php
/**
 * Export Themeforest Data
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Themeforest Data
 *
 * @package gutenverse-themes-builder
 */
class Export_Themeforest_Data {
	/**
	 * Create ThemeForest Data
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_themeforest_data( $system, $data ) {
		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );

		if ( empty( $other['dashboard'] ) || ( isset( $other['dashboard']['mode'] ) && 'default' === $other['dashboard']['mode']['value'] ) || ( isset( $other['dashboard']['mode'] ) && 'lite' === $other['dashboard']['mode']['value'] ) ) {
			return;
		}

		Misc::copy_dir( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/assets/dashboard-fonts', gutenverse_themes_builder_theme_built_path() . 'assets/dashboard-fonts' );

		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/themeforest-data.txt' );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/inc/class/class-themeforest-data.php',
			$placeholder,
			FS_CHMOD_FILE
		);

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/index.php',
			$system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/index.txt' ),
			FS_CHMOD_FILE
		);
	}
}
