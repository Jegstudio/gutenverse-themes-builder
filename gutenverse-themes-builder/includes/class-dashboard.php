<?php
/**
 * Dashboard class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse_Themes_Builder;

/**
 * Class Dashboard
 *
 * @package gutenverse
 */
class Dashboard {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_dashboard_config', array( $this, 'dashboard_config' ) );
		add_filter( 'gutenverse_include_dashboard', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Dashboard scripts.
	 */
	public function enqueue_scripts() {
		$include = include GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/blocks.asset.php';

		wp_enqueue_script(
			'gtb-block',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/blocks.js',
			$include['dependencies'],
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);

		$include = ( include GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/dashboard.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gtb-dashboard',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/dashboard.js',
			$include,
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function dashboard_config( $config ) {
		$config['pluginVersions'][ GUTENVERSE_THEMES_BUILDER ] = array(
			'name'           => GUTENVERSE_THEMES_BUILDER_NAME,
			'version'        => GUTENVERSE_THEMES_BUILDER_VERSION,
			'currentNotice'  => GUTENVERSE_THEMES_BUILDER_NOTICE_VERSION,
			'noticeVersions' => array( '1.0.0' ),
		);

		$config['gtbAssetURL'] = GUTENVERSE_THEMES_BUILDER_URL . '/assets/';

		return $config;
	}
}
