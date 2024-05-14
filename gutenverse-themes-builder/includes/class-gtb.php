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
 * Class Gtb
 *
 * @package gtb
 */
class Gtb {
	/**
	 * Instance of Deploy.
	 *
	 * @var Deploy
	 */
	public $deployment;

	/**
	 * Instance of Gtb.
	 *
	 * @var Gtb
	 */
	private static $instance;

	/**
	 * Singleton page for Gtb Class
	 *
	 * @return Gtb
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
		add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ) );
		add_action( 'activated_plugin', array( $this, 'plugin_activation' ) );
		add_action( 'after_setup_theme', array( $this, 'load_custom_theme_json' ) );
	}

	/**
	 * Load custom theme Json
	 */
	public function load_custom_theme_json() {
		$theme_dir = gtb_theme_folder_path();
		$json_path = $theme_dir . 'theme.json';

		if ( file_exists( $json_path ) ) {
			add_filter(
				'wp_theme_json_data_theme',
				function ( $theme_json ) use ( $json_path ) {
					$custom_theme_json = json_decode( file_get_contents( $json_path ), true );

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
		require_once GTB_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		$framework_file    = GTB_DIR . 'lib/framework/bootstrap.php';
		$framework_version = $init->get_framework_version( $framework_file );
		$init->register_version( GTB, $framework_version );
	}

	/**
	 * Check if we can load framework.
	 *
	 * @return boolean
	 */
	public function can_load_framework() {
		require_once GTB_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		return $init->can_load_version( GTB );
	}

	/**
	 * Load Plugin.
	 */
	public function plugin_loaded() {
		$this->load_framework();
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
			require_once GTB_DIR . 'lib/framework/bootstrap.php';
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
		require_once GTB_DIR . 'lib/helper.php';
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
					array(
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
				array(
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
}
