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
 * Class Init
 *
 * @package gutenverse-themes-builder
 */
class Init {
	/**
	 * Instance of Deploy.
	 *
	 * @var Deploy
	 */
	public $deployment;

	/**
	 * Instance of Init.
	 *
	 * @var Init
	 */
	private static $instance;

	/**
	 * Singleton page for Init Class
	 *
	 * @return Init
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Init constructor.
	 */
	private function __construct() {
		$this->register_framework();
		add_filter( 'upload_mimes', array( $this, 'add_to_allowed_mimes' ) );
		add_filter( 'wp_check_filetype_and_ext', array( $this, 'update_mime_types' ), 10, 3 );
		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ), 9 );
		add_action( 'plugins_loaded', array( $this, 'framework_loaded' ), 99 );
		add_action( 'activated_plugin', array( $this, 'plugin_activation' ) );
		add_action( 'after_setup_theme', array( $this, 'load_custom_theme_json' ) );
		add_filter( 'big_image_size_threshold', '__return_false' );
	}

	/**
	 * Load custom theme Json
	 */
	public function load_custom_theme_json() {
		$theme_dir = gutenverse_themes_builder_theme_folder_path();
		$json_path = $theme_dir . 'theme.json';

		if ( file_exists( $json_path ) && strpos( get_stylesheet(), 'gutenverse-basic' ) !== false ) {
			add_filter(
				'wp_theme_json_data_theme',
				function ( $theme_json ) use ( $json_path ) {
					global $wp_filesystem;

					if ( empty( $wp_filesystem ) ) {
						require_once ABSPATH . 'wp-admin/includes/file.php';
						WP_Filesystem();
					}

					$content = '';

					if ( $wp_filesystem->exists( $json_path ) ) {
						$content = $wp_filesystem->get_contents( $json_path );
					}

					$custom_theme_json = json_decode( $content, true );

					if ( $custom_theme_json ) {
						$theme_json->update_with( $custom_theme_json );
					}

					return $theme_json;
				},
				9999
			);
		}
	}

	/**
	 * Add mime type
	 *
	 * @param array $mimes .
	 *
	 * @return array $mimes
	 */
	public function add_to_allowed_mimes( $mimes ) {
		$mimes['json'] = 'application/json';

		return $mimes;
	}

	/**
	 * Update mime type
	 *
	 * @param array  $defaults .
	 * @param array  $file .
	 * @param string $filename .
	 */
	public function update_mime_types( $defaults, $file, $filename ) {
		if ( 'json' === pathinfo( $filename, PATHINFO_EXTENSION ) ) {
			$defaults['type'] = 'application/json';
			$defaults['ext']  = 'json';
		}

		return $defaults;
	}

	/**
	 * Register Framework.
	 */
	public function register_framework() {
		require_once GUTENVERSE_THEMES_BUILDER_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		$framework_file    = GUTENVERSE_THEMES_BUILDER_DIR . 'lib/framework/bootstrap.php';
		$framework_version = $init->get_framework_version( $framework_file );
		$init->register_version( GUTENVERSE_THEMES_BUILDER, $framework_version );
	}

	/**
	 * Check if we can load framework.
	 *
	 * @return boolean
	 */
	public function can_load_framework() {
		require_once GUTENVERSE_THEMES_BUILDER_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		return $init->can_load_version( GUTENVERSE_THEMES_BUILDER );
	}

	/**
	 * Load Plugin.
	 */
	public function plugin_loaded() {
		$this->load_framework();
	}

	/**
	 * Framework Loaded
	 */
	public function framework_loaded() {
		$this->load_helper();
		$this->init_hook();
		$this->init_instance();
		$this->init_post_type();
	}

	/**
	 * Load Framework.
	 */
	public function load_framework() {
		if ( $this->can_load_framework() ) {
			defined( 'GUTENVERSE_FRAMEWORK_URL_PATH' ) || define( 'GUTENVERSE_FRAMEWORK_URL_PATH', plugins_url( GUTENVERSE_THEMES_BUILDER ) . '/lib/framework' );
			require_once GUTENVERSE_THEMES_BUILDER_DIR . 'lib/framework/bootstrap.php';
		}
	}

	/**
	 * Initialize Instance.
	 */
	public function init_instance() {
		new Assets();
		new Backend_Api();
		new Blocks();
		new Builder_Page();
		new Theme_Helper();
		new Theme_Pattern();
		new Dashboard();
		new Meta_Option();
	}

	/**
	 * Load Helper
	 */
	public function load_helper() {
		require_once GUTENVERSE_THEMES_BUILDER_DIR . 'lib/helper.php';
	}

	/**
	 * Initialize Hook
	 */
	public function init_hook() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		add_action( 'rest_after_insert_wp_template', array( $this, 'after_insert_wp_template' ), null, 2 );
		add_action( 'rest_after_insert_wp_template_part', array( $this, 'after_insert_wp_template' ), null, 2 );
		add_action( 'rest_after_insert_page', array( $this, 'after_insert_page' ), null, 2 );
		add_action( 'gutenverse_loop_blocks', array( $this, 'pattern_loop' ), null, 3 );
		if ( ! defined( 'GUTENVERSE' ) && current_user_can( 'manage_options' ) && get_option( 'gtb_plugin_notice_flag', 1 ) ) {
			add_action( 'admin_notices', array( $this, 'dashboard_notice' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'dashboard_enqueue_scripts' ) );
			add_action( 'wp_ajax_gtb_install_plugin', array( $this, 'gtb_plugin_manager_ajax' ) );
			add_action( 'wp_ajax_gtb_plugin_notice_close', array( $this, 'plugin_notice_close' ) );
		}

		/* TODO : Remove this later! */
		add_action( 'init', array( $this, 'alter_table' ) );
	}

	/**
	 * TODO : Remove this later!
	 */
	public function alter_table() {
		$info_db = Database::instance()->theme_info;

		$info_altered = get_option( 'gtb_theme_info_altered_3', false );
		if ( ! $info_altered ) {
			$info_db->alter_table();
			update_option( 'gtb_theme_info_altered_3', true );
		}
	}


	/**
	 * Loop Pattern.
	 *
	 * @param array  $block Block Data.
	 * @param string $style style content.
	 * @param object $instance instance of generator.
	 */
	public function pattern_loop( $block, &$style, $instance ) {
		if ( 'gutenverse-themes-builder/pattern-wrapper' === $block['blockName'] ) {
			$attrs   = $block['attrs'];
			$mode    = $attrs['mode'];
			$pattern = $attrs['pattern'];

			if ( 'use' === $mode ) {
				$data = get_page_by_path( $pattern['value'], OBJECT, 'gutenverse-pattern' );

				if ( isset( $data ) ) {
					$parts = parse_blocks( $data->post_content );
					$parts = $instance->flatten_blocks( $parts );
					$instance->loop_blocks( $parts, $style );
				}
			}
		}
	}

	/**
	 * Filter Pattern.
	 *
	 * @param array   $blocks the content array.
	 * @param boolean $flag flag if content has been changed.
	 *
	 * @return array
	 */
	public function filter_pattern( $blocks, &$flag ) {
		foreach ( $blocks as &$block ) {
			if ( 'gutenverse-themes-builder/pattern-wrapper' === $block['blockName'] ) {
				$attrs = $block['attrs']['pattern'];
				$data  = serialize_blocks( $block['innerBlocks'] );

				// Todo: save to database.
				$post = get_page_by_path( $attrs['value'], OBJECT, 'gutenverse-pattern' );
				wp_update_post(
					(object) array(
						'ID'           => $post->ID,
						'post_content' => $data,
					)
				);

				$flag                  = true;
				$block['innerBlocks']  = array();
				$block['innerHTML']    = '';
				$block['innerContent'] = '';
			} elseif ( ! empty( $block['innerBlocks'] ) ) {
					$block['innerBlocks'] = $this->filter_pattern( $block['innerBlocks'], $flag );
			}
		}

		return $blocks;
	}

	/**
	 * Handle After Insert Page.
	 *
	 * @param WP_Post $post Inserted or updated post object.
	 */
	public function after_insert_page( $post ) {
		$theme_id = get_option( 'gtb_active_theme_id', null );

		if ( $theme_id ) {
			$this->update_theme_pattern_post( $post->ID );
		}
	}

	/**
	 * Handle After Insert Template.
	 *
	 * @param WP_Post $post Inserted or updated post object.
	 */
	public function after_insert_wp_template( $post ) {
		$this->update_theme_pattern_post( $post->ID );
	}

	/**
	 * Update Theme Pattern
	 *
	 * @param int $id post id.
	 */
	public function update_theme_pattern_post( $id ) {
		$flag    = false;
		$post    = $this->get_post( $id );
		$content = $this->parse_blocks( $post->post_content );
		$blocks  = $this->filter_pattern( $content, $flag );

		if ( $flag ) {
			$serialize = serialize_blocks( $blocks );
			wp_update_post(
				(object) array(
					'ID'           => $id,
					'post_content' => $serialize,
				)
			);
		}
	}

	/**
	 * Parse Guten Block.
	 *
	 * @param string $content the content string.
	 * @since 1.1.0
	 */
	public function parse_blocks( $content ) {
		global $wp_version;

		return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : parse_blocks( $content );
	}

	/**
	 * Gets the post, if the ID is valid.
	 *
	 * @since 4.7.2
	 *
	 * @param int $id Supplied ID.
	 * @return \WP_Post|\WP_Error Post object if ID is valid, WP_Error otherwise.
	 */
	protected function get_post( $id ) {
		$error = new \WP_Error(
			'rest_post_invalid_id',
			__( 'Invalid post ID.' ),
			array( 'status' => 404 )
		);

		if ( (int) $id <= 0 ) {
			return $error;
		}

		$post = get_post( (int) $id );
		if ( empty( $post ) || empty( $post->ID ) ) {
			return $error;
		}

		return $post;
	}

	/**
	 * Initialize Form
	 */
	public function init_post_type() {
	}

	/**
	 * Init Rest API
	 */
	public function init_api() {
		new Backend_Api();
	}

	/**
	 * Initialize Database Table upon plugin activation
	 */
	public function plugin_activation() {
		$this->deployment = new Deploy();
		$this->deployment->start();
	}

	/**
	 * Dashboard Notice .
	 */
	public function dashboard_notice() {
		?>
			<div class="notice gutenverse-upgrade-notice page-content-upgrade plugin-notice">
				<div class="notice-logo">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#ffc908"/>
					</svg>
				</div>
				<div class="notice-content">
					<h2><?php echo esc_html__( 'Install Gutenverse Plugin!', 'gutenverse-themes-builder' ); ?></h2>
					<p>
					<?php echo esc_html__( 'To access the Gutenverse Themes Builder, we kindly ask you to install the Gutenverse plugin first.', 'gutenverse-themes-builder' ); ?>
					</p>
					<div class="gutenverse-upgrade-action">
						<span class="gtb-notice-action">
							<a class='install-action' href=""><?php echo esc_html__( 'Install Gutenverse', 'gutenverse-themes-builder' ); ?></a>
						</span>
						<a class='close-notif' href="#"><?php esc_html_e( 'Close notification', 'gutenverse-themes-builder' ); ?></a>
					</div>
				</div>
			</div>
		<?php
	}

	/**
	 * Dashboard Notice .
	 */
	public function dashboard_enqueue_scripts() {
		wp_enqueue_style(
			'gtb-admin-notice',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/css/admin.css',
			array(),
			GUTENVERSE_THEMES_BUILDER_VERSION
		);

		wp_enqueue_script(
			'gtb-admin-notice',
			GUTENVERSE_THEMES_BUILDER_URL . '/assets/js/admin.js',
			array(),
			GUTENVERSE_THEMES_BUILDER_VERSION,
			true
		);

		wp_enqueue_script( 'jquery' );
		$dashboard_notice = sprintf(
			'var gtb_ajax_obj = {
				ajax_url: "%s",
				nonce: "%s"
			};',
			admin_url( 'admin-ajax.php' ),
			wp_create_nonce( 'gtb_ajax_nonce' )
		);

		wp_add_inline_script( 'jquery', $dashboard_notice );
	}

	/**
	 * Dashboard Notice plugin manager.
	 */
	public function gtb_plugin_manager_ajax() {
		check_ajax_referer( 'gtb_ajax_nonce', 'nonce' );

		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error( array( 'message' => 'You do not have permission to install plugins.' ) );
		}

		$plugin_slug = 'gutenverse';
		$plugin_file = sprintf( '%s/%s.php', $plugin_slug, $plugin_slug );

		if ( file_exists( WP_PLUGIN_DIR . '/' . $plugin_file ) ) {
			return $this->notice_plugin_manager( 'activate', $plugin_slug );
		} else {
			return $this->notice_plugin_manager( 'install', $plugin_slug );
		}
	}

	/**
	 * Install Plugin.
	 *
	 * @param string $type installation type.
	 * @param string $plugin_slug plugin slug.
	 */
	public function notice_plugin_manager( $type, $plugin_slug ) {
		include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';

		$plugin_file = sprintf( '%s/%s.php', $plugin_slug, $plugin_slug );
		switch ( $type ) {
			case 'activate':
				activate_plugin( $plugin_file, '', false, true );
				return wp_send_json_success( array( 'message' => 'Plugin Activated Successfully.' ) );
			case 'install':
				$api = plugins_api(
					'plugin_information',
					array(
						'slug'   => $plugin_slug,
						'fields' => array(
							'sections' => false,
						),
					)
				);

				if ( is_wp_error( $api ) ) {
					return wp_send_json_error( array( 'message' => 'Failed to retrieve plugin information.' ) );
				}

				$upgrader       = new \Plugin_Upgrader( new \WP_Ajax_Upgrader_Skin() );
				$install_result = $upgrader->install( $api->download_link );

				if ( is_wp_error( $install_result ) ) {
					return wp_send_json_error( array( 'message' => 'Failed to install plugin.' ) );
				}

				return $this->notice_plugin_manager( 'activate', $plugin_slug );
			default:
				break;
		}
	}

	/**
	 * Change option page content to false.
	 */
	public function plugin_notice_close() {
		update_option( 'gtb_plugin_notice_flag', 0 );
	}
}
