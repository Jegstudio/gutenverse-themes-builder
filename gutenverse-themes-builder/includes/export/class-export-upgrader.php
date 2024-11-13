<?php
/**
 * Export Upgrader
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

/**
 * Class Export Upgrader
 *
 * @package gutenverse-themes-builder
 */
class Export_Upgrader {
	/**
	 * Create class-upgrader.php File
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_upgrader_php( $system, $data ) {
		$theme_data = maybe_unserialize( $data['theme_data'] );
		$other      = maybe_unserialize( $data['other'] );
		if ( ! isset( $other['notice'] ) || Misc::is_serialized_block_empty( $other['notice'] ) ) {
			return;
		}
		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/upgrader.txt' );
		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{author_name}}', $theme_data['author_name'], $placeholder );
		$placeholder = str_replace( '{{notice_message}}', $other['notice'], $placeholder );

		$inc_dir = gutenverse_themes_builder_theme_built_path() . 'inc/class';
		if ( ! is_dir( $inc_dir ) ) {
			wp_mkdir_p( $inc_dir );
		}

		$system->put_contents(
			$inc_dir . '/class-upgrader.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
