<?php
/**
 * Dashboard class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace GTB;

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
		$include = include GTB_DIR . '/lib/dependencies/blocks.asset.php';

		wp_enqueue_script(
			'gtb-block',
			GTB_URL . '/assets/js/blocks.js',
			$include['dependencies'],
			GTB_VERSION,
			true
		);
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function dashboard_config( $config ) {
		$config['pluginVersions'][ GTB ] = array(
			'name'           => GTB_NAME,
			'version'        => GTB_VERSION,
			'currentNotice'  => GTB_NOTICE_VERSION,
			'noticeVersions' => array( '1.0.0' ),
		);
		$config['gtbImgDir']             = GTB_URL . '/assets/img';

		return $config;
	}
}
