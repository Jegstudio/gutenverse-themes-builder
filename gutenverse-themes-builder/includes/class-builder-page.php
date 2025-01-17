<?php
/**
 * Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-themes-builder
 */

namespace Gutenverse_Themes_Builder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gutenverse_Themes_Builder\Database\Database;

/**
 * Class Builder Page
 *
 * @package gutenverse-themes-builder
 */
class Builder_Page {
	/**
	 * Type
	 *
	 * @var string
	 */
	const TYPE = 'gutenverse-theme-builder';

	/**
	 * Init constructor.
	 */
	public function __construct() {
		$this->init_hooks();
	}

	/**
	 * Init hooks.
	 */
	private function init_hooks() {
		add_action( 'admin_menu', array( $this, 'register_builder_menu' ) );
		add_action( 'gutenverse_include_dashboard', array( $this, 'load_builder_scripts' ) );
	}

	/**
	 * Register Builder Menu.
	 */
	public function register_builder_menu() {
		// Main Menu.
		add_menu_page(
			esc_html__( 'Themes Builder', 'gutenverse-themes-builder' ),
			esc_html__( 'Themes Builder', 'gutenverse-themes-builder' ),
			'manage_options',
			self::TYPE,
			array( $this, 'theme_builder_page' ),
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/icons/theme-builder-dashboard.svg',
			40
		);

		// Sub Menus.
		$path = self::TYPE . '&path=';

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Theme List', 'gutenverse-themes-builder' ),
			esc_html__( 'Theme List', 'gutenverse-themes-builder' ),
			'manage_options',
			self::TYPE,
			array( $this, 'theme_builder_page' ),
			0
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Templates', 'gutenverse-themes-builder' ),
			esc_html__( 'Templates', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-templates',
			array( $this, 'theme_builder_page' ),
			1
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Pages', 'gutenverse-themes-builder' ),
			esc_html__( 'Pages', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-pages',
			array( $this, 'theme_builder_page' ),
			2
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Patterns', 'gutenverse-themes-builder' ),
			esc_html__( 'Patterns', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-patterns',
			array( $this, 'theme_builder_page' ),
			3
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Global Style', 'gutenverse-themes-builder' ),
			esc_html__( 'Global Style', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-global',
			array( $this, 'theme_builder_page' ),
			4
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Assets', 'gutenverse-themes-builder' ),
			esc_html__( 'Assets', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-assets',
			array( $this, 'theme_builder_page' ),
			5
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Core Fonts', 'gutenverse-themes-builder' ),
			esc_html__( 'Core Fonts', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-fonts',
			array( $this, 'theme_builder_page' ),
			6
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Core Font Size', 'gutenverse-themes-builder' ),
			esc_html__( 'Core Font Size', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-font-sizes',
			array( $this, 'theme_builder_page' ),
			7
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Required Plugins', 'gutenverse-themes-builder' ),
			esc_html__( 'Required Plugins', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-plugins',
			array( $this, 'theme_builder_page' ),
			8
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Manage Dashboard', 'gutenverse-themes-builder' ),
			esc_html__( 'Manage Dashboard', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-dashboard',
			array( $this, 'theme_builder_page' ),
			9
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Manage Theme Notice', 'gutenverse-themes-builder' ),
			esc_html__( 'Manage Theme Notice', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'notice-editor',
			array( $this, 'theme_builder_page' ),
			10
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Screenshots', 'gutenverse-themes-builder' ),
			esc_html__( 'Screenshots', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'manage-screenshots',
			array( $this, 'theme_builder_page' ),
			11
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Readme Editor', 'gutenverse-themes-builder' ),
			esc_html__( 'Readme Editor', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'readme-editor',
			array( $this, 'theme_builder_page' ),
			12
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Export Theme', 'gutenverse-themes-builder' ),
			esc_html__( 'Export Theme', 'gutenverse-themes-builder' ),
			'manage_options',
			$path . 'export-theme',
			array( $this, 'theme_builder_page' ),
			13
		);
	}

	/**
	 * Render page.
	 */
	public function theme_builder_page() {
		?>
		<div id="gtb-root"></div>
		<?php
	}

	/**
	 * Load builder scripts
	 */
	public function load_builder_scripts() {
		global $current_screen;

		if ( 'toplevel_page_gutenverse-theme-builder' === $current_screen->id ) {
			$include = ( include GUTENVERSE_THEMES_BUILDER_DIR . '/lib/dependencies/builder.asset.php' ) ['dependencies'];

			wp_enqueue_media();
			wp_enqueue_script(
				'gtb-page',
				GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/builder.js',
				$include,
				GUTENVERSE_THEMES_BUILDER_VERSION,
				true
			);

			wp_localize_script( 'gtb-page', 'GutenverseThemeBuilder', $this->get_config() );

			wp_register_style(
				'gtb-google-font',
				'//fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
				array(),
				GUTENVERSE_THEMES_BUILDER_VERSION
			);
			wp_enqueue_style( 'gtb-google-font' );

			wp_enqueue_style(
				'gtb-page-style',
				GUTENVERSE_THEMES_BUILDER_URL . '/assets/css/builder.css',
				null,
				GUTENVERSE_THEMES_BUILDER_VERSION
			);
		}
	}


	/**
	 * Get Theme Slug
	 *
	 * @return string|null
	 */
	public function get_theme_slug() {
		$theme_id = get_option( 'gtb_active_theme_id' );
		$info_db  = Database::instance()->theme_info;
		$data     = $info_db->get_theme_data( $theme_id );

		if ( ! empty( $data ) ) {
			return $data[0]['slug'];
		}

		return null;
	}

	/**
	 * Get Config
	 *
	 * @return array
	 */
	public function get_config() {
		$config                  = array();
		$config['pageSlug']      = self::TYPE;
		$config['editPath']      = admin_url( 'post.php' );
		$config['createPattern'] = admin_url( 'post-new.php?post_type=gutenverse-pattern' );
		$config['themeSlug']     = $this->get_theme_slug();
		$config['themeMode']     = gutenverse_themes_builder_get_theme_mode();
		$config['extraPlugins']  = $this->get_extra_plugin_gutenverse();

		return $config;
	}

	/**
	 * Get extra plugin gutenverse
	 *
	 * @return array
	 */
	public function get_extra_plugin_gutenverse() {
		$result   = wp_remote_request(
			GUTENVERSE_FRAMEWORK_LIBRARY_URL . 'wp-json/gutenverse-server/v4/extra-plugin/list',
			array(
				'method'  => 'GET',
				'headers' => array(
					'Content-Type' => 'application/json',
				),
			),
		);
		$response = json_decode( $result['body'], true );
		if ( isset( $response['status'] ) && 'success' === $response['status'] ) {
			return $response['data'];
		} else {
			return array();
		}
	}
}
