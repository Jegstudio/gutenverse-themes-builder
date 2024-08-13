<?php
/**
 * Editor Script Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

use Gutenverse_Themes_Builder\Database\Database;

/**
 * Class Editor Script
 *
 * @package gutenverse-themes-builder
 */
class Assets {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_config', array( $this, 'block_config' ) );
		add_action( 'gutenverse_include_block', array( $this, 'register_script' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_additional_asset' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_additional_frontend_asset' ) );
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function block_config( $config ) {
		$config['pluginVersion'] = GUTENVERSE_THEMES_BUILDER_VERSION;
		$config['gtbImgDir']     = GUTENVERSE_THEMES_BUILDER_URL . '/assets/img';

		return $config;
	}

	/**
	 * Register Additional Frontend Asset.
	 */
	public function register_additional_frontend_asset() {
		$active    = get_option( 'gtb_active_theme_id' );
		$assets_db = Database::instance()->theme_assets;
		$assets    = $assets_db->get_all_assets( $active );

		foreach ( $assets as $asset ) {
			if ( ! in_array( $asset['enqueue'], array( 'both', 'frontend' ), true ) ) {
				continue;
			}

			$func         = 'js' === $asset['type'] ? 'wp_enqueue_script' : 'wp_enqueue_style';
			$parameter    = array();
			$parameter[0] = $asset['handler'];

			if ( in_array( $asset['media_type'], array( 'media', 'content' ), true ) ) {
				switch ( $asset['media_type'] ) {
					case 'media':
						$parameter[1] = $asset['content'];
						break;
					case 'content':
						$uploads      = wp_upload_dir();
						$theme_id     = get_option( 'gtb_active_theme_id' );
						$parameter[1] = $uploads['baseurl'] . '/gtb-' . $theme_id . '/assets/' . $asset['type'] . '/' . $asset['handler'] . '.' . $asset['type'];
						break;
				}

				$parameter[2] = array();
				$parameter[3] = GUTENVERSE_THEMES_BUILDER_VERSION;
			}

			call_user_func_array(
				$func,
				$parameter
			);
		}
	}

	/**
	 * Register Additional Asset.
	 */
	public function register_additional_asset() {
		$active    = get_option( 'gtb_active_theme_id' );
		$assets_db = Database::instance()->theme_assets;
		$assets    = $assets_db->get_all_assets( $active );

		foreach ( $assets as $asset ) {
			if ( ! in_array( $asset['enqueue'], array( 'both', 'backend' ), true ) ) {
				continue;
			}

			$func         = 'js' === $asset['type'] ? 'wp_enqueue_script' : 'wp_enqueue_style';
			$parameter    = array();
			$parameter[0] = $asset['handler'];

			if ( in_array( $asset['media_type'], array( 'media', 'content' ), true ) ) {
				switch ( $asset['media_type'] ) {
					case 'media':
						$parameter[1] = $asset['content'];
						break;
					case 'content':
						$uploads      = wp_upload_dir();
						$theme_id     = get_option( 'gtb_active_theme_id' );
						$parameter[1] = $uploads['baseurl'] . '/gtb-' . $theme_id . '/assets/' . $asset['type'] . '/' . $asset['handler'] . '.' . $asset['type'];
						break;
				}

				$parameter[2] = array();
				$parameter[3] = GUTENVERSE_THEMES_BUILDER_VERSION;
			}

			call_user_func_array(
				$func,
				$parameter
			);
		}
	}

	/**
	 * Register Javascript Script
	 */
	public function register_script() {
		// Register & Enqueue Style.
		$block_includes = include GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/blocks.asset.php';

		wp_enqueue_script(
			'gtb-block',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/blocks.js',
			$block_includes['dependencies'],
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);

		$editor_includes = include GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/blocks.asset.php';

		wp_enqueue_script(
			'gtb-editor',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/editor.js',
			$editor_includes['dependencies'],
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);

		defined( 'GUTENVERSE_THEMES_BUILDER_LANG_DIR' ) ? wp_set_script_translations( 'gutenverse-thGUTENVERSE_THEMES_BUILDER_-builder', 'gutenverse-themes-builder', GUTENVERSE_THEMES_BUILDER_LANG_DIR ) : null;
		wp_localize_script( 'gutenverse-theme-builder-block', 'GutenverseThemeBuilder', $this->js_config() );

		wp_enqueue_style(
			'gtb-editor',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/css/editor.css',
			array( 'wp-edit-blocks' ),
			GUTENVERSE_THEMES_BUILDER_VERSION
		);
	}

	/**
	 * Get theme folder
	 *
	 * @param string $theme_id .
	 */
	public function get_theme_folder( $theme_id = null ) {
		if ( null === $theme_id ) {
			$theme_id = get_option( 'gtb_active_theme_id' );
		}

		return wp_upload_dir()['basedir'] . '/gtb-' . $theme_id;
	}

	/**
	 * JS Config.
	 */
	public function js_config() {
		return array();
	}
}
