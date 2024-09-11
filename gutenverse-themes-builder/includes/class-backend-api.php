<?php
/**
 * REST APIs class
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
use Gutenverse\Framework\Global_Variable;
use WP_Query;
use ZipArchive;
use WP_Theme_Json_Resolver;

/**
 * Class Api
 *
 * @package gutenverse-themes-builder
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
	 * Register APIs
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
			'template/import',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'import_active_theme' ),
				'permission_callback' => 'gutenverse_permission_check_admin',
			)
		);

		register_rest_route(
			self::ENDPOINT,
			'template/import/global-color',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'import_global_color' ),
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

		register_rest_route(
			self::ENDPOINT,
			'import/images',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'import_images' ),
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

		if ( ! isset( $update_colors->settings ) ) {
			$update_colors->settings = (object) array(
				'color' => (object) array(
					'palette' => (object) array(
						'custom' => (object) array(),
					),
				),
			);
		}

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
						$converted_font['font']['size']['Desktop'] = array(
							'unit'  => $setting->typography_font_size->unit,
							'point' => (string) $setting->typography_font_size->size,
						);
					}

					if ( isset( $setting->typography_font_size_tablet ) ) {
						$converted_font['font']['size']['Tablet'] = array(
							'unit'  => $setting->typography_font_size_tablet->unit,
							'point' => (string) $setting->typography_font_size_tablet->size,
						);
					}

					if ( isset( $setting->typography_font_size_mobile ) ) {
						$converted_font['font']['size']['Mobile'] = array(
							'unit'  => $setting->typography_font_size_mobile->unit,
							'point' => (string) $setting->typography_font_size_mobile->size,
						);
					}

					$converted_font['font']['lineHeight'] = array();

					if ( isset( $setting->typography_line_height ) ) {
						$converted_font['font']['lineHeight']['Desktop'] = array(
							'unit'  => $setting->typography_line_height->unit,
							'point' => (string) $setting->typography_line_height->size,
						);
					}

					if ( isset( $setting->typography_line_height_tablet ) ) {
						$converted_font['font']['lineHeight']['Tablet'] = array(
							'unit'  => $setting->typography_line_height_tablet->unit,
							'point' => (string) $setting->typography_line_height_tablet->size,
						);
					}

					if ( isset( $setting->typography_line_height_mobile ) ) {
						$converted_font['font']['lineHeight']['Mobile'] = array(
							'unit'  => $setting->typography_line_height_mobile->unit,
							'point' => (string) $setting->typography_line_height_mobile->size,
						);
					}

					$converted_font['font']['spacing'] = array();

					if ( isset( $setting->typography_letter_spacing ) ) {
						$converted_font['font']['spacing']['Desktop'] = $this->convert_spacing( $setting->typography_letter_spacing );
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
		if ( ! isset( $update_colors->settings ) ) {
			$update_colors->settings = (object) array(
				'color' => (object) array(
					'palette' => (object) array(
						'custom' => (object) array(),
					),
				),
			);
		}

		if ( isset( $update_colors->settings->color->palette->custom ) ) {
			$update_colors->settings->color->palette->custom = array();
		}

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
					'message' => esc_html__( 'Please input Theme Slug and Title', 'gutenverse-themes-builder' ),
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

		$this->check_directory( gutenverse_themes_builder_theme_folder_path( $theme_id ), $result );

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
					'message' => esc_html__( 'Please input Theme Slug and Title', 'gutenverse-themes-builder' ),
				),
			);
		}

		$info_db = Database::instance()->theme_info;
		$current = gutenverse_themes_builder_get_theme_mode( $theme_id );

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
				$template_type = in_array( $template_data['template_type'], gutenverse_themes_builder_parts(), true ) ? 'wp_template_part' : 'wp_template';

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
		global $wp_filesystem, $wpdb;

		try {
			/**Start the transaction */
			$wpdb->query( 'START TRANSACTION' );

			$theme_id = $request->get_param( 'theme_id' );

			$active_id = get_option( 'gtb_active_theme_id' );

			$this->reset_theme( $active_id );

			$info_db = Database::instance()->theme_info;
			$info_db->delete_data( $theme_id );

			$args = array(
				'post_type'      => 'gutenverse-pattern',
				'meta_query'     => array(
					array(
						'key'   => '_pattern_theme_id',
						'value' => $theme_id,
					),
				),
				'posts_per_page' => -1,
				'fields'         => 'ids',
			);

			$query = new WP_Query( $args );

			/**Check if any posts are found */
			if ( $query->have_posts() ) {
				foreach ( $query->posts as $post_id ) {
					/** Delete the post */
					wp_delete_post( $post_id, true );
				}
			}

			/**  Query attachments with the specific meta key and value */
			$args = array(
				'post_type'      => 'attachment',
				'post_status'    => 'inherit',
				'meta_query'     => array(
					array(
						'key'   => '_img_theme_id',
						'value' => $theme_id,
					),
				),
				'posts_per_page' => -1,
				'fields'         => 'ids',
			);

			$query = new WP_Query( $args );

			/**  Check if any attachments are found */
			if ( $query->have_posts() ) {
				foreach ( $query->posts as $attachment_id ) {
					/** Delete the attachment  */
					wp_delete_attachment( $attachment_id, true );
				}
			}

			if ( $active_id === $theme_id ) {
				update_option( 'gtb_active_theme_id', null );
			}

			$theme_folder = gutenverse_themes_builder_theme_folder_path( $theme_id );

			if ( is_dir( $theme_folder ) ) {
				$wp_filesystem->rmdir( $theme_folder );
			}

			$wpdb->query( 'COMMIT' );
			// Reset post data to the original global $post object
			wp_reset_postdata();
			return $this->get_theme_list();
			// If everything is successful, commit the transaction
		} catch ( Exception $e ) {
			// If something went wrong, roll back the transaction
			$wpdb->query( 'ROLLBACK' );
		}
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

		return $result;
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
						'message' => esc_html__( 'Slug Already Exist', 'gutenverse-themes-builder' ),
					),
				);
			}
		} else {
			return array(
				'status' => 'failed',
				'data'   => array(
					'message' => esc_html__( 'Theme not defined', 'gutenverse-themes-builder' ),
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
						'message' => esc_html__( 'Slug Already Exist', 'gutenverse-themes-builder' ),
					),
				);
			}
		} else {
			return array(
				'status' => 'failed',
				'data'   => array(
					'message' => esc_html__( 'Theme not defined', 'gutenverse-themes-builder' ),
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
	 * Import Global Color
	 */
	public function import_global_color() {
		$theme_id     = get_option( 'gtb_active_theme_id' );
		$theme_db     = Database::instance()->theme_info;
		$theme_info   = $theme_db->get_theme_data( $theme_id );
		$theme_slug   = $theme_info[0]['slug'];
		$active_theme = wp_get_theme();
		$theme_dir    = $active_theme->get_stylesheet_directory();
		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		$json_file_path = $theme_dir . '/theme.json';

		if ( ! $wp_filesystem->exists( $json_file_path ) ) {
			gutenverse_rlog( 'Import Global Color Data Failed: theme.json file does not exist!' );
		}

		$json_data = $wp_filesystem->get_contents( $json_file_path );

		if ( ! $json_data ) {
			gutenverse_rlog( 'Import Global Color Data Failed: Unable to read theme.json file!' );
		}

		/** Decode the JSON data into a PHP array */
		$data_array     = json_decode( $json_data, true );
		$color_data     = $data_array['settings']['color']['palette'];
		$new_color_data = array();
		foreach ( $color_data as $key => $color ) {
			$new_color_data[] = (object) $color;
		}
		$option_name = 'gutenverse-global-color-import-' . $theme_slug;
		$options     = get_option( $option_name );
		if ( ! isset( $options ) ) {
			add_option( $option_name, $new_color_data );
		} else {
			update_option( $option_name, $new_color_data );
		}
	}

	/**
	 * Import Global Font
	 */
	public function import_global_font() {
		/**Get GTB Theme Active Slug */
		$theme_id   = get_option( 'gtb_active_theme_id' );
		$theme_db   = Database::instance()->theme_info;
		$theme_info = $theme_db->get_theme_data( $theme_id );
		$theme_slug = $theme_info[0]['slug'];
		/**Get Font Data */
		$active_theme              = wp_get_theme();
		$active_theme_name         = str_replace( ' ', '_', $active_theme->get( 'Name' ) );
		$class_name                = $active_theme_name . '\\Init';
		$class_instance            = $class_name::instance();
		$active_theme_global_fonts = $class_instance->default_font_variable();

		/**Get Color Data */
		$theme_dir = $active_theme->get_stylesheet_directory();

		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		$json_file_path = $theme_dir . '/theme.json';

		if ( ! $wp_filesystem->exists( $json_file_path ) ) {
			gutenverse_rlog( 'Import Global Color Data Failed: theme.json file does not exist!' );
		}

		$json_data = $wp_filesystem->get_contents( $json_file_path );

		if ( ! $json_data ) {
			gutenverse_rlog( 'Import Global Color Data Failed: Unable to read theme.json file!' );
		}

		/** Decode the JSON data into a PHP array */
		$json_data_decode = json_decode( $json_data, true );
		$color_data       = $json_data_decode['settings']['color']['palette'];
		$new_color_data   = array();
		foreach ( $color_data as $key => $color ) {
			$new_color_data[] = (object) $color;
		}
		$option_name = 'gutenverse-global-color-import-' . $theme_slug;
		$options     = get_option( $option_name );
		if ( ! isset( $options ) ) {
			add_option( $option_name, $new_color_data );
		} else {
			update_option( $option_name, $new_color_data );
		}
		$global_fonts_now = get_option( 'gutenverse-global-variable-font-gutenverse-basic', false );
		$global_color_now = get_option( 'gutenverse-global-variable-color-gutenverse-basic', false );
		$title            = 'global-import-' . $active_theme_name . '-' . substr( uniqid(), -5 );
		$global_db        = Database::instance()->theme_globals;
		try {
			$data = array(
				'title'  => $title,
				'file'   => '',
				'fonts'  => maybe_serialize( $active_theme_global_fonts ),
				'colors' => '',
			);
			$global_db->create_data( $data );
			$data = array(
				'title'  => 'global-' . substr( uniqid(), -5 ),
				'file'   => '',
				'fonts'  => $global_fonts_now ? maybe_serialize( $global_fonts_now ) : '',
				'colors' => $global_color_now ? maybe_serialize( $global_color_now ) : '',
			);
			$global_db->create_data( $data );
			$active_id  = $global_db->get_inserted_id();
			$theme_info = Database::instance()->theme_info;
			$theme_id   = get_option( 'gtb_active_theme_id' );
			$theme_info->update_data( array( 'global_id' => $active_id ), $theme_id );
		} catch ( \Throwable $th ) {
			gutenverse_rlog( 'Import Global Data Failed!' );
			gutenverse_rlog( $th->getMessage() );
		}
	}

	/**
	 * Import Pattern
	 */
	public function import_pattern() {
		$active_theme = wp_get_theme();
		$theme_dir    = $active_theme->get_stylesheet_directory();
		$files        = glob( $theme_dir . '/inc/patterns/*' );
		$theme_id     = get_option( 'gtb_active_theme_id' );
		$theme_db     = Database::instance()->theme_info;
		$theme_info   = $theme_db->get_theme_data( $theme_id );
		$theme_slug   = $theme_info[0]['slug'];
		if ( $files ) {
			foreach ( $files as $file ) {
				$file_name     = basename( $file );
				$file_name_arr = explode( '-', str_replace( '.php', '', $file_name ) );
				switch ( $file_name_arr[0] ) {
					case 'gutenverse':
						$category = 'gutenverse';
						break;
					case 'pro':
						$category = 'pro';
						break;
					case 'core':
					default:
						$category = 'core';
						break;
				}
				$slug      = $theme_slug . '-' . implode( '-', $file_name_arr );
				$file_data = include $file;
				$name      = $file_data['title'];
				$content   = $file_data['content'];
				preg_match_all( '/http[^"]*(?:\.png|\.jpg|\.svg|\.jpeg|\.gif|\.webp|\.json)/U', $content, $matches );
				$urls = $matches[0];
				/** Filter image URLs */
				$image_urls   = array_filter( $urls, 'gutenverse_themes_builder_is_image_url' );
				$replacements = array();
				/** Replace Image Url Content */
				if ( ! empty( $image_urls ) ) {
					foreach ( $image_urls as $url ) {
						$image_without_res = gutenverse_themes_builder_get_image_without_resolution( $url );
						if ( $image_without_res ) {
							$url = $image_without_res['nores'];
						}
						$attachment_id = $this->download_and_save_image( $url, $theme_dir . '/assets/img' );
						if ( ! $attachment_id ) {
							continue;
						}
						$new_image_url        = wp_get_attachment_url( $attachment_id );
						$replacements[ $url ] = $new_image_url;
					}
					$content = str_replace( array_keys( $replacements ), array_values( $replacements ), $content );
				}

				if ( $theme_id ) {
					$post_exists = get_page_by_path( $slug, OBJECT, 'gutenverse-pattern' );
					if ( null === $post_exists ) {
						$post_id = wp_insert_post(
							array(
								'post_title'   => $name,
								'post_name'    => $slug,
								'post_content' => $content,
								'post_status'  => 'publish',
								'post_type'    => 'gutenverse-pattern',
							)
						);
						add_post_meta( $post_id, '_pattern_category', $category );
						add_post_meta( $post_id, '_pattern_theme_id', $theme_id );
					}
				}
			}
		}
	}

	/**
	 * Function to check if an image already exists in the media library
	 *
	 * @param string $url .
	 * @return boolean
	 */
	public function image_exists_in_media_library( $url ) {
		$args  = array(
			'post_type'   => 'attachment',
			'post_status' => 'inherit',
			'meta_query'  => array(
				array(
					'key'     => '_wp_attached_url',
					'value'   => $url,
					'compare' => '=',
				),
			),
		);
		$query = new WP_Query( $args );
		return $query->have_posts();
	}

	/**
	 * Function to download and save image to WordPress media library
	 *
	 * @param string $url .
	 * @param string $dir .
	 *
	 * @return integer
	 */
	public function download_and_save_image( $url, $dir = '' ) {
		$temp_file = download_url( $url );

		/**If download attempt failed, get image from theme directory */
		if ( is_wp_error( $temp_file ) ) {
			$file_name  = basename( wp_parse_url( $url, PHP_URL_PATH ) );
			$local_file = $dir . '/' . $file_name;
			if ( file_exists( $local_file ) ) {
				$temp_file = $local_file;
			} else {
				return false;
			}
		}

		/** Get the file name and extension  */
		$theme_id  = get_option( 'gtb_active_theme_id' );
		$file_name = basename( wp_parse_url( $url, PHP_URL_PATH ) );

		/**Check if $file_name have '.' inside the name then add _ in the end of the name*/
		$filename_without_extension     = pathinfo( $file_name, PATHINFO_FILENAME );
		$extension                      = pathinfo( $file_name, PATHINFO_EXTENSION );
		$arr_filename_without_extension = explode( '.', $filename_without_extension );
		$post_name                      = $filename_without_extension;
		if ( 1 < count( $arr_filename_without_extension ) ) {
			$file_name = $filename_without_extension . '_.' . $extension;
			$post_name = $filename_without_extension . '_';
		}
		/** Check if the image already exists */
		$args  = array(
			'post_type'   => 'attachment',
			'post_status' => 'inherit',
			'name'        => $post_name,
		);
		$query = new WP_Query( $args );
		if ( $query->have_posts() ) {
			$query->the_post();
			return get_the_ID();
		}

		/** Prepare the file array  */
		$file = array(
			'name'     => $file_name,
			'type'     => mime_content_type( $temp_file ),
			'tmp_name' => $temp_file,
			'error'    => 0,
			'size'     => filesize( $temp_file ),
		);

		/** Include the WordPress file handling functions  */
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		/** Upload the image  */
		$attachment_id = media_handle_sideload( $file, 0 );

		/** Check for errors  */
		if ( is_wp_error( $attachment_id ) ) {
			wp_delete_file( $temp_file );
			return false;
		}

		/** Save the original URL as a meta field  */
		$url = wp_get_attachment_url( $attachment_id );
		update_post_meta( $attachment_id, '_wp_attachment_url', $url );
		update_post_meta( $attachment_id, '_img_theme_id', $theme_id );
		return $attachment_id;
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
			$folder = gutenverse_themes_builder_theme_folder_path() . '/assets/' . $type;
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
			$folder = gutenverse_themes_builder_theme_folder_path() . '/assets/fonts/' . $slug;
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
			$font_folder = gutenverse_themes_builder_theme_folder_path() . '/assets/fonts/' . $slug;
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
				'mode' => gutenverse_themes_builder_get_theme_mode( $theme_id ),
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
		$allow_template = gutenverse_themes_builder_check_theme_mode( $template_data['category'], $theme_id );

		if ( ! empty( $template_data ) && $theme_id && $allow_template ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
			global $wp_filesystem;

			$theme_dir       = gutenverse_themes_builder_theme_folder_path();
			$category        = $template_data['category'];
			$category_folder = $theme_dir . '/' . $category;
			$template_type   = in_array( $template_data['template_type'], gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';
			$template_name   = strtolower( str_replace( ' ', '-', $template_data['name'] ) );
			$file_path       = $category_folder . '/' . $template_type . '/' . $template_name . '.html';

			$this->check_directory( $category_folder . '/templates' );
			$this->check_directory( $category_folder . '/parts' );

			$empty_content = '<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->';

			$wp_filesystem->put_contents(
				$file_path,
				$empty_content,
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
			$template_type = in_array( $template['template_type'], gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';
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
	 * Create Template Import
	 *
	 * @param string $category .
	 * @param mixed  $theme_id .
	 * @param string $template_type .
	 * @param string $template_name .
	 * @param string $template_content .
	 */
	public function create_template_import( $category, $theme_id, $template_type, $template_name, $template_content ) {
		$allow_template = gutenverse_themes_builder_check_theme_mode( $category, $theme_id );
		if ( $allow_template ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
			global $wp_filesystem;

			$theme_dir       = gutenverse_themes_builder_theme_folder_path();
			$category_folder = $theme_dir . '/' . $category;
			$file_path       = $category_folder . '/' . $template_type . '/' . $template_name . '.html';
			$file_type       = in_array( $template_name, gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';
			$this->check_directory( $category_folder . '/templates' );
			$this->check_directory( $category_folder . '/parts' );

			$empty_content = '<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->';

			$wp_filesystem->put_contents(
				$file_path,
				$template_content,
				FS_CHMOD_FILE
			);
			$templates_db           = Database::instance()->theme_templates;
			$allowed_template_array = array(
				'index',
				'front-page',
				'home',
				'page',
				'single',
				'archive',
				'author',
				'category',
				'date',
				'tag',
				'taxonomy',
				'search',
				'404',
				'custom_template',
				'header',
				'footer',
				'template_part',
			);
			if ( ! in_array( $template_name, $allowed_template_array, true ) && 'parts' === $template_type ) {
				$type = 'template_part';
			} elseif ( ! in_array( $template_name, $allowed_template_array, true ) && 'templates' === $template_type ) {
				$type = 'custom_template';
			} else {
				$type = $template_name;
			}
			$data = array(
				'theme_id'      => $theme_id,
				'name'          => $template_name,
				'template_type' => $type,
				'category'      => $category,
			);

			$templates_db->create_data( $data );

			$post_id = wp_insert_post(
				array(
					'post_title'   => $category . '-' . $template_name,
					'post_name'    => $category . '-' . $template_name,
					'post_status'  => 'publish',
					'post_type'    => 'wp_template',
					'post_content' => wp_slash( $template_content ),
				)
			);
			return true;
		}

		return false;
	}
	/**
	 * Import Active Theme
	 */
	public function import_active_theme() {
		$this->import_pattern();
		$this->import_global_font();
		$this->import_template();

		return array(
			'status' => 'success',
		);
	}

	/**
	 * Import Template
	 */
	public function import_template() {
		$active_theme = wp_get_theme();
		$theme_dir    = $active_theme->get_stylesheet_directory();
		$files        = array();
		/**Get Files in Gutenverse Files Parts */
		$files[] = array(
			'category' => 'gutenverse',
			'type'     => 'parts',
			'files'    => glob( $theme_dir . '/gutenverse-files/parts/*' ),
		);
		/**Get Files in Parts */
		$files[] = array(
			'category' => 'core',
			'type'     => 'parts',
			'files'    => glob( $theme_dir . '/parts/*' ),
		);
		/**Get Files in Gutenverse Files Templates*/
		$files[] = array(
			'category' => 'gutenverse',
			'type'     => 'templates',
			'files'    => glob( $theme_dir . '/gutenverse-files/templates/*' ),
		);
		/**Get Files in Templates */
		$files[]    = array(
			'category' => 'core',
			'type'     => 'templates',
			'files'    => glob( $theme_dir . '/templates/*' ),
		);
		$theme_id   = get_option( 'gtb_active_theme_id' );
		$theme_db   = Database::instance()->theme_info;
		$theme_info = $theme_db->get_theme_data( $theme_id );
		$theme_slug = $theme_info[0]['slug'];

		global $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		foreach ( $files as $file ) {
			if ( ! $file['files'] ) {
				continue;
			}
			foreach ( $file['files'] as $doc ) {
				$doc_name    = pathinfo( $doc );
				$doc_content = '';

				if ( $wp_filesystem->exists( $doc ) ) {
					$doc_content = $wp_filesystem->get_contents( $doc );
				}

				/**Change Template parts header & footer slug */
				// Define the regex pattern to match slugs within wp:template-part tags.
				$pattern = '/<!-- wp:template-part \{"slug":"([^"]+)"\} \/\-->/';

				// Perform the replacement.
				preg_match_all( $pattern, $doc_content, $matches_parts );
				if ( ! empty( $matches_parts[0] ) ) {
					foreach ( $matches_parts[0] as $index => $parts ) {
						$category = $file['category'];
						if ( 'header' === $matches_parts[1][ $index ] ) {
							$new_part    = '<!-- wp:template-part {"slug":"' . $category . '-header"} /-->';
							$doc_content = str_replace( $parts, $new_part, $doc_content );
						}
						if ( 'footer' === $matches_parts[1][ $index ] ) {
							$new_part    = '<!-- wp:template-part {"slug":"' . $category . '-footer"} /-->';
							$doc_content = str_replace( $parts, $new_part, $doc_content );
						}
					}
				}
				/**Change Pattern to Pattern Wrapper */
				preg_match_all( '/<!-- wp:pattern {"slug":"([^"]+)"[^}]*} \/\-->/', $doc_content, $matches_pattern );
				if ( ! empty( $matches_pattern[0] ) ) {
					foreach ( $matches_pattern[1] as $index => $value ) {
						preg_match( '/"slug":"([^"]+)"/', $matches_pattern[0][ $index ], $matches_slug );
						if ( ! empty( $matches_slug[0] ) ) {
							$slug = $theme_slug . '-' . explode( '/', $matches_slug[1] )[1];
							$post = get_page_by_path( $slug, OBJECT, 'gutenverse-pattern' );
							if ( $post ) {
								$content        = $post->post_content;
								$post_id        = $post->ID;
								$mode           = 'use';
								$value          = $post->post_name;
								$label          = $post->post_title;
								$pattern        = $matches_pattern[0][ $index ];
								$string_pattern = '<!-- wp:gutenverse-themes-builder/pattern-wrapper {"mode":"' . $mode . '","pattern":{"value":"' . $value . '","label":"' . $label . '","content":"' . gutenverse_themes_builder_to_unicode_escape( $content ) . '"}} --> ' . $content . ' <!-- /wp:gutenverse-themes-builder/pattern-wrapper -->';
								$doc_content    = str_replace( $pattern, $string_pattern, $doc_content );
							}
						}
					}
				}
				$this->create_template_import( $file['category'], $theme_id, $file['type'], $doc_name['filename'], $doc_content );
			}
		}
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
			$theme_dir       = gutenverse_themes_builder_theme_folder_path();
			$templates_db    = Database::instance()->theme_templates;
			$category        = $template_data['category'];
			$category_folder = $theme_dir . '/' . $category;
			$template_type   = in_array( $template_data['template_type'], gutenverse_themes_builder_parts(), true ) ? 'parts' : 'templates';
			$template_name   = strtolower( str_replace( ' ', '-', $template_data['name'] ) );
			$file_path       = $category_folder . '/' . $template_type . '/' . $template_name . '.html';

			if ( $template_data['id'] ) {
				$templates_db->delete_data(
					array( 'id' => $template_data['id'] )
				);

				if ( file_exists( $file_path ) ) {
					$post_type = in_array( $template_data['template_type'], gutenverse_themes_builder_parts(), true ) ? 'wp_template_part' : 'wp_template';
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
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		$font_list = $this->get_font_list();
		$families  = array();

		if ( ! empty( $font_list['data'] ) ) {
			$folder = gutenverse_themes_builder_theme_folder_path() . '/assets/fonts/';
			$src    = gutenverse_themes_builder_theme_folder_path( null, true ) . '/assets/fonts/';

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

		$placeholder = $wp_filesystem->get_contents( GUTENVERSE_THEMES_BUILDER_DIR . '/includes/data/active-json.txt' );
		$placeholder = str_replace( '{{font_families}}', join( ',', $families ), $placeholder );

		$font_list = $this->get_fontsize_list();
		$sizes     = '';

		if ( ! empty( $font_list['data'] ) ) {
			foreach ( $font_list['data'] as $font ) {
				$sizes .= ",\n\t\t\t\t" . '{
					"size": "' . $font['size'] . '",
					"slug": "' . $font['slug'] . '"
				}';
			}
		}

		$placeholder = str_replace( '{{font_sizes}}', $sizes, $placeholder );

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

		$placeholder     = str_replace( '{{layout_sizes}}', wp_json_encode( $layout ), $placeholder );
		$theme_json_path = gutenverse_themes_builder_theme_folder_path() . '/theme.json';

		$wp_filesystem->put_contents(
			$theme_json_path,
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

		$filepath = wp_get_attachment_url( $id );
		$file     = wp_remote_get( $filepath );
		$content  = '';

		if ( ! is_wp_error( $file ) ) {
			$content = wp_remote_retrieve_body( $file );
		}

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

	/**
	 * Import Images
	 *
	 * @param object $request .
	 */
	public function import_images( $request ) {
		$content = $request->get_param( 'content' );
		$images  = $request->get_param( 'images' );
		$strings = wp_json_encode( $content );

		foreach ( $images as $image ) {
			$data = $this->check_image_exist( $image['url'] );

			if ( ! $data ) {
				$data = $this->handle_file( $image['url'] );
			}

			// replace id.
			$search_id  = '"id":"' . $image['id'] . '"';
			$replace_id = '"id":"' . $data['id'] . '"';
			$strings    = str_replace( $search_id, $replace_id, $strings );

			// replace url.
			$search_url  = str_replace( '/', '\/', $image['url'] );
			$replace_url = str_replace( '/', '\/', $data['url'] );
			$strings     = str_replace( $search_url, $replace_url, $strings );
		}

		return array(
			'content' => json_decode( $strings ),
		);
	}

	/**
	 * Return image
	 *
	 * @param string $url Image attachment url.
	 *
	 * @return array|null
	 */
	public function check_image_exist( $url ) {
		$attachments = new WP_Query(
			array(
				'post_type'   => 'attachment',
				'post_status' => 'inherit',
				'meta_query'  => array( //phpcs:ignore
					array(
						'key'     => '_import_source',
						'value'   => $url,
						'compare' => 'LIKE',
					),
				),
			)
		);

		foreach ( $attachments->posts as $post ) {
			$attachment_url = wp_get_attachment_url( $post->ID );
			return array(
				'id'  => $post->ID,
				'url' => $attachment_url,
			);
		}

		return $attachments->posts;
	}

	/**
	 * Handle Import file, and return File ID when process complete
	 *
	 * @param string $url URL of file.
	 *
	 * @return int|null
	 */
	public function handle_file( $url ) {
		$file_name = basename( $url );
		$upload    = wp_upload_bits( $file_name, null, '' );
		$this->fetch_file( $url, $upload['file'] );

		if ( $upload['file'] ) {
			$file_loc  = $upload['file'];
			$file_name = basename( $upload['file'] );
			$file_type = wp_check_filetype( $file_name );

			$attachment = array(
				'post_mime_type' => $file_type['type'],
				'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $file_name ) ),
				'post_content'   => '',
				'post_status'    => 'inherit',
			);

			include_once ABSPATH . 'wp-admin/includes/image.php';
			$attach_id = wp_insert_attachment( $attachment, $file_loc );
			update_post_meta( $attach_id, '_import_source', $url );

			try {
				$attach_data = wp_generate_attachment_metadata( $attach_id, $file_loc );
				wp_update_attachment_metadata( $attach_id, $attach_data );
			} catch ( \Exception $e ) {
				$this->handle_exception( $e );
			} catch ( \Throwable $t ) {
				$this->handle_exception( $e );
			}

			return array(
				'id'  => $attach_id,
				'url' => $upload['url'],
			);
		} else {
			return null;
		}
	}

	/**
	 * Handle error
	 *
	 * @param \Exception $e .
	 */
	private function handle_exception( \Exception $e ) {
		error_log( $e->getMessage() );
	}

	/**
	 * Download file and save to file system
	 *
	 * @param string $url File URL.
	 * @param string $file_path file path.
	 *
	 * @return array|bool
	 */
	public function fetch_file( $url, $file_path ) {
		$http     = new \WP_Http();
		$response = $http->get(
			add_query_arg(
				array(
					'framework_version' => GUTENVERSE_FRAMEWORK_VERSION,
				),
				$url
			)
		);

		if ( is_wp_error( $response ) ) {
			return false;
		}

		$headers             = wp_remote_retrieve_headers( $response );
		$headers['response'] = wp_remote_retrieve_response_code( $response );

		if ( false === $file_path ) {
			return $headers;
		}

		$body = wp_remote_retrieve_body( $response );

		// GET request - write it to the supplied filename.
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;
		$wp_filesystem->put_contents( $file_path, $body, FS_CHMOD_FILE );

		return $headers;
	}
}
