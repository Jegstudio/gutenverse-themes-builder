<?php
/**
 * Export Assets
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder\Export;

use Gutenverse_Themes_Builder\Database\Database;

/**
 * Class Export Assets
 *
 * @package gutenverse-themes-builder
 */
class Export_Assets {
	/**
	 * Create Asset Files
	 *
	 * @param object $system .
	 * @param array  $data .
	 */
	public static function create_assets( $system, $data ) {
		$active     = get_option( 'gtb_active_theme_id' );
		$assets_db  = Database::instance()->theme_assets;
		$assets     = $assets_db->get_all_assets( $active );
		$queue      = '';
		$adminqueue = '';
		$theme_data = maybe_unserialize( $data['theme_data'] );
		$theme_slug = Misc::get_constant_name( $theme_data['slug'] );

		foreach ( $assets as $asset ) {
			if ( 'content' === $asset['media_type'] ) {
				$content = $asset['content'];
				$inc_dir = gutenverse_themes_builder_theme_built_path() . 'assets/' . $asset['type'];

				if ( ! is_dir( $inc_dir ) ) {
					wp_mkdir_p( $inc_dir );
				}

				if ( 'css' === $asset['type'] ) {
					$content = '.editor-styles-wrapper .wp-block.no-margin { margin-top: 0; margin-bottom: 0; } ' . $content;
				}

				$system->put_contents(
					$inc_dir . '/' . $asset['handler'] . '.' . $asset['type'],
					$asset['content'],
					FS_CHMOD_FILE
				);
			}

			switch ( $asset['media_type'] ) {
				case 'media':
					$string = Misc::create_enqueue_string( $asset['handler'], $asset['type'], $asset['content'], $theme_data );
					break;
				case 'content':
					$media  = "trailingslashit( get_template_directory_uri() ) . '/assets/{$asset['type']}/{$asset['handler']}.{$asset['type']}'";
					$string = Misc::create_enqueue_string( $asset['handler'], $asset['type'], $media, $theme_data );
					break;
				case 'WordPress':
					$string = Misc::create_enqueue_string( $asset['handler'], $asset['type'], null, $theme_data );
					break;
			}

			switch ( $asset['enqueue'] ) {
				case 'both':
					$queue .= "\t\t{$string}\n";
					break;
				case 'backend':
					$queue .= "\t\t{$string}\n";
					break;
				case 'frontend':
					$queue .= "\t\t{$string}\n";
					break;
				case 'admin':
					$adminqueue .= "\t\t{$string}\n";
					break;
			}
		}

		$placeholder = $system->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/asset-enqueue.txt' );
		$placeholder = str_replace( '{{title}}', $theme_data['title'], $placeholder );
		$placeholder = str_replace( '{{theme_slug}}', $theme_data['slug'], $placeholder );
		$placeholder = str_replace( '{{constant}}', Misc::get_constant_name( $theme_data['slug'] ), $placeholder );
		$placeholder = str_replace( '{{style_script_enqueue}}', $queue, $placeholder );
		$placeholder = str_replace( '{{admin_style_script_enqueue}}', $adminqueue, $placeholder );
		$placeholder = str_replace( '{{namespace}}', Misc::get_namespace( $theme_data['slug'] ), $placeholder );

		$system->put_contents(
			gutenverse_themes_builder_theme_built_path() . '/inc/class/class-asset-enqueue.php',
			$placeholder,
			FS_CHMOD_FILE
		);
	}
}
