<?php
/**
 * GTB Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

namespace GTB;

use GTB\Database\Database;

/**
 * Class Builder Page
 *
 * @package gtb
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
		add_action( 'admin_enqueue_scripts', array( $this, 'load_builder_scripts' ) );
	}

	/**
	 * Register Builder Menu.
	 */
	public function register_builder_menu() {
		// Main Menu.
		add_menu_page(
			esc_html__( 'Themes Builder', 'gtb' ),
			esc_html__( 'Themes Builder', 'gtb' ),
			'manage_options',
			self::TYPE,
			array( $this, 'theme_builder_page' ),
			GTB_URL . '/assets/icons/theme-builder-dashboard.svg',
			40
		);

		// Sub Menus.
		$path = self::TYPE . '&path=';

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Theme List', 'gutenverse' ),
			esc_html__( 'Theme List', 'gutenverse' ),
			'manage_options',
			self::TYPE,
			array( $this, 'theme_builder_page' ),
			0
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Templates', 'gutenverse' ),
			esc_html__( 'Templates', 'gutenverse' ),
			'manage_options',
			$path . 'manage-templates',
			array( $this, 'theme_builder_page' ),
			1
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Patterns', 'gutenverse' ),
			esc_html__( 'Patterns', 'gutenverse' ),
			'manage_options',
			$path . 'manage-patterns',
			array( $this, 'theme_builder_page' ),
			2
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Assets', 'gutenverse' ),
			esc_html__( 'Assets', 'gutenverse' ),
			'manage_options',
			$path . 'manage-assets',
			array( $this, 'theme_builder_page' ),
			3
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Core Fonts', 'gutenverse' ),
			esc_html__( 'Core Fonts', 'gutenverse' ),
			'manage_options',
			$path . 'manage-fonts',
			array( $this, 'theme_builder_page' ),
			4
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Core Font Size', 'gutenverse' ),
			esc_html__( 'Core Font Size', 'gutenverse' ),
			'manage_options',
			$path . 'manage-font-sizes',
			array( $this, 'theme_builder_page' ),
			5
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Plugins', 'gutenverse' ),
			esc_html__( 'Plugins', 'gutenverse' ),
			'manage_options',
			$path . 'manage-plugins',
			array( $this, 'theme_builder_page' ),
			6
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Screenshots', 'gutenverse' ),
			esc_html__( 'Screenshots', 'gutenverse' ),
			'manage_options',
			$path . 'manage-screenshots',
			array( $this, 'theme_builder_page' ),
			7
		);

		add_submenu_page(
			self::TYPE,
			esc_html__( 'Export Theme', 'gutenverse' ),
			esc_html__( 'Export Theme', 'gutenverse' ),
			'manage_options',
			$path . 'export-theme',
			array( $this, 'theme_builder_page' ),
			8
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
	 *
	 * @param string $path .
	 */
	public function load_builder_scripts( $path ) {
		if ( 'toplevel_page_gutenverse-theme-builder' === $path ) {
			$include   = ( include GTB_DIR . '/lib/dependencies/builder.asset.php' ) ['dependencies'];
			$include[] = 'gutenverse-editor-event';

			wp_enqueue_media();

			wp_enqueue_script(
				'gtb-page',
				GTB_URL . '/assets/js/builder.js',
				$include,
				GTB_VERSION,
				true
			);

			wp_localize_script( 'gtb-page', 'GutenverseThemeBuilder', $this->get_config() );

			wp_register_style(
				'gtb-google-font',
				'//fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
				array(),
				GTB_VERSION
			);
			wp_enqueue_style( 'gtb-google-font' );

			wp_enqueue_style(
				'gtb-page-style',
				GTB_URL . '/assets/css/builder.css',
				null,
				GTB_VERSION
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
		$config['themeMode']     = gtb_get_theme_mode();

		return $config;
	}
}
