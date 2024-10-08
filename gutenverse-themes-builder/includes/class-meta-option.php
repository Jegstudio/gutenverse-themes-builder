<?php
/**
 * Meta Option Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse_Themes_Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gutenverse\Framework\Meta_Option as Meta;

/**
 * Class Meta Option
 *
 * @package gutenverse
 */
class Meta_Option {
	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'gutenverse_check_update', array( $this, 'check_update' ) );
		add_action( 'gutenverse_initial_meta_option', array( $this, 'initial_option' ) );
	}

	/**
	 * Initial Option.
	 *
	 * @param array $options Options.
	 */
	public function initial_option( $options ) {
		$options['tracker'][ GUTENVERSE_THEMES_BUILDER ] = array(
			'install_time'    => time(),
			'current_version' => '0.0.0',
			'version_history' => array(),
			'upgrade_time'    => null,
		);

		return $options;
	}

	/**
	 * Check if plugin has been upgraded.
	 */
	public function check_update() {
		$meta    = Meta::instance();
		$tracker = $meta->get_option( 'tracker', array() );

		if ( ! isset( $tracker[ GUTENVERSE_THEMES_BUILDER ] ) ) {
			$tracker = $this->set_tracker( $meta, $tracker );
		}

		$version = $tracker[ GUTENVERSE_THEMES_BUILDER ]['current_version'];

		if ( version_compare( $version, GUTENVERSE_THEMES_BUILDER_VERSION, '<' ) ) {
			$meta->upgrade_plugin( $version, GUTENVERSE_THEMES_BUILDER_VERSION, GUTENVERSE_THEMES_BUILDER );
		}
	}

	/**
	 * Set tracker for who comes from older version
	 *
	 * @param object $meta Meta Option Framework.
	 * @param array  $tracker Plugin history tracker.
	 */
	public function set_tracker( $meta, $tracker ) {
		$install_time    = $meta->get_option( 'install_time' );
		$current_version = $meta->get_option( 'current_version' );
		$version_history = $meta->get_option( 'version_history' );
		$upgrade_time    = $meta->get_option( 'install_time' );

		if ( null === $install_time ) {
			$install_time = time();
		}

		if ( null === $current_version ) {
			$current_version = GUTENVERSE_THEMES_BUILDER_VERSION;
		}

		if ( null === $version_history ) {
			$version_history = array();
		}

		$tracker[ GUTENVERSE_THEMES_BUILDER ] = array(
			'install_time'    => $install_time,
			'current_version' => $current_version,
			'version_history' => $version_history,
			'upgrade_time'    => $upgrade_time,
		);

		$meta->set_option( 'tracker', $tracker );

		return $tracker;
	}
}
