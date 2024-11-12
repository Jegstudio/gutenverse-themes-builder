<?php
/**
 * Editor Script Class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use DateTime;
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
		if ( ! class_exists( '\Gutenverse\Pro\License' ) ) {
			add_action( 'gutenverse_include_frontend', array( $this, 'frontend_scripts' ), 11 );
		}
		add_action( 'gutenverse_include_block', array( $this, 'editor_scripts' ), 1 );
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function block_config( $config ) {
		$config['pluginVersion'] = GUTENVERSE_THEMES_BUILDER_VERSION;
		$config['gtbImgDir']     = GUTENVERSE_THEMES_BUILDER_URL . '/assets/img';
		$config['lottieDir']     = GUTENVERSE_THEMES_BUILDER_URL . '/assets/lottie';
		$config['license']       = $this->get_license();
		$config['domainURL']     = get_site_url(); // Todo: check if we are using WordPress address.
		$config['current']       = ( new DateTime() )->getTimestamp();

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

	/**Essential Function */

	/**
	 * Enqueue script frontend.
	 */
	public function frontend_scripts() {
		wp_enqueue_script(
			'gutenverse-theme-essential-frontend-event',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/essential/profrontend.js',
			array(),
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);

		$frontend_include = ( include GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/essential/frontend.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-theme-essential-frontend',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/essential/frontend.js',
			$frontend_include,
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);

		// Register & Enqueue Style.
		wp_enqueue_style(
			'gutenverse-theme-essential-frontend-block',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/css/essential/frontend-essential.css',
			array( 'gutenverse-frontend-style' ),
			GUTENVERSE_THEMES_BUILDER_VERSION
		);
	}

	/**
	 * Enqueue Editor Scripts.
	 */
	public function editor_scripts() {
		if ( gutenverse_check_dashboard_mode() ) {
			$include = array_values(
				array_unique(
					array_merge(
						( include_once GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/essential/editor.sticky.asset.php' )['dependencies'],
						( include_once GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/essential/filter.asset.php' )['dependencies']
					)
				)
			);

			wp_enqueue_script(
				'gutenverse-theme-essential-filter',
				GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/essential/filter.js',
				$include,
				GUTENVERSE_THEMES_BUILDER_VERSION,
				true
			);

			wp_enqueue_style(
				'gutenverse-theme-essential-editor-block',
				GUTENVERSE_THEMES_BUILDER_URL . '/assets/css/essential/editor-essential.css',
				array( 'gutenverse-editor-style' ),
				GUTENVERSE_THEMES_BUILDER_VERSION
			);

			wp_enqueue_style(
				'gutenverse-theme-essential-frontend-block',
				GUTENVERSE_THEMES_BUILDER_URL . '/assets/css/essential/frontend-essential.css',
				array( 'gutenverse-frontend-style' ),
				GUTENVERSE_THEMES_BUILDER_VERSION
			);

			wp_enqueue_script(
				'gutenverse-theme-essential-blocks',
				GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/essential/blocks.js',
				$include,
				GUTENVERSE_THEMES_BUILDER_VERSION,
				true
			);

			// Register & Enqueue Style.
			wp_enqueue_style( 'gutenverse-theme-essential-block' );

			if ( ! gutenverse_check_if_script_localized( 'GutenverseProJSURL' ) ) {
				wp_localize_script( 'gutenverse-theme-essential-filter', 'GutenverseProJSURL', $this->js_pro_config() );
				wp_set_script_translations( 'gutenverse-pro', 'gutenverse-pro', GUTENVERSE_THEMES_BUILDER_LANG_DIR );

				wp_localize_script(
					'gutenverse-theme-essential-block',
					'GutenverseProData',
					array(
						'roles'      => $this->get_all_roles(),
						'posttype'   => $this->get_all_post_type(),
						'taxonomies' => $this->get_all_taxonomies(),
					)
				);
			}
		}
	}

	/**
	 * Get All Taxonomies
	 *
	 * @return array
	 */
	public function get_all_taxonomies() {
		$result     = array();
		$taxonomies = get_taxonomies(
			array(
				'public' => true,
			),
			'object'
		);

		foreach ( $taxonomies as $key => $taxonomy ) {
			$result[] = array(
				'value' => $key,
				'label' => $taxonomy->label,
			);
		}

		return $result;
	}

	/**
	 * Get All Post Type
	 *
	 * @return array
	 */
	public function get_all_post_type() {
		$types = get_post_types(
			array(
				'public' => true,
			),
			'objects'
		);

		unset( $types['gutenverse-form'] );
		unset( $types['gutenverse-entries'] );
		unset( $types['attachment'] );

		$the_types = array();

		foreach ( $types as $key => $type ) {
			$the_types[] = array(
				'value' => $key,
				'label' => $type->label,
			);
		}

		return $the_types;
	}

	/**
	 * Get All Roles.
	 *
	 * @return array
	 */
	public function get_all_roles() {
		$roles = array();

		foreach ( get_editable_roles() as $key => $role ) {
			$roles[] = array(
				'value' => $key,
				'label' => $role['name'],
			);
		}

		return $roles;
	}

	/**
	 * JS Pro Config.
	 */
	public function js_pro_config() {
		return array(
			'editorSticky' => GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/essential/editor.sticky.js',
			'imgDir'       => GUTENVERSE_THEMES_BUILDER_URL . '/assets/img',
			'wpJsonConfig' => array(
				'wpjson_url'      => get_rest_url(),
				'wpjson_nonce'    => wp_create_nonce( 'wp_rest' ),
				'wpjson_endpoint' => admin_url( 'admin-ajax.php?action=rest-nonce' ),
			),
		);
	}

	/**
	 * Get dashboard data.
	 *
	 * @return array|boolean
	 */
	private function get_license() {
		return get_option( 'gutenverse-license', '' );
	}
}
