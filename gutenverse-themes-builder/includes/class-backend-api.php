<?php
/**
 * REST APIs class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gtb
 */

namespace GTB;

use GTB\Database\Database;
use Gutenverse\Framework\Global_Variable;
use Gutenverse\Framework\Init;
use ZipArchive;
use WP_Theme_Json_Resolver;

/**
 * Class Api
 *
 * @package gtb
 */
class Backend_Api {
	/**
	 * Endpoint Path
	 *
	 * @var string
	 */
	const ENDPOINT = 'gtb-backend/v1';

	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register GTB APIs
	 */
	public function register_routes() {
		if ( ! is_admin() && ! current_user_can( 'manage_options' ) ) {
			return;
		}

		/**
		 * Backend routes.
		 */

		// Themes.
		register_rest_route(
			self::ENDPOINT,
			'themes/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/other',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_theme_other_data' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/active',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'set_active_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_theme_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_theme_data' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'themes/export',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'export_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		// Assets.
		register_rest_route(
			self::ENDPOINT,
			'assets/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_asset_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'asset/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_asset' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'asset/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_asset' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'asset/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_asset' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		// Fonts.
		register_rest_route(
			self::ENDPOINT,
			'fonts/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_font_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'font/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_font' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'font/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_font' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'font/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_font' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		// Fontsizes.
		register_rest_route(
			self::ENDPOINT,
			'fontsizes/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_fontsize_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'fontsize/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_fontsize' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'fontsize/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_fontsize' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'fontsize/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_fontsize' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		// Templates.
		register_rest_route(
			self::ENDPOINT,
			'templates/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_template_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'templates/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_template' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'templates/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_template' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		// Pattern.
		register_rest_route(
			self::ENDPOINT,
			'pattern/search',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'search_pattern' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'pattern/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_pattern' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'pattern/edit',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'edit_pattern' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'pattern',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'get_pattern' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'pattern/data',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_pattern_data' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'pattern/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_pattern_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'pattern/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_pattern' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		// Global Styles.

		register_rest_route(
			self::ENDPOINT,
			'globalstyles/list',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_global_list' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'globalstyle/update',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'update_globalstyle' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'globalstyle/create',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_globalstyle' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'globalstyle/delete',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'delete_globalstyle' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'globalstyle/active',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'set_active_global' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);
	}

	/**
	 * ==================================================================================================================================
	 * Global Style APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Import Global Style from Elementor Template kits Equivalent.
	 *
	 * @param array   $filedata .
	 * @param boolean $replace .
	 *
	 * @return array
	 */
	public function global_style_import( $filedata, $replace = false ) {
		if ( empty( $filedata ) ) {
			return array(
				'fonts'  => '',
				'colors' => '',
			);
		}

		$jsondata  = $this->get_file_json_data( $filedata['id'] );
		$globals   = new Global_Variable();
		$converted = array();

		$theme         = wp_get_theme();
		$themedata     = WP_Theme_Json_Resolver::get_user_data_from_wp_global_styles( $theme );
		$update_colors = json_decode( $themedata['post_content'] );

		if ( isset( $update_colors->settings->color->palette->custom ) ) {
			$update_colors->settings->color->palette->custom = array();
		}

		foreach ( $jsondata->page_settings as $key => $settings ) {
			if ( 'system_colors' === $key || 'custom_colors' === $key ) {
				foreach ( $settings as $setting ) {
					$converted_color       = array(
						'slug'  => $setting->_id,
						'name'  => $setting->title,
						'color' => $setting->color,
					);
					$converted['colors'][] = $converted_color;

					$update_colors->settings->color->palette->custom[] = $converted_color;
				}
			}

			if ( 'system_typography' === $key || 'custom_typography' === $key ) {
				if ( empty( $converted['fonts'] ) ) {
					$converted['fonts'] = array();
				}

				foreach ( $settings as $setting ) {
					$converted_font = array(
						'id'   => $setting->_id,
						'name' => $setting->title,
						'font' => array(),
					);

					if ( isset( $setting->typography_font_family ) ) {
						$converted_font['font']['font'] = array(
							'label' => $setting->typography_font_family,
							'value' => $setting->typography_font_family,
							'type'  => $setting->typography_typography ? 'google' : 'system',
						);
					}

					if ( isset( $setting->typography_font_weight ) ) {
						$converted_font['font']['weight'] = $setting->typography_font_weight;
					}

					if ( isset( $setting->typography_font_style ) ) {
						$converted_font['font']['style'] = $setting->typography_font_style;
					}

					if ( isset( $setting->typography_text_decoration ) ) {
						$converted_font['font']['decoration'] = $setting->typography_text_decoration;
					}

					if ( isset( $setting->typography_text_transform ) ) {
						$converted_font['font']['transform'] = $setting->typography_text_transform;
					}

					$converted_font['font']['size'] = array();

					if ( isset( $setting->typography_font_size ) ) {
						$converted_font['font']['size']['Dekstop'] = array(
							'unit'  => $setting->typography_font_size->unit,
							'point' => $setting->typography_font_size->size,
						);
					}

					if ( isset( $setting->typography_font_size_tablet ) ) {
						$converted_font['font']['size']['Tablet'] = array(
							'unit'  => $setting->typography_font_size_tablet->unit,
							'point' => $setting->typography_font_size_tablet->size,
						);
					}

					if ( isset( $setting->typography_font_size_mobile ) ) {
						$converted_font['font']['size']['Mobile'] = array(
							'unit'  => $setting->typography_font_size_mobile->unit,
							'point' => $setting->typography_font_size_mobile->size,
						);
					}

					$converted_font['font']['lineHeight'] = array();

					if ( isset( $setting->typography_line_height ) ) {
						$converted_font['font']['lineHeight']['Dekstop'] = array(
							'unit'  => $setting->typography_line_height->unit,
							'point' => $setting->typography_line_height->size,
						);
					}

					if ( isset( $setting->typography_line_height_tablet ) ) {
						$converted_font['font']['lineHeight']['Tablet'] = array(
							'unit'  => $setting->typography_line_height_tablet->unit,
							'point' => $setting->typography_line_height_tablet->size,
						);
					}

					if ( isset( $setting->typography_line_height_mobile ) ) {
						$converted_font['font']['lineHeight']['Mobile'] = array(
							'unit'  => $setting->typography_line_height_mobile->unit,
							'point' => $setting->typography_line_height_mobile->size,
						);
					}

					$converted_font['font']['spacing'] = array();

					if ( isset( $setting->typography_letter_spacing ) ) {
						$converted_font['font']['spacing']['Dekstop'] = $this->convert_spacing( $setting->typography_letter_spacing );
					}

					if ( isset( $setting->typography_letter_spacing_tablet ) ) {
						$converted_font['font']['spacing']['Tablet'] = $this->convert_spacing( $setting->typography_letter_spacing_tablet );
					}

					if ( isset( $setting->typography_letter_spacing_mobile ) ) {
						$converted_font['font']['spacing']['Mobile'] = $this->convert_spacing( $setting->typography_letter_spacing_mobile );
					}

					$converted['fonts'][] = $converted_font;
				}
			}
		}

		if ( $replace ) {
			$update_colors = wp_json_encode( $update_colors );

			wp_update_post(
				array(
					'ID'           => $themedata['ID'],
					'post_content' => $update_colors,
				)
			);

			$globals->set_global_variable( $converted );
		}

		return $converted;
	}

	/**
	 * Convert spacing value from template kit global.json
	 *
	 * @param object $spacing .
	 *
	 * @return int|string
	 */
	private function convert_spacing( $spacing ) {
		$basesize = 16;

		if ( isset( $spacing->unit ) ) {
			switch ( $spacing->unit ) {
				case 'rem':
					return (float) $spacing->size * $basesize;
				case 'px':
					return (float) $spacing->size / $basesize;
				case 'em':
					return (float) $spacing->size;
			}
		}

		return '';
	}

	/**
	 * Get theme list
	 */
	public function get_global_list() {
		$global_db = Database::instance()->theme_globals;
		$data      = $global_db->get_all_globals();

		foreach ( $data as &$global ) {
			if ( ! empty( $global['file'] ) ) {
				$global['file'] = maybe_unserialize( $global['file'] );
			}
		}

		return array(
			'data'   => $data,
			'active' => $this->get_active_global_id(),
		);
	}

	/**
	 * Get Active Global ID
	 *
	 * @return int|false
	 */
	public function get_active_global_id() {
		$theme_db = Database::instance()->theme_info;
		$theme_id = get_option( 'gtb_active_theme_id' );
		$theme    = $theme_db->get_theme_data( $theme_id );

		if ( ! empty( $theme ) ) {
			return $theme[0]['global_id'];
		}

		return false;
	}

	/**
	 * Create Global Styles
	 *
	 * @param object $request .
	 *
	 * @return array
	 */
	public function create_globalstyle( $request ) {
		$title     = $request->get_param( 'title' );
		$filedata  = $request->get_param( 'file' );
		$imported  = $this->global_style_import( $filedata );
		$global_db = Database::instance()->theme_globals;
		$data      = array(
			'title'  => $title,
			'file'   => maybe_serialize( $filedata ),
			'fonts'  => maybe_serialize( $imported['fonts'] ),
			'colors' => maybe_serialize( $imported['colors'] ),
		);

		$global_db->create_data( $data );

		return $this->get_global_list();
	}

	/**
	 * Edit Global Styles
	 *
	 * @param object $request .
	 *
	 * @return array
	 */
	public function update_globalstyle( $request ) {
		$id        = $request->get_param( 'id' );
		$title     = $request->get_param( 'title' );
		$filedata  = $request->get_param( 'file' );
		$global_db = Database::instance()->theme_globals;
		$previous  = $global_db->get_data( $id );

		if ( ! empty( $previous ) ) {
			$decode = maybe_unserialize( $previous[0]['file'] );

			if ( ! empty( $decode ) && (int) $decode['id'] !== (int) $filedata['id'] ) {
				$replace  = (int) $this->get_active_global_id() === (int) $id;
				$imported = $this->global_style_import( $filedata, $replace );
			}
		}

		$where = array(
			'id' => $id,
		);
		$data  = array(
			'title' => $title,
			'file'  => maybe_serialize( $filedata ),
		);

		if ( ! empty( $imported ) ) {
			$data['fonts']  = maybe_serialize( $imported['fonts'] );
			$data['colors'] = maybe_serialize( $imported['colors'] );
		}

		$global_db->update_data( $data, $where );

		return $this->get_global_list();
	}

	/**
	 * Delete Global
	 *
	 * @param object $request .
	 */
	public function delete_globalstyle( $request ) {
		$global_db = Database::instance()->theme_globals;
		$id        = $request->get_param( 'id' );

		$global_db->delete_data(
			array( 'id' => $id )
		);

		return $this->get_global_list();
	}

	/**
	 * Set active global
	 *
	 * @param object $request .
	 */
	public function set_active_global( $request ) {
		$global_id = $request->get_param( 'global_id' );
		$theme_id  = get_option( 'gtb_active_theme_id' );
		$global_db = Database::instance()->theme_globals;
		$theme_db  = Database::instance()->theme_info;
		$globals   = new Global_Variable();

		// Saving current style.
		$current_id    = $this->get_active_global_id();
		$theme         = wp_get_theme();
		$themedata     = WP_Theme_Json_Resolver::get_user_data_from_wp_global_styles( $theme );
		$update_colors = json_decode( $themedata['post_content'] );
		$global_colors = $update_colors->settings->color->palette->custom;
		$global_fonts  = $globals->get_global_variable( 'font' );

		$where = array(
			'id' => $current_id,
		);
		$data  = array(
			'fonts'  => maybe_serialize( $global_fonts ),
			'colors' => maybe_serialize( $global_colors ),
		);

		$global_db->update_data( $data, $where );

		// Switching to new one.
		$update = $global_db->get_data( $global_id );

		$globals->set_global_variable(
			array(
				'fonts'  => maybe_unserialize( $update[0]['fonts'] ),
				'colors' => maybe_unserialize( $update[0]['colors'] ),
			)
		);

		$theme         = wp_get_theme();
		$themedata     = WP_Theme_Json_Resolver::get_user_data_from_wp_global_styles( $theme );
		$update_colors = json_decode( $themedata['post_content'] );

		$update_colors->settings->color->palette->custom = maybe_unserialize( $update[0]['colors'] );

		$update_colors = wp_json_encode( $update_colors );
		$result        = wp_update_post(
			array(
				'ID'           => $themedata['ID'],
				'post_content' => $update_colors,
			)
		);

		$theme_db->update_data(
			array(
				'global_id' => $global_id,
			),
			$theme_id
		);

		return $this->get_global_list();
	}

	/**
	 * ==================================================================================================================================
	 * THEMES APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Start building theme from parameters
	 *
	 * @param object $request .
	 */
	public function create_theme( $request ) {
		$info_details = $request->get_param( 'info_details' );
		$theme_json   = $request->get_param( 'theme_json' );

		if ( empty( $info_details['slug'] ) || empty( $info_details['title'] ) ) {
			return array(
				'status' => 'failed',
				'data'   => array(
					'message' => esc_html__( 'Please input Theme Slug and Title', 'gtb' ),
				),
			);
		}

		$theme_id = $this->generate_uid();
		$info_db  = Database::instance()->theme_info;
		$data     = array(
			'theme_id'   => $theme_id,
			'slug'       => $info_details['slug'],
			'theme_mode' => $info_details['theme_mode'],
			'theme_data' => maybe_serialize( $info_details ),
			'theme_json' => maybe_serialize( $theme_json ),
		);

		$result = $info_db->create_data( $data );

		$this->check_directory( gtb_theme_folder_path( $theme_id ), $result );

		return array(
			'status' => 'success',
			'data'   => array(
				'list' => $this->get_theme_list(),
			),
		);
	}

	/**
	 * Get theme list
	 */
	public function get_theme_list() {
		$info_db = Database::instance()->theme_info;
		$data    = $info_db->get_all_data();
		$active  = get_option( 'gtb_active_theme_id' );

		foreach ( $data as &$theme ) {
			if ( ! empty( $theme['theme_data'] ) ) {
				$theme['theme_data'] = maybe_unserialize( $theme['theme_data'] );
			}
		}

		return array(
			'active' => $active,
			'data'   => $data,
		);
	}

	/**
	 * Get theme data
	 *
	 * @param object $request .
	 */
	public function get_theme_data( $request ) {
		$theme_id = ! empty( $request->get_param( 'id' ) ) ? $request->get_param( 'id' ) : get_option( 'gtb_active_theme_id' );
		$info_db  = Database::instance()->theme_info;
		$data     = $info_db->get_theme_data( $theme_id );

		$theme_data = array();

		foreach ( $data as $key => $theme ) {
			if ( 0 === $key ) {
				$theme_data['info_details'] = array(
					'theme_id' => $theme['theme_id'],
					'slug'     => $theme['slug'],
				);

				$metadata                   = maybe_unserialize( $theme['theme_data'] );
				$theme_data['info_details'] = array_merge( $theme_data['info_details'], $metadata );
				$theme_data['other']        = maybe_unserialize( $theme['other'] );
			}
		}

		return $theme_data;
	}

	/**
	 * Update theme data
	 *
	 * @param object $request .
	 */
	public function update_theme( $request ) {
		$info_details = $request->get_param( 'info_details' );
		$theme_json   = $request->get_param( 'theme_json' );
		$theme_id     = $request->get_param( 'theme_id' );

		if ( empty( $info_details['slug'] ) || empty( $info_details['title'] ) ) {
			return array(
				'status' => 'failed',
				'data'   => array(
					'message' => esc_html__( 'Please input Theme Slug and Title', 'gtb' ),
				),
			);
		}

		$info_db = Database::instance()->theme_info;
		$current = gtb_get_theme_mode( $theme_id );

		if ( ! empty( $current ) && $info_details['theme_mode'] !== $current ) {
			$this->save_templates( $theme_id );
		}

		$data = array(
			'slug'       => $info_details['slug'],
			'theme_mode' => $info_details['theme_mode'],
			'theme_data' => maybe_serialize( $info_details ),
			'theme_json' => maybe_serialize( $theme_json ),
		);

		$info_db->update_data( $data, $theme_id );

		return array(
			'status' => 'success',
			'data'   => array(
				'list' => $this->get_theme_list(),
			),
		);
	}

	/**
	 * Update theme data
	 *
	 * @param object $request .
	 */
	public function update_theme_other_data( $request ) {
		$key      = $request->get_param( 'key' );
		$data     = $request->get_param( 'data' );
		$theme_id = get_option( 'gtb_active_theme_id' );
		$info_db  = Database::instance()->theme_info;
		$previous = $info_db->get_theme_data( $theme_id );

		if ( ! empty( $previous ) ) {
			$other_data = maybe_unserialize( $previous[0]['other'] );

			if ( empty( $other_data ) ) {
				$other_data = array();
			}

			$other_data[ $key ] = $data;

			$data = array(
				'other' => maybe_serialize( $other_data ),
			);

			$info_db->update_data( $data, $theme_id );
		}

		return array(
			'status' => 'success',
		);
	}

	/**
	 * Reset theme
	 *
	 * @param string $theme_id .
	 */
	private function reset_theme( $theme_id = null ) {
		$theme_id      = empty( $theme_id ) ? get_option( 'gtb_active_theme_id' ) : $theme_id;
		$templates_db  = Database::instance()->theme_templates;
		$template_list = $templates_db->get_data( $theme_id );

		if ( ! empty( $template_list ) ) {
			foreach ( $template_list as $template_data ) {
				$template_name = strtolower( $template_data['category'] . '-' . $template_data['name'] );
				$template_type = in_array( $template_data['template_type'], gtb_parts(), true ) ? 'wp_template_part' : 'wp_template';

				$posts = get_posts(
					array(
						'post_type' => $template_type,
						'name'      => $template_name,
					)
				);

				foreach ( $posts as $post ) {
					wp_delete_post( $post->ID, true );
				}
			}
		}
	}

	/**
	 * Delete theme data
	 *
	 * @param object $request .
	 */
	public function delete_theme( $request ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		$theme_id  = $request->get_param( 'theme_id' );
		$active_id = get_option( 'gtb_active_theme_id' );

		$this->reset_theme( $active_id );

		$info_db = Database::instance()->theme_info;
		$info_db->delete_data( $theme_id );

		if ( $active_id === $theme_id ) {
			update_option( 'gtb_active_theme_id', null );
		}

		$theme_folder = gtb_theme_folder_path( $theme_id );

		if ( is_dir( $theme_folder ) ) {
			$wp_filesystem->rmdir( $theme_folder );
		}

		return $this->get_theme_list();
	}

	/**
	 * Set active theme
	 *
	 * @param object $request .
	 */
	public function set_active_theme( $request ) {
		$theme_id   = $request->get_param( 'theme_id' );
		$current_id = get_option( 'gtb_active_theme_id' );

		$this->save_templates( $current_id );

		update_option( 'gtb_active_theme_id', $theme_id );

		return $this->get_theme_list();
	}

	/**
	 * Export Theme
	 *
	 * @param object $request .
	 */
	public function export_theme( $request ) {
		$result = new Export_Theme();

		return $result->fileresult['fileurl'];
	}

	/**
	 * ==================================================================================================================================
	 * PATTERNS APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Create Pattern
	 *
	 * @param object $request .
	 */
	public function create_pattern( $request ) {
		$theme_id = get_option( 'gtb_active_theme_id' );

		if ( $theme_id ) {
			$slug     = $request->get_param( 'slug' );
			$category = $request->get_param( 'category' );
			$name     = $request->get_param( 'name' );

			$post_exists = get_page_by_path( $slug, OBJECT, 'gutenverse-pattern' );

			if ( null === $post_exists ) {
				$post_id = wp_insert_post(
					array(
						'post_title'  => $name,
						'post_name'   => $slug,
						'post_status' => 'publish',
						'post_type'   => 'gutenverse-pattern',

					)
				);

				add_post_meta( $post_id, '_pattern_category', $category );
				add_post_meta( $post_id, '_pattern_theme_id', $theme_id );

				return array(
					'status' => 'success',
					'data'   => array(
						'list' => $this->get_pattern_list( $request ),
					),
				);
			} else {
				return array(
					'status' => 'failed',
					'data'   => array(
						'message' => esc_html__( 'Slug Already Exist', 'gtb' ),
					),
				);
			}
		} else {
			return array(
				'status' => 'failed',
				'data'   => array(
					'message' => esc_html__( 'Theme not defined', 'gtb' ),
				),
			);
		}
	}

	/**
	 * Edit Pattern
	 *
	 * @param object $request .
	 */
	public function edit_pattern( $request ) {
		$theme_id = get_option( 'gtb_active_theme_id' );

		if ( $theme_id ) {
			$id       = $request->get_param( 'id' );
			$slug     = $request->get_param( 'slug' );
			$category = $request->get_param( 'category' );
			$name     = $request->get_param( 'name' );

			$post_exists = get_page_by_path( $slug, OBJECT, 'gutenverse-pattern' );

			if ( empty( $post_exists ) || $id === $post_exists->ID ) {
				$post_id = wp_update_post(
					array(
						'ID'          => $id,
						'post_title'  => $name,
						'post_name'   => $slug,
						'post_status' => 'publish',
						'post_type'   => 'gutenverse-pattern',

					)
				);

				update_post_meta( $post_id, '_pattern_category', $category );

				return array(
					'status' => 'success',
					'data'   => array(
						'list' => $this->get_pattern_list( $request ),
					),
				);
			} else {
				return array(
					'status' => 'failed',
					'data'   => array(
						'message' => esc_html__( 'Slug Already Exist', 'gtb' ),
					),
				);
			}
		} else {
			return array(
				'status' => 'failed',
				'data'   => array(
					'message' => esc_html__( 'Theme not defined', 'gtb' ),
				),
			);
		}
	}

	/**
	 * Search Pattern.
	 *
	 * @param object $request Request Object.
	 *
	 * @return array
	 */
	public function search_pattern( $request ) {
		$theme_id = get_option( 'gtb_active_theme_id' );

		if ( $theme_id ) {
			$search   = $request->get_param( 'search' );
			$category = $request->get_param( 'category' );
			$paged    = $request->get_param( 'paged' );
			$result   = array();

			add_filter(
				'posts_where',
				function ( $where ) use ( $search ) {
					global $wpdb;
					$where .= ' AND ' . $wpdb->posts . '.post_title LIKE \'%' . esc_sql( $wpdb->esc_like( $search ) ) . '%\'';
					return $where;
				}
			);

			$category_meta = $category ? array(
				'key'     => '_pattern_category',
				'value'   => $category,
				'compare' => '===',
			) : array();

			$patterns = new \WP_Query(
				array(
					'post_type'      => 'gutenverse-pattern',
					'meta_query' => array( //phpcs:ignore
						array(
							'key'     => '_pattern_theme_id',
							'value'   => $theme_id,
							'compare' => '===',
						),
						$category_meta,
					),
					'posts_per_page' => 9,
					'paged'          => ! empty( $paged ) ? $paged : 1,
				)
			);

			foreach ( $patterns->posts as $post ) {
				$result[] = array(
					'value'   => $post->post_name,
					'label'   => $post->post_title,
					'content' => $post->post_content,
				);
			}

			return array(
				'list'  => $result,
				'total' => $patterns->max_num_pages,
			);
		}
	}

	/**
	 * Get Pattern Data.
	 *
	 * @param object $request Request Object.
	 *
	 * @return string
	 */
	public function get_pattern_data( $request ) {
		$id   = $request->get_param( 'id' );
		$post = get_post( $id );

		if ( $post ) {
			$pattern_category = get_post_meta( $id, '_pattern_category', true );
			return array(
				'slug'     => $post->post_name,
				'name'     => $post->post_title,
				'category' => $pattern_category,
			);
		} else {
			return false;
		}
	}

	/**
	 * Get Pattern.
	 *
	 * @param object $request Request Object.
	 *
	 * @return string
	 */
	public function get_pattern( $request ) {
		$slug = $request->get_param( 'slug' );
		$post = get_page_by_path( $slug, OBJECT, 'gutenverse-pattern' );

		if ( $post ) {
			return $post->post_content;
		} else {
			return false;
		}
	}

	/**
	 * Get Pattern List.
	 *
	 * @param object $request Request Object.
	 *
	 * @return string
	 */
	public function get_pattern_list( $request ) {
		$paged    = $request->get_param( 'paged' );
		$paged    = empty( $paged ) ? 1 : $paged;
		$theme_id = get_option( 'gtb_active_theme_id' );
		$patterns = new \WP_Query(
			array(
				'post_type'      => 'gutenverse-pattern',
				'paged'          => $paged,
				'posts_per_page' => -1,
				'meta_query' => array( //phpcs:ignore
					array(
						'key'     => '_pattern_theme_id',
						'value'   => $theme_id,
						'compare' => '===',
					),
				),
			)
		);

		return $patterns->posts;
	}

	/**
	 * Delete Pattern
	 *
	 * @param object $request Request Object.
	 *
	 * @return array
	 */
	public function delete_pattern( $request ) {
		$pattern_id = $request->get_param( 'pattern_id' );

		if ( ! empty( $pattern_id ) ) {
			wp_delete_post( $pattern_id, true );
		}

		return $this->get_pattern_list( $request );
	}

	/**
	 * ==================================================================================================================================
	 * ASSETS APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Get Asset List.
	 */
	public function get_asset_list() {
		$assets_db = Database::instance()->theme_assets;
		$active    = get_option( 'gtb_active_theme_id' );
		$data      = $assets_db->get_all_assets( $active );

		return array(
			'data' => $data,
		);
	}

	/**
	 * Update theme data
	 *
	 * @param object $request .
	 */
	public function update_asset( $request ) {
		$id         = $request->get_param( 'id' );
		$handler    = $request->get_param( 'handler' );
		$type       = $request->get_param( 'type' );
		$enqueue    = $request->get_param( 'enqueue' );
		$preset     = $request->get_param( 'preset' );
		$media_type = $request->get_param( 'media_type' );
		$content    = $request->get_param( 'content' );
		$assets_db  = Database::instance()->theme_assets;

		$assets_db->update_data(
			array(
				'handler'    => $handler,
				'type'       => $type,
				'enqueue'    => $enqueue,
				'preset'     => $preset,
				'media_type' => $media_type,
				'content'    => $content,
			),
			array(
				'id' => $id,
			)
		);

		$this->write_asset( $media_type, $type, $handler, $content );
		return $this->get_asset_list();
	}

	/**
	 * Create Assets
	 *
	 * @param object $request .
	 */
	public function create_asset( $request ) {
		$handler    = $request->get_param( 'handler' );
		$type       = $request->get_param( 'type' );
		$enqueue    = $request->get_param( 'enqueue' );
		$preset     = $request->get_param( 'preset' );
		$media_type = $request->get_param( 'media_type' );
		$content    = $request->get_param( 'content' );
		$active     = get_option( 'gtb_active_theme_id' );
		$assets_db  = Database::instance()->theme_assets;

		$result = $assets_db->create_data(
			array(
				'handler'    => $handler,
				'type'       => $type,
				'enqueue'    => $enqueue,
				'media_type' => $media_type,
				'content'    => $content,
				'preset'     => $preset,
				'theme_id'   => $active,
			)
		);

		if ( $result ) {
			$this->write_asset( $media_type, $type, $handler, $content );
			return $this->get_asset_list();
		} else {
			return false;
		}
	}

	/**
	 * Write File Directly.
	 *
	 * @param string $media_type Media Type.
	 * @param string $type Type.
	 * @param string $handler Handler.
	 * @param string $content Content.
	 */
	public function write_asset( $media_type, $type, $handler, $content ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		if ( 'content' === $media_type ) {
			$folder = gtb_theme_folder_path() . '/assets/' . $type;
			$file   = $folder . '/' . $handler . '.' . $type;

			$this->check_directory( $folder );

			if ( 'css' === $type ) {
				$content = '.editor-styles-wrapper .wp-block.no-margin { margin-top: 0; margin-bottom: 0; } ' . $content;
			}

			$wp_filesystem->put_contents(
				$file,
				$content,
				FS_CHMOD_FILE
			);
		}
	}

	/**
	 * Delete Assets
	 *
	 * @param object $request .
	 */
	public function delete_asset( $request ) {
		$assets_db = Database::instance()->theme_assets;
		$id        = $request->get_param( 'id' );

		$assets_db->delete_data(
			array( 'id' => $id )
		);

		return $this->get_asset_list();
	}

	/**
	 * ==================================================================================================================================
	 * FONTS APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Get Font List.
	 */
	public function get_font_list() {
		$fonts_db = Database::instance()->theme_fonts;
		$active   = get_option( 'gtb_active_theme_id' );
		$data     = $fonts_db->get_all_fonts( $active );

		foreach ( $data as &$font ) {
			$font['style']   = maybe_unserialize( $font['style'] );
			$font['weights'] = maybe_unserialize( $font['weights'] );
		}

		return array(
			'data' => $data,
		);
	}

	/**
	 * Update theme data
	 *
	 * @param object $request .
	 */
	public function update_font( $request ) {
		$id       = $request->get_param( 'id' );
		$family   = $request->get_param( 'family' );
		$style    = $request->get_param( 'style' );
		$weights  = $request->get_param( 'weights' );
		$fonts_db = Database::instance()->theme_fonts;

		$fonts_db->update_data(
			array(
				'family'  => $family,
				'style'   => maybe_serialize( $style ),
				'weights' => maybe_serialize( $weights ),
			),
			array(
				'id' => $id,
			)
		);

		$this->generate_fonts( $family, $style, $weights );
		$this->update_theme_json();

		return $this->get_font_list();
	}

	/**
	 * Create Fonts
	 *
	 * @param object $request .
	 */
	public function create_font( $request ) {
		$family   = $request->get_param( 'family' );
		$style    = $request->get_param( 'style' );
		$weights  = $request->get_param( 'weights' );
		$active   = get_option( 'gtb_active_theme_id' );
		$fonts_db = Database::instance()->theme_fonts;

		$result = $fonts_db->create_data(
			array(
				'family'   => $family,
				'style'    => maybe_serialize( $style ),
				'weights'  => maybe_serialize( $weights ),
				'theme_id' => $active,
			)
		);

		$this->generate_fonts( $family, $style, $weights );
		$this->update_theme_json();

		return $this->get_font_list();
	}

	/**
	 * Get Font Params
	 *
	 * @param array $style .
	 * @param array $weights .
	 *
	 * @return string
	 */
	private function get_font_params( $style = array(), $weights = array() ) {
		$params = array();

		foreach ( $style as $type ) {
			if ( 'italic' === $type ) {
				$params[] = join( 'italic,', $weights ) . 'italic';
			} else {
				$params[] = join( ',', $weights );
			}
		}

		$result = join( ',', $params );
		$result = str_replace( 'regularitalic', 'italic', $result );

		return $result;
	}

	/**
	 * Generate Font Files
	 *
	 * @param string $family .
	 * @param array  $style .
	 * @param array  $weights .
	 */
	public function generate_fonts( $family, $style, $weights ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		if ( ! empty( $family ) ) {
			$slug   = strtolower( str_replace( ' ', '-', $family ) );
			$folder = gtb_theme_folder_path() . '/assets/fonts/' . $slug;
			$weight = $this->get_font_params( $style, $weights );

			$this->check_directory( $folder );

			$download_url = "https://gwfh.mranftl.com/api/fonts/{$slug}?download=zip&variants={$weight}&formats=woff2";
			$get_file     = wp_remote_get( $download_url );
			$file_path    = $folder . '/' . $slug . '.zip';

			if ( ! is_wp_error( $get_file ) ) {
				$wp_filesystem->put_contents(
					$file_path,
					$get_file['body'],
					FS_CHMOD_FILE
				);

				$zip = new ZipArchive();
				$res = $zip->open( $file_path );

				if ( $res ) {
					$zip->extractTo( $folder );
					$zip->close();
				}

				wp_delete_file( $file_path );
			}
		}
	}

	/**
	 * Create Fonts
	 *
	 * @param object $request .
	 */
	public function delete_font( $request ) {
		$fonts_db = Database::instance()->theme_fonts;
		$id       = $request->get_param( 'id' );
		$data     = $fonts_db->get_data( $id );

		$result = $fonts_db->delete_data(
			array( 'id' => $id )
		);

		if ( $result && ! empty( $data[0] ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
			global $wp_filesystem;

			$slug        = strtolower( str_replace( ' ', '-', $data[0]['family'] ) );
			$font_folder = gtb_theme_folder_path() . '/assets/fonts/' . $slug;
			$wp_filesystem->rmdir( $font_folder, true );
		}

		return $this->get_font_list();
	}


	/**
	 * ==================================================================================================================================
	 * FONTSIZE APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Get Font List.
	 */
	public function get_fontsize_list() {
		$sizes_db = Database::instance()->theme_fontsizes;
		$active   = get_option( 'gtb_active_theme_id' );
		$data     = $sizes_db->get_all_fonts( $active );

		return array(
			'data' => $data,
		);
	}

	/**
	 * Update theme data
	 *
	 * @param object $request .
	 */
	public function update_fontsize( $request ) {
		$id       = $request->get_param( 'id' );
		$title    = $request->get_param( 'title' );
		$size     = $request->get_param( 'size' );
		$slug     = str_replace( ' ', '-', strtolower( $title ) );
		$sizes_db = Database::instance()->theme_fontsizes;

		$sizes_db->update_data(
			array(
				'slug'  => $slug,
				'title' => $title,
				'size'  => $size,
			),
			array(
				'id' => $id,
			)
		);

		$this->update_theme_json();

		return $this->get_fontsize_list();
	}

	/**
	 * Create Fonts
	 *
	 * @param object $request .
	 */
	public function create_fontsize( $request ) {
		$title    = $request->get_param( 'title' );
		$size     = $request->get_param( 'size' );
		$slug     = str_replace( ' ', '-', strtolower( $title ) );
		$active   = get_option( 'gtb_active_theme_id' );
		$sizes_db = Database::instance()->theme_fontsizes;

		$result = $sizes_db->create_data(
			array(
				'slug'     => $slug,
				'title'    => $title,
				'size'     => $size,
				'theme_id' => $active,
			)
		);

		$this->update_theme_json();

		return $this->get_fontsize_list();
	}

	/**
	 * Delete Fonts
	 *
	 * @param object $request .
	 */
	public function delete_fontsize( $request ) {
		$sizes_db = Database::instance()->theme_fontsizes;
		$id       = $request->get_param( 'id' );
		$data     = $sizes_db->get_data( $id );

		$sizes_db->delete_data(
			array( 'id' => $id )
		);

		return $this->get_font_list();
	}


	/**
	 * ==================================================================================================================================
	 * TEMPLATES APIs
	 * ==================================================================================================================================
	 */

	/**
	 * Get template list
	 *
	 * @return array
	 */
	public function get_template_list() {
		$theme_id = get_option( 'gtb_active_theme_id' );

		if ( $theme_id ) {
			$templates_db   = Database::instance()->theme_templates;
			$templates_data = $templates_db->get_data( $theme_id );

			return array(
				'mode' => gtb_get_theme_mode( $theme_id ),
				'data' => $templates_data,
			);
		}

		return false;
	}

	/**
	 * Create template
	 *
	 * @param object $request .
	 */
	public function create_template( $request ) {
		$template_data  = $request->get_param( 'template_data' );
		$theme_id       = get_option( 'gtb_active_theme_id' );
		$allow_template = gtb_check_theme_mode( $template_data['category'], $theme_id );

		if ( ! empty( $template_data ) && $theme_id && $allow_template ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
			global $wp_filesystem;

			$theme_dir       = gtb_theme_folder_path();
			$category        = $template_data['category'];
			$category_folder = $theme_dir . '/' . $category;
			$template_type   = in_array( $template_data['template_type'], gtb_parts(), true ) ? 'parts' : 'templates';
			$template_name   = strtolower( str_replace( ' ', '-', $template_data['name'] ) );
			$file_path       = $category_folder . '/' . $template_type . '/' . $template_name . '.html';

			$this->check_directory( $category_folder . '/templates' );
			$this->check_directory( $category_folder . '/parts' );

			$wp_filesystem->put_contents(
				$file_path,
				null,
				FS_CHMOD_FILE
			);

			$templates_db = Database::instance()->theme_templates;

			$data = array(
				'theme_id'      => $theme_id,
				'name'          => $template_data['name'],
				'template_type' => $template_data['template_type'],
				'category'      => $category,
			);

			$templates_db->create_data( $data );

			return $this->get_template_list();
		}

		return false;
	}

	/**
	 * Reset theme
	 *
	 * @param string $theme_id .
	 */
	private function save_templates( $theme_id ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		$templates_db      = Database::instance()->theme_templates;
		$templates_data    = $templates_db->get_data( $theme_id );
		$template_dir      = trailingslashit( wp_upload_dir()['basedir'] ) . '/gtb-' . $theme_id . '/';
		$html_content      = array();
		$templates_content = get_block_templates( array(), 'wp_template' ); // phpcs:ignore
		$parts_content     = get_block_templates( array(), 'wp_template_part' ); // phpcs:ignore

		foreach ( $templates_content as $template ) {
			$html_content[ $template->slug ] = $template->content;
		}

		foreach ( $parts_content as $part ) {
			$html_content[ $part->slug ] = $part->content;
		}

		foreach ( $templates_data as $template ) {
			$template_type = in_array( $template['template_type'], gtb_parts(), true ) ? 'parts' : 'templates';
			$template_name = strtolower( str_replace( ' ', '-', $template['name'] ) );
			$file_dir      = $template_dir . '/' . $template['category'] . '/' . $template_type . '/' . $template_name . '.html';

			if ( file_exists( $file_dir ) ) {

				$slug_key = strtolower( $template['category'] . '-' . $template_name );
				if ( ! empty( $html_content[ $slug_key ] ) ) {
					$content = $html_content[ $slug_key ];

					$wp_filesystem->put_contents(
						$file_dir,
						$content,
						FS_CHMOD_FILE
					);
				}
			}
		}

		$this->reset_theme();
	}

	/**
	 * Delete template
	 *
	 * @param object $request .
	 */
	public function delete_template( $request ) {
		$template_data = $request->get_param( 'template_data' );

		/**
		 * Create theme folder & files
		 */
		if ( ! empty( $template_data ) ) {
			$theme_dir       = gtb_theme_folder_path();
			$templates_db    = Database::instance()->theme_templates;
			$category        = $template_data['category'];
			$category_folder = $theme_dir . '/' . $category;
			$template_type   = in_array( $template_data['template_type'], gtb_parts(), true ) ? 'parts' : 'templates';
			$template_name   = strtolower( str_replace( ' ', '-', $template_data['name'] ) );
			$file_path       = $category_folder . '/' . $template_type . '/' . $template_name . '.html';

			if ( $template_data['id'] ) {
				$templates_db->delete_data(
					array( 'id' => $template_data['id'] )
				);

				if ( file_exists( $file_path ) ) {
					$post_type = in_array( $template_data['template_type'], gtb_parts(), true ) ? 'wp_template_part' : 'wp_template';
					$post_name = strtolower( $template_data['category'] . '-' . $template_data['name'] );

					$posts = get_posts(
						array(
							'post_type' => $post_type,
							'name'      => $post_name,
						)
					);

					foreach ( $posts as $post ) {
						wp_delete_post( $post->ID, true );
					}

					wp_delete_file( $file_path );
				}
			}

			return $this->get_template_list();
		}

		return false;
	}

	/**
	 * ==================================================================================================================================
	 * OTHERS
	 * ==================================================================================================================================
	 */

	/**
	 * Generarte UID
	 *
	 * @param int $length .
	 */
	private function generate_uid( $length = 5 ) {
		return bin2hex( random_bytes( $length ) );
	}

	/**
	 * Update THEME JSON simultaneously
	 */
	private function update_theme_json() {
		if ( 'gutenverse-basic' !== get_stylesheet() ) {
			return;
		}

		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		$font_list = $this->get_font_list();
		$families  = array();

		if ( ! empty( $font_list['data'] ) ) {
			$folder = gtb_theme_folder_path() . '/assets/fonts/';
			$src    = gtb_theme_folder_path( null, true ) . '/assets/fonts/';

			foreach ( $font_list['data'] as $font ) {
				$slug        = strtolower( str_replace( ' ', '-', $font['family'] ) );
				$types       = array();
				$font_folder = $folder . $slug;
				$font_src    = $src . $slug;

				if ( is_array( $font['style'] ) ) {
					foreach ( $font['weights'] as $weight ) {
						$font_weight = '400' === $weight ? 'regular' : $weight;
						$files       = scandir( $font_folder );

						if ( in_array( 'normal', $font['style'], true ) ) {
							$regular_file = '';

							foreach ( $files as $file ) {
								if ( strpos( $file, "{$font_weight}." ) !== false ) {
									$regular_file = $file;
								}
							}

							$types[] = '{
								"fontFamily": "' . $font['family'] . '",
								"fontStretch": "normal",
								"fontStyle": "normal",
								"fontWeight": "' . $weight . '",
								"src": [
									"' . $font_src . '/' . $regular_file . '"
								]
							}';
						}

						if ( in_array( 'italic', $font['style'], true ) ) {
							$italic_file = '';

							foreach ( $files as $file ) {
								$convert = 'regular' === $font_weight ? '' : $font_weight;
								if ( strpos( $file, "{$convert}italic." ) !== false ) {
									$italic_file = $file;
								}
							}

							$types[] = '{
								"fontFamily": "' . $font['family'] . '",
								"fontStretch": "normal",
								"fontStyle": "italic",
								"fontWeight": "' . $weight . '",
								"src": [
									"' . $font_src . '/' . $italic_file . '"
								]
							}';
						}
					}
				}

				$families[] = '{
					"fontFace": [
						' . join( ',', $types ) . '
					],
					"fontFamily": "' . $font['family'] . '",
					"name": "' . $font['family'] . '",
					"slug": "' . $slug . '"
				}';

			}
		}

		$placeholder = $wp_filesystem->get_contents( GTB_DIR . '/includes/data/active-json.txt' );
		$placeholder = str_replace( '{{font_families}}', join( ',', $families ), $placeholder );

		$font_list = $this->get_fontsize_list();
		$sizes     = array();

		if ( ! empty( $font_list['data'] ) ) {
			foreach ( $font_list['data'] as $font ) {
				$sizes[] = '{
					"size": "' . $font['size'] . '",
					"slug": "' . $font['slug'] . '"
				}';
			}
		}

		$placeholder = str_replace( '{{font_sizes}}', ",\n\t\t\t\t" . join( ",\n\t\t\t\t", $sizes ), $placeholder );

		$theme_id = get_option( 'gtb_active_theme_id' );
		$layout   = array();

		if ( ! empty( $theme_id ) ) {
			$theme_db = Database::instance()->theme_info;
			$info     = $theme_db->get_theme_data( $theme_id );
			$data     = maybe_unserialize( $info[0]['theme_data'] );

			if ( ! empty( $data ) ) {
				$layout = array(
					'contentSize' => $data['core_content_width'],
					'wideSize'    => $data['core_wide_width'],
				);
			}
		}

		$placeholder = str_replace( '{{layout_sizes}}', wp_json_encode( $layout ), $placeholder );

		$wp_filesystem->put_contents(
			get_template_directory() . '/theme.json',
			$placeholder,
			FS_CHMOD_FILE
		);
	}

	/**
	 * Get JSON data from a file.
	 *
	 * @param int $id .
	 *
	 * @return object|array
	 */
	private function get_file_json_data( $id ) {
		if ( ! isset( $id ) ) {
			return array();
		}

		$filepath = get_attached_file( $id );
		$content  = file_get_contents( $filepath );

		return json_decode( $content );
	}

	/**
	 * Check directory, if there is none, create.
	 *
	 * @param string  $dir .
	 * @param boolean $condition .
	 */
	private function check_directory( $dir, $condition = true ) {
		if ( ! is_dir( $dir ) && $condition ) {
			wp_mkdir_p( $dir );
		}
	}
}
